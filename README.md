## 环境
node v14.17.3  
npm 6.14.13  
Docker version 20.10.8, build 3967b7d

## 启动mongo与mongo-express
```docker-compose up -d```

## mongo-express
```http://localhost:8081```

## oauth2服务
```cd oauth2-server```

### 安装依赖
```npm install```

### 运行
```npm start```

### 接口
#### 用户注册
```
curl http://localhost:8123/register \
    -d "username=田七" \
    -d "password=123456" \
    -H "Content-Type: application/x-www-form-urlencoded"
```

#### 客户端注册
```
curl http://localhost:8123/client \
    -d "clientId=engrafo" \
    -d "clientSecret=engrafo" \
    -H "Content-Type: application/x-www-form-urlencoded"
```