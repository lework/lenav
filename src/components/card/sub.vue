<template>
    <div>
        <div id="我的收藏" v-show="favoriteList.length">
            <Card class="nodeCard">
                <p slot="title" class="anchor">我的收藏<a href="#我的收藏">#</a></p>
                <a href="#" slot="extra" @click="removeFavorite">
                    <Icon type="ios-loop-strong"></Icon>
                    清空
                </a>
                <Nav :navData="favoriteList" :del=true :spinShow="spinShow"></Nav>
            </Card>
        </div>
        <div id="常用网址" v-show="usedList.length">
            <Card class="nodeCard">
                <p slot="title" class="anchor">常用网址<a href="#常用网址">#</a></p>
                <a href="#" slot="extra" @click="removeUsed">
                    <Icon type="ios-loop-strong"></Icon>
                    清空
                </a>
                <Nav :navData="usedList" :del=true :spinShow="spinShow"></Nav>
            </Card>
        </div>
        <div :id="item.title"  v-for="(item,index) in data" :key="index" >
            <Card class="nodeCard">
                <p slot="title" class="anchor">{{ item.title }}<a :href="'#' + item.title">#</a> </p>
                <p slot="extra">共计：{{ item.nav.length}} 个项目</p>
                <Nav :navData="item.nav" :subTitle="item.title" :spinShow="spinShow"></Nav>
            </Card>
        </div>
    </div>
</template>

<script>
import Nav from '@/components/card/nav'
import {mapGetters, mapActions} from 'vuex'
export default {
    props: {
        data: {
            default: {}
        },
        spinShow: {
            default: false
        }
    },
    methods: {
        removeUsed () {
            this.removeUsedList()
            this.$Message.success('清空成功')
        },
        removeFavorite () {
            this.removeFavoriteList()
            this.$Message.success('清空成功')
        },
        ...mapActions([
            'removeUsedList',
            'removeFavoriteList'
        ])
    },
    computed: {
        ...mapGetters([
            'favoriteList',
            'usedList'
        ])
    },
    components: {
        Nav
    }
}
</script>

<style scoped>
.anchor a {
    opacity: 0;
    font-size: 24px;
    transition: opacity .2s ease-in-out;
    margin-left: 5px;
    position: relative;
    top: 2px;
}
.nodeCard {
    margin: 20px 20px 0 20px
}
</style>
