const path = require('path');
const webpack = require('webpack');
const UglifyPlugin = require("uglifyjs-webpack-plugin");


module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'docs',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
          // 为生产环境修改配置...
          config.mode = 'production';
		  // 将每个依赖包打包成单独的js文件
		  let optimization = {
			runtimeChunk: 'single',
			splitChunks: {
			  chunks: 'all',
			  maxInitialRequests: Infinity,
			  minSize: 20000, // 依赖包超过20000bit将被单独打包
			  cacheGroups: {
				vendor: {
				  test: /[\\/]node_modules[\\/]/,
				  name (module) {
					// get the name. E.g. node_modules/packageName/not/this/part.js
					// or node_modules/packageName
					const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
					// npm package names are URL-safe, but some servers don't like @ symbols
					return `npm.${packageName.replace('@', '')}`
				  }
				}
			  }
			},
			   minimizer: [
				  new UglifyPlugin({
					uglifyOptions: {
					  compress: {
						drop_console: true, // console
						drop_debugger: false,
						pure_funcs: ["console.log"] // 移除console
					  }
					}
				  })
			]
		  }
		  Object.assign(config, {
			optimization
		  })
        } else {
            // 为开发环境修改配置...
            config.mode = 'development';
        }

        Object.assign(config, {
            // 开发生产共同配置
            resolve: {
				extensions: ['.js', '.vue', '.json'],
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    '@c': path.resolve(__dirname, './src/components')
                }
            }
        });
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        // proxy: {
        //  // 设置代理
        //  // proxy all requests starting with /api to jsonplaceholder
        //  'http://localhost:8080/': {
        //      target: 'http://baidu.com:8080', //真实请求的目标地址
        //      changeOrigin: true,
        //      pathRewrite: {
        //          '^http://localhost:8080/': ''
        //      }
        //  }
        // },
        before: (app) => {}
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
};
