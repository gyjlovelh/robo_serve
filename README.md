<!--
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-02 22:24:30
 * @LastEditTime: 2019-02-03 12:56:46
 -->

# rob_server

###
模块设计：
    用户模块：「
        1，用户创建的集合配置信息，将存储在其collectionConfig字段中
        2，用户的集合命名以用户的唯一code为前缀
    」
    自定义集合模块： 「
        1，
    」

### 使用TypeScript编写nodejs服务端

- 安装依赖
```
yarn add typescript ts-node nodemon @types/koa @types/koa-router -D
```
- 添加 ==tsconfig.json== 配置

```
{
    "compileOnSave": false,
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "sourceMap": true,
        "declaration": false,
        "noImplicitAny": true,
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "outDir": "dist/out-tsc", // 编译出的js目录
        "baseUrl": ".",
        "typeRoots": ["node_modules/@types"],
        "lib": ["es5", "es6", "dom", "es2015.collection"],
        "paths": {
            "*": [
                "node_modules/*",
                "src/types/*"
            ]
        }
    },
    "exclude": [
        "node_modules"
    ],
    "include": [
        "src/**/*" // ts资源目录
    ]
}
```
- 在src下创建nodejs入口文件
- 添加脚本实现热更新

```
"scripts": {
    "start": "tsc && node dist/server.js",
    "start:watch": "nodemon --watch 'src/**/*' -e ts,tsx --exec 'ts-node' ./src/server.ts"
}
```


