# lenav ![GitHub](https://img.shields.io/github/license/lework/lenav) 

> `lenav`是一个简便的公司内部网址导航站,省去到处找服务地址烦恼......

## 技术栈

vue2 + vuex + vue-router + vue-lazyload + iview +  clipboard + js-cookie + webpack + less + sass + axios

## 添加网址

在`public/data/nav.json`文件中存放着收录的网址信息文件

添加网址条目的格式如下：

``` json
{
  "company": {
      "title": "公司环境地址",
      "name": "company",
      "icon": "ios-contacts-outline",
      "nav": [
          {
              "icon": "./static/images/jenkins.png",
              "name": "jenkins",
              "desc": "测试环境Jenkins",
              "link": "http://127.0.0.1:8080/",
              "doc": "/data/docs/jenkins.md"
          }
      ]
  }
}
```

分组菜单

```json
  "test": {
    "title": "测试环境",
    "name": "test",
    "children": ["test1", "test2","test3"]
  }
```

## 项目运行

```
npm install
```

### 环境配置

dev 环境配置 `.env.dev` 文件
```
NODE_ENV=dev
BASE_URL=""
```

prod 环境配置 `.env.prod` 文件
```
NODE_ENV=production
BASE_URL="https://cdn.jsdelivr.net/gh/lework/lenav@master/docs/"
```

- `BASE_URL`: 接口请求的根路径。

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and minifies for dev
```
npm run build-dev
```


> 把`docs`目录下的内容放在web服务器就可以啦

## 效果演示

[查看demo请戳这里](https://lework.github.io/lenav)