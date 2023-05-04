// 引入插件
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('rollup-plugin-typescript2')
const json = require('@rollup/plugin-json')
const babel = require('@rollup/plugin-babel')
// 用于生成类型声明文件
const dts = require('rollup-plugin-dts')
// sass打包
const postcss = require('rollup-plugin-postcss')


// 入口文件
const entry = 'src/index.ts'

// babel配置
const babelOptions = {
  babelHelpers: 'runtime',
  presets: ["@babel/preset-env"],
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
  exclude: "**/node_modules/**"
}

/*
*  src: rollup.config.json
*  只保留关键代码，忽略部分同上文
**/

// 忽略文件
const externalConfig = [
  id => /\/__expample__|main.tsx/.test(id), // 组件的本地测试文件，不希望被打包。
  'react',
  'react-dom',
  'classname',
  'react-is',
  '**/node_modules/**'
]

// sass打包
const processScss = function (context) {
  return new Promise((resolve, reject) => {
    sass.compile(
      {
        file: context
      },
      function (err, result) {
        if (!err) {
          resolve(result)
        } else {
          reject(result)
        }
      }
    );
    sass.compile(context, {}).then(
      function (output) {
        if (output && output.css) {
          resolve(output.css)
        } else {
          reject({})
        }
      },
      function (err) {
        reject(err)
      }
    )
  })
}

// rollup配置
module.exports = [
  {
    // 入口
    input: entry,
    // 打包信息
    output: [
      { filname: 'index.esm.js', dir: 'dist/es/', format: 'esm' },
    ],
    // 插件配置
    plugins: [
      // sass打包
      postcss({
        extract: true,
        minimize: true,
        extensions: ['.css', '.scss'],
        process: processScss
      }),
      // 可使用 `import {module} from './file'` 替换 `import {module} from './file/index.js`
      resolve(),
      // 支持commonjs，包括第三方引入使用到commonjs语法
      commonjs(),
      // typescript支持
      typescript({
        tsconfig: 'tsconfig.json'
      }),
      // 支持读取json文件
      json(),
      // babel
      babel(babelOptions)
    ],
    // 忽略文件
    external: externalConfig
  },
  {
    input: entry,
    output: [{ filname: 'index.d.ts', dir: 'dist/es/type', format: 'esm' }],
    plugins: [dts.default()]
  }
]