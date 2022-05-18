# personal-blog-template

#### Introduction

personal-blog-template is a CMS system that is designed for individual open source integration articles, page creation, and knowledge widgets. The technologies involved are as follows: 

- `MySQL`：data storage
- `next.js`：front-end page frame
- `nest.js`： server-side framework 
- `AliyunOSS`：object storage

#### function points 

- article management 
- page management 
- knowledge booklet 
- comment management 
- mail management 
- access statistics 
- file management 
- system Settings 

More features, welcome access to the system experience. 



#### project operation 

##### database 

First, install the mysqlis, which is recommended for the installation of docker. 

```bash
docker image pull mysql:5.7
docker run -d --restart=always --name personal-blog-template -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:5.7
```

Then create the database in 'MySQL'.

```bash
docker container exec -it personal-blog-template bash;
mysql -u root -p;
CREATE DATABASE  `personal-blog-template` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Run locally  

**First, the Clone project.**  

```bash
git clone --depth=1 https://github.com/Yoga2015/personal-blog-template.git your-project-name
```

- **Then, install the project dependencies.**

```bash
yarn
```

- **initiate a project**

```bash
yarn dev
```

Front page address: 'http://localhost:3000'.  

Background management address: 'http://localhost:3001'.  

Service interface address: 'http://localhost:4000'.  

For the first startup, the default administrator user is admin and the password is admin (which can be changed in the '. Env 'file).  

[PS] If the server configuration fails to start, please check whether the MySQL configuration is correct first. The configuration file is in '. Env '. In the production environment, the system address must be correctly set in the background; otherwise, the TWO-DIMENSIONAL code cannot be correctly identified. In the local development environment, if the domain name is not specified, the domain name is left blank by default.  

#### The configuration file  

The .env file is loaded by default. The production environment will try to load the.env.prod file.  

```bash
CLIENT_ASSET_PREFIX=/ # client package prefix address (similar to webpack publicPath configuration)  
ADMIN_ASSET_PREFIX=/ # admin Package prefix address  
SERVER_API_URL = http://localhost:4000/api # interface address  
 
ADMIN_USER=admin # Default administrator account  
ADMIN_PASSWD=admin # Default administrator password  
DB_HOST=127.0.0.1  
DB_PORT=3306 # Database port  
DB_USER=root # Database user name  
DB_PASSWD=root # database password  
DB_DATABASE=personal-blog-template  
 
# about making request https://www.ruanyifeng.com/blog/2019/04/github-oauth.html for reference  
GITHUB_CLIENT_ID=0 # Github login Id  
GITHUB_CLIENT_SECRET=0 # Github login Secret  
```

#### Project deployment  

The production environment deployment script is as follows: 

```bash
node -v
npm -v

npm config set registry http://registry.npmjs.org

npm i -g pm2 @nestjs/cli yarn

yarn
yarn run build
yarn run pm2

pm2 startup
pm2 save
```

#### nginx configuration  

 Set 'proxy_set_header x-real-ip $remote_addr'; 'so that the server can obtain the real IP address.  

```bash
upstream personal-blog-template_client {
  server 127.0.0.1:3000;
  keepalive 64;
}

# http -> https  redirect
server {
  listen  80;
  server_name domain name;
  rewrite ^(.*)$  https://$host$1 permanent;
}

server {
  listen 443 ssl;
  server_name domain name;
  ssl_certificate    Certificate Storage Path;
  ssl_certificate_key  Certificate Storage Path;

  location / {
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_cache_bypass $http_upgrade;
    proxy_pass http://personal-blog-template_client; #reverse proxy
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

## information 

-  next. Js source: https://github.com/vercel/next.js  
- next. Js File: https://nextjs.org/  
- nest. Js source: https://github.com/nestjs/nest  
- Nest.js Documentation: https://nestjs.com/  
