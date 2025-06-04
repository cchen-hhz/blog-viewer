# 简易小站点

已经部署的版本：[这里](http://139.9.132.77:8080)，随时会因为云服务器到期失效（ 6 月 27 日失效），因为云服务器配置较低（2核 2GiB），有点跑不动 docker，用的手动部署。

## 使用

```bash
docker compose -f docker-compose.yml up --build
```

用到了 mongodb, nginx, node 的镜像，前端直接构建出静态文件传到 nginx 中，可以修改 docker-compose 的配置文件更改映射端口（这里使用的 9000）。

数据库会在本地 `mongo_data` 下关联卷，是持久化的。

