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

