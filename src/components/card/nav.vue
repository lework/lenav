<template>
  <div>
    <ul class="nav-ul">
      <li class="nav-li" v-for="(item, index) in navData" :key="index">
        <Poptip placement="right" trigger="hover" :transfer="true">
          <div class="top">
            <p style="float: left;margin-right: 5px;">
              <img class="icon" v-lazy="item.icon" alt="" />
            </p>
            <span>{{ item.name }}</span>
            <span v-if="item.num > 0" class="used"
              ><Icon type="ios-link" />次数：{{ item.num }}</span
            >
          </div>
          <div class="desc">
            <Tag type="border" color="green" v-show="item.title">{{
              item.title
            }}</Tag>
            <p>
              <span>{{ item.desc }}</span>
            </p>
          </div>
          <div class="mu" slot="content">
            <ButtonGroup vertical>
              <Button icon="ios-send" @click="jumpLink(item)">跳转</Button>
              <Button icon="md-document" v-if="item.doc" @click="openDoc(item)" >使用文档</Button>
              <Button icon="md-heart" @click="addFavorite(item)"
                >添加到我的收藏</Button
              >
              <Button
                icon="ios-clipboard"
                class="btn"
                :data-clipboard-text="item.link"
                @click="copyLink"
              >
                拷贝网址</Button
              >
              <Button
                icon="ios-add-circle"
                @click="addBookmarks(item.link, item.name)"
                >加入书签</Button
              >
              <Button icon="ios-trash" v-show="del" @click="delUrl(item)"
                >从本项中删除</Button
              >
            </ButtonGroup>
          </div>
        </Poptip>
      </li>
    </ul>
    <Modal  v-model="modalDoc" fullscreen footer-hide title="使用文档" @on-cancel="closeDoc">
      <div class="usage-content" v-if="modalDoc">
          <div class="toc">
            目录
          <div id="toc" />
          </div>
          <div class="markdown">
            <vue-markdown :source="docData" :toc=true toc-id="toc" ></vue-markdown>
          </div>
          <Spin size="large" fix v-if="docSpinShow"></Spin>
      </div>
    </Modal>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import VueMarkdown from "vue-markdown";


import hljs from 'highlight.js';
// import "highlight.js/styles/atom-one-dark.css";
import 'highlight.js/styles/github.css';


let highlightCode = () => {
  let preEl = document.querySelectorAll("pre");
  let codeEl = document.querySelectorAll("code");
  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
  codeEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};

import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      modalDoc: false,
      docSpinShow: false,
      docData: ""
    }
  },
  props: {
    navData: {
      default: [],
    },
    subTitle: {
      default: '',
    },
    del: {
      default: false,
    },
    spinShow: {
      default: false,
    },
  },
  methods: {
    openDoc(item) {
      console.log(item)
      this.modalDoc = true
      this.docSpinShow = true
      this.$axios
        .get(item.doc)
        .then(rep => {
          this.docData = rep.data;
        })
        .catch(e => {
          this.$Message.error("获取数据失败!");
          console.log(e);
        })
        .then(() => {
          this.docSpinShow = false
        })
    },
    closeDoc() {
      this.docData = ""
      this.modalDoc = false
      console.log("close")
    },
    jumpLink(item) {
      console.log(item)
      item.title = this.subTitle ? this.subTitle : item.title
      this.saveUsedList(item)
      window.open(item.link)
    },
    copyLink() {
      var clipboard = new Clipboard('.btn')
      clipboard.on('success', (e) => {
        // 成功提示
        this.$Message.success('复制成功')
        // 释放内存
        clipboard.destroy()
        console.log(e)
      })
      clipboard.on('error', (e) => {
        // 不支持复制
        this.$Message.error('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
        console.log(e)
      })
    },
    addFavorite(item) {
      const index = this.favoriteList.findIndex((a) => {
        return item.link === a.link
      })
      if (index >= 0) {
        this.$Message.info('你已经添加啦！')
        return
      }
      item.title = this.subTitle ? this.subTitle : item.title
      this.saveFavoriteList(item)
      this.$Message.success('添加成功')
    },
    delUrl(item) {
      this.deleteList(item)
    },
    addBookmarks(url, title) {
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
    ...mapActions(['saveFavoriteList', 'saveUsedList', 'deleteList']),
  },
  computed: {
    ...mapGetters(['favoriteList']),
  },
  components: {
    VueMarkdown
  },
  mounted() {
    highlightCode();
  },
  updated() {
    highlightCode();
  }
}
</script>

<style lang="less" scoped>
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
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
.used {
  display: block;
  font-size: 6px;
  width: 120px;
  color: gray;
}

.usage-content {
  font-size: 14px;
  width: 100%;
  padding: 0px 80px 20px 80px;
  @media screen {
    @media (max-width: @min-width) {
      padding: 0 10px 10px 10px;
    }
  }
}

.usage-content /deep/ ul {
  padding-left: 25px;
}

.usage-content /deep/ ol {
  padding-left: 25px;
}
.usage-content /deep/ h2 {
  padding-top: 90px;
  margin-top: -90px;
}

.usage-content /deep/ blockquote {
  margin-top: 5px;
  padding: 0 1em;
  color: #6a737d;
  border-left: .25em solid #dfe2e5;
}

.toc {
  width: 200px;
  position: fixed;
  @media screen {
    @media (max-width: @min-width) {
      position: relative;
      margin-left: 0px;
    }
  }
}
.toc /deep/ a {
  word-break: break-all;
  word-wrap: break-word;
}
.markdown {
  margin-left: 210px;
  @media screen {
    @media (max-width: @min-width) {
      position: relative;
      margin-left: 0px;
    }
  }
}

</style>
