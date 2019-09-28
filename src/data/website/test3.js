let ip = '127.0.0.1'

export default {
    title: 'Test3环境地址',
    name: 'test3',
    nav: [
        {
            icon: './static/images/confluence.png',
            name: 'test3',
            desc: 'Test3环境详细信息',
            link: 'http://' + ip + ':8090/pages/viewpage.action?pageId=6127905'
        },
        {
            icon: './static/images/logio.png',
            name: 'logio',
            desc: '查看日志的, admin/logio',
            link: 'http://' + ip + ':28778'
        },
        {
            icon: './static/images/cat.ico',
            name: 'cat',
            desc: '实时应用监控平台',
            link: 'http://' + ip + ':8080/cat/s/login'
        },
        {
            icon: './static/images/nginx.svg',
            name: 'app_h5',
            desc: 'app h5',
            link: 'http://' + ip + ':26230'
        },
        {
            icon: './static/images/tomcat.png',
            name: 'app_api',
            desc: 'app后端接口',
            link: 'http://' + ip + ':26000'
        },
        {
            icon: './static/images/tomcat.png',
            name: 'app_back',
            desc: '后台管理系统',
            link: 'http://' + ip + ':26010/back/'
        },
        {
            icon: './static/images/spring.png',
            name: 'trade',
            desc: '后端交易模块',
            link: 'http://' + ip + ':26220'
        },
        {
            icon: './static/images/tomcat.png',
            name: 'promotion',
            desc: '运营推广',
            link: 'http://' + ip + ':26084'
        },
        {
            icon: './static/images/tomcat.png',
            name: 'activity_h5',
            desc: 'APP活动页面',
            link: 'http://' + ip + ':26086'
        },
        {
            icon: './static/images/spring.png',
            name: 'activity_api',
            desc: '活动后端接口',
            link: 'http://' + ip + ':26383'
        },
        {
            icon: './static/images/spring.png',
            name: 'payment',
            desc: '支付中心',
            link: 'http://' + ip + ':28000'
        },
        {
            icon: './static/images/spring.png',
            name: 'payment_gw',
            desc: '支付中心h5页面网关接口',
            link: 'http://' + ip + ':28010'
        },
        {
            icon: './static/images/nginx.svg',
            name: 'payment_h5',
            desc: '支付中心h5页面',
            link: 'http://' + ip + ':28020'
        },
        {
            icon: './static/images/spring.png',
            name: 'payment_callback',
            desc: '支付中心回调系统',
            link: 'http://' + ip + ':28030'
        },
        {
            icon: './static/images/spring.png',
            name: 'openapi',
            desc: '对外交互，重构用户系统对接第三方',
            link: 'http://' + ip + ':21040'
        },
		{
            icon: './static/images/tomcat.png',
            name: 'sms',
            desc: '短信',
            link: 'http://' + ip + ':26030'
        },
        {
            icon: './static/images/php.png',
            name: 'php_api',
            desc: 'php api接口',
            link: 'http://' + ip + ':26040'
        },
        {
            icon: './static/images/spring.png',
            name: 'component_eureka',
            desc: '服务注册',
            link: 'http://' + ip + ':21000'
        },
        {
            icon: './static/images/spring.png',
            name: 'component_apigateway',
            desc: 'API网关(zuul)',
            link: 'http://' + ip + ':21010'
        },
        {
            icon: './static/images/spring.png',
            name: 'component_mq',
            desc: '消息消费调度中心',
            link: 'http://' + ip + ':21020'
        },
        {
            icon: './static/images/spring.png',
            name: 'component_scheduler',
            desc: '任务调度系统',
            link: 'http://' + ip + ':21030'
        }
    ]
}
