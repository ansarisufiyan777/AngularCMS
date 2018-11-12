# AngularCMS
Content Management System in Angular 6

[![Video Presentation](https://raw.githubusercontent.com/ansarisufiyan777/AngularCMS/master/Resources/Home.PNG)](https://youtu.be/8I-3u1TLSfE)

## Database setup
Find db.sql in **Node** folder
Run it on **PostgreSQL**

Add configuration details of the database into index.js

currently setting is default as per the configuration

`
const config = {
  user: 'postgres',
  database: 'postgres',
  password: 'admin',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 3000,
};

`

## Server setup
Prerequisites:
1) Install Node

Go into the Node directory and run **npm install**
run index.js to host a service by command: **node index.js** inside Node folder

## Client setup

Angular 6 is required to run a client project

Go into the Angular directory and run **npm install**

Acter completion of the installation run **ng serve**

the application will hosted on **localhost:4200** open the same url on Chrome








