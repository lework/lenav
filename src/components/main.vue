
<template>
    <div class="layout" v-if="data">
        <Layout>
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed" :style="{position: 'fixed', height: '100vh', left: 0}">
            <div class="logo-con">
                <a href="./"><img src="logo.png" key="max-logo" /></a>
            </div>
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses" @on-select="jumpAnchor">
                    <MenuItem name="我的收藏">
                        <Icon type="ios-heart" />
                        <span>我的收藏</span>
                    </MenuItem>
                    <MenuItem name="常用网址">
                        <Icon type="ios-navigate"></Icon>
                        <span>常用网址</span>
                    </MenuItem>
                    <template v-for="(item,index) in data" >
                      <MenuItem :name="item.title" v-if="! item.children && childrenList.indexOf(index) < 0" :key="index">
                          <Icon :type="item.icon ? item.icon : 'ios-search'"></Icon>
                          <span>{{ item.title }}</span>
                      </MenuItem>
                      <Submenu :name="item.title" v-if="item.children" :key="index">
                          <template slot="title"><Icon :type="item.icon ? item.icon : 'ios-search'"></Icon> <span>{{ item.title }}</span></template>
                          <MenuItem :name="data[key].title" v-for="key in item.children" :key="key">
                            <span>{{ data[key].title }}</span>
                          </MenuItem>
                      </Submenu>
                    </template >
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout class="layout-right">
            <Header class="layout-header-bar" :style="{position: 'fixed', width: '100%', zIndex: 99}">欢迎使用
                <Input v-model="search" placeholder="请输入内容搜搜..." class="search" @on-enter="searchData"/>
                <span class="search-text"><Button type="primary" icon="search" @click="searchData">搜索</Button></span>
                <Button type="success" icon="plus-round" @click="resetSearch" v-show="searchStatus" >重置</Button>
            </Header>
                <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
                    <NavSub :data="data" :spinShow="spinShow"></NavSub>
                </Content>
                <Footer class="layout-footer-center">lenav ©2021 Created by Lework <a href="https://github.com/lework/lenav" target="_blank">GitHub</a></Footer>
            </Layout>
        </Layout>
        <BackTop></BackTop>
    </div>
</template>
<script>
import NavSub from '@/components/card/sub'
// import Data from '@/data/data'
export default {
    data () {
        return {
            isCollapsed: false,
            search: '',
            searchStatus: false,
            data: null,
            childrenList: [],
            sourceData: '',
            serarchNum: 0,
            spinShow: false
        }
    },
    computed: {
        menuitemClasses: function () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    created: function() {
        console.group('------Create创建前状态------');
        this._getData()
    },
    methods: {
        _getData() {
            this.spinShow = true;
            this.$axios
              .get("/data/nav.json") // 获取nav数据
              .then(rep => {
                  this.data = rep.data;
                  for (let key in this.data) {
                    if (this.data[key].hasOwnProperty("children")) {
                      this.childrenList = this.childrenList.concat(this.data[key].children);
                      console.log(this.childrenList)
                    }
                  }
                  this.spinShow = false;
              })
              .catch(e => {
                  this.$Message.error({
                      content: "获取数据失败!",
                      duration: 120,
                      closable: true
                  });
                  console.log("错误信息：",e);
              });
        },
        jumpAnchor (name) {
          if (document.documentElement.clientWidth <= 768 ){
            this.isCollapsed = true
          }

          let offset = 66; 
          let el = document.querySelector('#' + name); 
          window.scroll({ top: (el.offsetTop - offset), left: 0, behavior: 'smooth' });
        },
        searchData () {
            if (typeof this.search === 'undefined' || this.search === null || this.search === '') {
                this.$Message.error('输入内容呀！')
                return true
            }
            if (!this.searchStatus) {
                this.sourceData = JSON.parse(JSON.stringify(this.data))
            } else {
                this.data = JSON.parse(JSON.stringify(this.sourceData))
            }
            this.searchStatus = true
            this.serarchNum = 0
            for (let d in this.data) {
                for (let i = 0; i < this.data[d]['nav'].length; i++) {
                    if (this.data[d]['nav'][i]['name'].toLowerCase().indexOf(this.search.toLowerCase()) === -1) {
                        if (this.data[d]['nav'][i]['link'].toLowerCase().indexOf(this.search.toLowerCase()) === -1) {
                            this.data[d]['nav'].splice(i--, 1)
                        } else {
                            this.serarchNum++
                        }
                    } else {
                        this.serarchNum++
                    }
                }
            }
            if (this.serarchNum === 0) {
                this.$Message.error('没找到哦，请重试!')
            } else {
                this.$Message.success('查找到了' + this.serarchNum + '个相近的.')
            }
        },
        resetSearch () {
            this.spinShow = true
            this.searchStatus = false
            this.search = ''
            this.serarchNum = 0
            this.data = JSON.parse(JSON.stringify(this.sourceData))
            setTimeout(() => {
                this.spinShow = false
            }, 1000)
        }
    },
    components: {
        NavSub
    }
}
</script>

<style lang=less scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 120px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
.ivu-layout-sider {
    z-index: 100;
}
.logo-con img {
    width: 180px;
    margin: 10px;
}
.search {
    margin-left: 10px;
    width: 200px;
    @media screen {
        @media (max-width: 768px) {
            width: auto;
        }
    }
}
.search-text {
    margin: 0 10px;
    @media screen {
        @media (max-width: 768px) {
            margin: 0 3px;
        }
    }
}
.ivu-layout-header {
    @media screen {
        @media (max-width: 768px) {
            padding: 0 0 0 20px;
        }     
    }
}
.layout-right {
    margin-left: 200px;
    @media screen {
      @media (max-width: 768px) {
          margin-left: 0px;
      }     
  }
}
</style>