export default {
    title: '公司环境地址',
    name: 'com',
    nav: [
        {
            icon: './static/images/jenkins.png',
            name: 'jenkins',
            desc: '测试环境Jenkins',
            link: 'http://127.0.0.1:8080/'
        },
        {
            icon: './static/images/confluence.png',
            name: 'Confluence',
            desc: 'Confluence, 技术文档',
            link: 'http://127.0.0.1:8090/'
        },
        {
            icon: './static/images/nexus.png',
            name: 'nexus',
            desc: 'nexus私服',
            link: 'http://127.0.0.1:8081/'
        },
        {
            icon: './static/images/gitlab.png',
            name: 'Gitlab',
            desc: 'gitlab 代码托管',
            link: 'http://127.0.0.1:8880'
        },
        {
            icon: './static/images/mysql.svg',
            name: '测试Sql发布平台',
            desc: '测试Sql发布平台',
            link: 'http://127.0.0.1:9123/'
        },
        {
            icon: './static/images/mysql.svg',
            name: '生产Sql发布平台',
            desc: '生产Sql发布平台',
            link: 'http://127.0.0.1:9122/'
        },
        {
            icon: './static/images/showdoc.png',
            name: 'Showdoc',
            desc: '[内部使用]在线API文档、技术文档工具',
            link: 'http://127.0.0.1:4999/web/#/'
        },
        {
            icon: './static/images/showdoc.png',
            name: 'Showdoc',
            desc: '[外部使用]在线API文档、技术文档工具',
            link: 'http://127.0.0.1:5999/web/#/'
        },
        {
            icon: './static/images/easymock.png',
            name: 'Easymock',
            desc: 'Mock server, 是一个可视化，并且能快速生成模拟数据的服务',
            link: 'http://127.0.0.1:7300/login'
        }
    ]
}
