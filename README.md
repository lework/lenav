# lenav ![GitHub](https://img.shields.io/github/license/lework/lenav) 

> `lenav`是一个简便的公司内部网址导航站,省去到处找服务地址烦恼......

## 技术栈

vue2 + vuex + vue-router + vue-lazyload + iview +  clipboard + js-cookie + webpack + less + sass

## 添加网址

在`src/data/website`目录下存放着收录的网址信息文件

添加网址条目的格式如下：

``` javascripts
export default {
    title: '公司环境地址',
    hash: '#com',
    nav: [
        {
            icon: './static/images/jenkins.png', 
            name: 'jenkins',
            desc: '测试环境Jenkins',
            link: 'http://127.0.0.1:8080/'
        },
    ]
}

```

## 项目运行
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

> 把`docs`目录下的内容放在web服务器就可以啦

## 效果演示

[查看demo请戳这里](https://lework.github.io/lenav)