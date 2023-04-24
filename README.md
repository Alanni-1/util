## 项目介绍

主要是个人学习练习项目，以及集成一些常用函数工具

运用技术

- yarn
- jest
- webpack
- babel
- typescript

## Git提交规范

为了规范git提交内容，提交的时候commit -m “备注的信息”，为了统一，进行了git的规范。

- 'feat', *// 新功能 feature*
-  'fix', *// 修复 bug*
- 'docs', *// 文档注释*
- ‘style', *// 代码格式(不影响代码运行的变动)*
-  'refactor', *// 重构(既不增加新功能，也不是修复bug)*
- 'perf', *// 性能优化*
-  'test', *// 增加测试*
-  'chore', *// 构建过程或辅助工具的变动*
- 'revert', *// 回退*
- 'build' *// 打包*

配置教程https://blog.csdn.net/m0_67393413/article/details/126100740

### 自动生成规范的commit

使用commitizen、cz-customizable自动生成复合标准的commit

> commitizen@4.2.4
>
> cz-customizable@6.3.0

在我们修改代码之后，使用git cz 代替git commit -m，然后根据提示就能描述自己的git提交的内容了

### 检测commit提交规范

如果不使用git cz命令自动生成提交信息的话，不符合git提交规范的描述信息也能提交。

我们希望的是提交描述信息不符合约定式提交规范的时候，阻止当前提交，并抛出对应的错误提示

1. commitlint： 用于检查提交信息
2. husky： 是git hooks工具

> @commitlint/config-conventional@12.1.4
>
> @commitlint/cli@12.1.4
>
> husky@7.0.1

不符合规范的commit将不可提交会返回报错信息，这时候可以使用git cz辅助生成复合规范的commit。

### 自动格式化代码

在提交的过程中有时提交上去的代码乱七八糟，或者有其他错误代码提交。为了规避这种风险，在代码提交的通过使用husky配合eslint对代码实现自动格式化。

## npm包发布与更新

npm的发布配置项是根目录下的package.json

- name: 包名，后续在npm中搜索全靠它，**跟项目名字没有关系**
- version：版本号，每发布一次npm包就要增加一个版本，每个版本不能重复。
- description：描述
- main: 本包向外暴露的文件，很重要，一定要和你打包出来的文件名一模一样
- private: true/false 是否为私有。一般为false否则只有自己能使用
- keywords: npm检索的关键字
- author: 作者
- license: ISC

### npm发布命令

> npm publish

### npm version参数说明

> patch：小改动，比如修复bug等，版本号 **v1.0.0->v1.0.1**
>
> minor：增加新功能，不影响现有功能,版本号变动 **v1.0.0->v1.1.0**
>
> major：破坏模块对向后的兼容性，版本号变动 **v1.0.0->v2.0.0**

### 添加 dist-tags

先更新version，后发布

> npm version patch
> npm publish --tag beta

### 把dist-tags添加到特定版本

> npm dist-tag add yourpackagename@1.0.2 stable
>
> +stable: yourpackagename@1.0.2

### 下载指定版本包并使用

tag： stable 已经关联到 V1.0.2

> npm install yourpackagename@stable
