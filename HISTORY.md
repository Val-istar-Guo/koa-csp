# HISTORY

### 标示说明

[+] 添加  [-] 删除  [#] 修复  [^] 升级

### 版本迭代说明

* v 1.0.11
  * [#] FIXBUG: README.md Usage example code error.
  * [+] set param enableWarn default true.
* v 1.0.10
  * [#] use `prepublish` instead of `prepublishOnly` to ensure run `rollup -c` before publish, add publish the floder `dist/` after run `rollup -c`.
* v 1.0.7 ~ 1.0.9 [Problem version;Don't Use it]
  * [#] test why prepublishOnly run `rollup -c` before publish,but was not publish `dist/` file. this lead to many problem version.
  * [+] add more introduce to README.md
  * [+] add HISTORY.md
* v 1.0.6
  * [#] Fix Bug: can't import koa-csp, because forget uplode dist/ floder last version.
* v 1.0.5 [Problem version;Don't Use it]
  * [^] 支持关键字 'none', 'unsafe-inline', 'unsafe-eval' 自动添加单引号
* v 1.0.4
* v 1.0.0 ~ v 1.0.3 [Problem version;Don't Use it]
  * [-] 学习npm publish，勿下载
