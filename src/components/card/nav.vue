<template>
<div>
    <ul class="nav-ul">
        <li class="nav-li" v-for="(item,index) in navData" :key="index">
            <Poptip  placement="right" trigger="hover" :transfer=true >
                <div class="top">
                    <p style="float: left;margin-right: 5px;"><img class="icon" v-lazy="item.icon" alt=""></p>
                    <span>{{ item.name }}</span>
                    <span v-show="item.num">  次数：{{ item.num }}</span>

                </div>
                <div class="desc">
                    <Tag type="border" color="green" v-show="item.title">{{item.title}}</Tag>
                    <p><span>{{ item.desc }}</span></p>
                </div>
                <div class="mu" slot="content">
                        <ButtonGroup vertical>
                        <Button icon="ios-send" @click="jumpLink(item)">跳转</Button>
                        <Button icon="md-heart" @click="addFavorite(item)">添加到我的收藏</Button>
                        <Button icon="ios-clipboard" class='btn' :data-clipboard-text="item.link" @click="copyLink"> 拷贝网址</Button>
                        <Button icon="ios-add-circle" @click="addBookmarks(item.link, item.name)">加入书签</Button>
                        <Button icon="ios-trash" v-show="del" @click="delUrl(item)">从本项中删除</Button>
                    </ButtonGroup>
                </div>
            </Poptip>
        </li>
    </ul>
    <Spin size="large" fix v-if="spinShow"></Spin>
 </div>
</template>

<script>
import Clipboard from 'clipboard'
import {mapActions} from 'vuex'

export default {
    props: {
        navData: {
            default: []
        },
        subTitle: {
            default: ''
        },
        del: {
            default: false
        },
        spinShow: {
            default: false
        }
    },
    methods: {
        jumpLink (item) {
            item.title = this.subTitle
            this.saveUsedList(item)
            window.open(item.link)
        },
        copyLink () {
            var clipboard = new Clipboard('.btn')
            clipboard.on('success', e => {
                // 成功提示
                this.$Message.success('复制成功')
                // 释放内存
                clipboard.destroy()
				console.log(e)
            })
            clipboard.on('error', e => {
                // 不支持复制
                this.$Message.error('该浏览器不支持自动复制')
                // 释放内存
                clipboard.destroy()
				console.log(e)
            })
        },
        addFavorite (item) {
            item.title = this.subTitle
            this.saveFavoriteList(item)
            this.$Message.success('添加成功')
        },
        delUrl (item) {
            this.deleteList(item)
        },
        addBookmarks (url, title) {
            var ua = navigator.userAgent.toLowerCase()

            if (ua.indexOf('msie 8') > -1) {
                // IE8
                window.external.AddToFavoritesBar(url, title)
            } else if (document.all || window.external) {
                try {
                    window.external.addFavorite(url, title)
                } catch (e) {
                    this.$Message.error('您的浏览器不支持,请手动收藏!')
                }
            } else if (window.sidebar) {
                window.sidebar.addPanel(title, url, '')
            } else {
                this.$Message.error('您的浏览器不支持,请手动收藏!')
            }
        },
        ...mapActions([
            'saveFavoriteList',
            'saveUsedList',
            'deleteList'
        ])
    }
}
</script>

<style lang=less scoped>
@min-width: 768px;

span {
    word-break: break-all;
    word-wrap: break-word;
}
.top {
    height: 36px;
}
.icon {
    width: 35px;
    height: 35px;
    vertical-align: middle;
    border-radius: 50%;
    pointer-events: none;
}
.nav-ul {
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    flex-wrap: wrap;
}
.nav-li {
    position: relative;
    margin: 0 15px 15px 0;
    width: 180px;
    padding: 15px;
    border: 1px solid #eee;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    transform-origin: right bottom;
    -webkit-transform-origin: right bottom;
    -ms-transform-origin: right bottom;
    transition: 0.1s linear;
    -webkit-transition: 0.1s linear;
    -ms-transition: 0.1s linear;
    @media screen {
        @media (max-width: @min-width) {
            width: 100%;
        }
    }
}
.desc {
    padding-top: 5px;
    border-top: 1px solid #eee;
    margin-top: 8px;
    color: rgba(0, 0, 0, 0.45);
}
</style>
