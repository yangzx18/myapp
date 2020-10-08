### 安装运行环境


1. 安装python

2. 安装依赖

   
```shell
cd server
pip install -r requirements.txt
```

### 运行

切换工作目录到项目根文件下，运行如下命令：

```shell 
cd server/ && python app.py
```
在浏览器中打开http://localhost:9889/


### 重新打包前端页面

```shell 
cd front/
yarn install
yarn build
    
```
打包后需要将打包文件复制到后端环境中，如下：

1. 将build文件夹下index.html文件复制到server/templates文件夹中,重命名为myapp.html
2. 将build文件夹复制到server/static目录中，并将文件夹重命名为myapp
3. 重新启动服务，运行python app.py
