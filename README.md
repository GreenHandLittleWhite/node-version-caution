# node-version-caution

项目所需 node 版本提示

## 使用

在项目`package.json`中添加字段

```json
{
  // ...省略
  "nvc": {
    "node": "14.15.3"
  }
}
```

打开项目时，会有弹窗提示，右下角也会有提示

![avatar](./assets/example.png)
