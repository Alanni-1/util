const path = require('path')
// html生成插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// clean插件，确保dist中的文件中事实保持为最新的状态
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProd = true

module.exports = {
	// 模式
	mode: isProd ? 'production' : 'development', // development 开发, production 生产 或 none
	// 入口
	entry: './src/index.ts',
	// 出口
	output: {
		// 打包文件夹
		path: path.resolve(__dirname, 'dist'),
		// 打包文件
		filename: 'tools-utils.js',
		// 向外暴露的对象名称
		library: 'mUtiles',
		// 打包生成库可以通过esm/commonjs/reqirejs的语法引入
		libraryTarget: 'umd',
		// 告诉webpack不使用箭头函数
		environment: {
			arrowFunction: false,
		},
	},
	// 指定webpack打包使用的模块
	module: {
		rules: [
			{
				// test是指定规则生效的文件，匹配以ts结尾的文件
				test: /\.ts$/,
				// 要使用的loader
				use: [
					{
						// 指定加载器
						loader: 'babel-loader',
						// 设置babel
						options: {
							// 设置预定义的环境
							presets: [
								[
									// 指定环境的插件
									'@babel/preset-env',
									// 配置信息
									{
										// 需要兼容的模板浏览器
										targets: {
											chrome: '68',
										},
										// 指定corejs的版本
										corejs: '3',
										// 使用corejs的方法，表示按需加载
										useBuiltIns: 'usage',
									},
								],
							],
						},
					},
					'ts-loader',
				],
				// 要排除的文件
				exclude: /node_modules/,
			},
		],
	},
	// 配置webpack使用的插件
	plugins: [
		// 使用所引入的模块
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin(),
	],
	resolve: {
		// 用于设置引用的模块，使得编辑器知道以.ts和.js结尾的文件可以作为模块化使用
		extensions: ['.ts', '.js'],
		alias: {
			// path.join拼接路径，
			'@': path.join(__dirname, './src'),
		},
	},
}
