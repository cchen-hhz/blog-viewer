# API 文档

用于前端和后端交互的接口。

## 使用

在 `.env` 中填入根目录，加载 `apiPack` 。

状态码可以在 [runoob](https://www.runoob.com/http/http-status-codes.html) 查询，状态码统一为 `status` 字段。

## 特例

- 需要提供 token 时提供有 **管理员权限** 或 **根用户权限** 的 token 可以通过所有检查。
- 需要 token 的命令在文件头添加 `authorization bearer` + token 。

## checker():Number

路径 `basic/api/checker` 

测活，当服务器连通时返回 200。

## users

和用户验证相关的一些 api。

### query_all():Object

路径 `basic/api/user/query_all`。

查询所有的用户，返回状态码和一个用户数组，状态码为 $[200,500]$ 其中一个。

### qualify(username, password, token):Object

路径 `basic/api/user/qualify`

用户验证，若 `token` 为 `true` 则创建一个 token 。

返回一个对象，状态码为 $[200,400,404,500]$ 其中一个，当状态码为 $200$ 且 `token` 为 `true` 时返回 token，其余情况为 `undefined`，当状态码为 $200$ 时同时返回 `uid`。

一旦 token 被创建，之前的 token 会失效，并且该 token 会一直合法直到新的 token 被创建。

### register(username, password):Object

路径为 `basic/api/user/register`

用于创建用户加入数据库，返回对象，状态码为 $[201, 400, 406, 500]$ 其中一个，并附带 `message` 字段。

## note

### new Note(title, author, content):Object

创建一个 `note` 对象，其中 `author` 应当为用户的 `uid` 。

### query_all():Object

路径为 `basic/api/note/query_all`

查询所有的笔记，返回一个包含状态码和一个 `note` 数组的对象，状态码为 $[200，500]$ 其中一个。

### query_user(uid):Object

路径为 `basic/api/note/userquery/:uid`

查询某个用户的所有笔记，返回状态码和一个 `note` 数组，状态码为 $[200,404,500]$ 其中一个。

### query_note(id):Object

路径为 `basic/api/note/notequery/:uid`

查询指定 id 的 note 信息。

### create(note, token):Object

路径为 `basic/api/note/create`

添加一个笔记，你需要提供该用户下的 `token`。

返回对象，状态码为 $[201,400,403,500]$ 其中一个，并附带 `message`。

### update(id, note, token):Object

路径为 `basic/api/note/:id`，发送 PUT 请求。

更新一个存在的 note，你需要提供原始笔记的 id，并附带 token，三者必须指向同一个用户。

返回一个对象，状态码为 $[201, 404, 403,500]$ 其中一个，并返回 `message`。

### remove(id, token):Object

路径为 `basic/api/note/:id`，发送 DELETE 请求。

删除一个笔记，你需要提供笔记的 id 和对应用户的 token。

返回一个对象，状态码为 $[201,404,403,500]$ 其中一个，并返回 `message`。

## admin

还没实现 :(

用于调试和管理，请谨慎使用这些功能。

### delete_user(uid,token):Object

删除一个用户，你需要提供有管理员身份及以上的用户的 token。

返回状态码($[200, 403,404, 500]$) 和一个 `message`。

### stage_qualify(uid, option, token):Object

更改一个用户的权限，必须提供根用户的 `token`。

返回状态码 $[200,403,404,500]$ 和一个 `message`。


















