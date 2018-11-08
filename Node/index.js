const pg = require('pg');
var squel = require("squel");
var app = require('express')();
var http = require("http").Server(app);
//var log = require('log');
var bodyParser = require('body-parser');
var io = require('socket.io')(http);

const config = {
  user: 'postgres',
  database: 'postgres',
  password: 'admin',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 3000,
};

const pool = new pg.Pool(config);

pool.connect()

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.get('/posts', function (req, res) {
  var s = squel.select();
  if(!isNaN(req.query.id)){
    s.from("postdb.post")
    .where(`post_id = ${req.query.id}`);
  }else{
    s.from("postdb.post")
  }
  
  
  pool.query(s.toString(), (err, result) => {
    if (err) {
      console.error('Error executing query', err.stack)
      res.end(err.stack.toString());
    }
    console.log(result.rows);
    res.end(JSON.stringify(result.rows));
  })
})

app.post('/posts', function (req, res) {
  var q;
  if(req.body.post_id){
    q = squel.update({ replaceSingleQuotes: true })
    .table("postdb.post")
    .set("post_desc", req.body.post_desc)
    .set("title", req.body.title)
    .set("postdata", req.body.postdata)
    .set("poster_avatar", req.body.poster_avatar? req.body.poster_avatar : 'https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png')
    .set("banner", req.body.banner)
    .set("likes", req.body.likes)
    .set("dislikes", req.body.dislikes)
    .set("tags", req.body.tags)
    .set("views", req.body.views)
    .where(`post_id = ${req.body.post_id}`)
    .toString();
  }else{
    q = squel.insert({ replaceSingleQuotes: true })
    .into("postdb.post")
    .set("post_desc", req.body.post_desc)
    .set("title", req.body.title)
    .set("postdata", req.body.postdata)
    .set("poster_avatar", req.body.poster_avatar? req.body.poster_avatar : 'https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png')
    .set("banner", req.body.banner)
    .toString();
  }
  
  pool.query(q.toString(), (err, result) => {
    if (err) {
      console.error('Error executing query', err.stack)
      res.end(err.stack.toString());
    }
    //console.log(result.rows);
    res.end(JSON.stringify(result.rows));
    pushLastInsertedRecordToSocket(req.body.post_id);
  })
})

function pushLastInsertedRecordToSocket(id) {
  var s = squel.select();
  if(id){
    s.from("postdb.post")
    .where(`post_id = ${id}`)
    .limit(1);
  }else{
    s.from("postdb.post")
    .order("post_id", false)
    .limit(1);
  }
  
  pool.query(s.toString(), (err, result) => {
    if (err) {
      console.error('Error executing query', err.stack)
      res.end(err.stack.toString());
    }
    console.log(result.rows[0]);
    io.of('/postcrud').emit("NewPost",result.rows[0]);
  })
}


http.listen(80);

io.of('/postcrud')
  .on('connection', function (socket) {
    console.log('a user connected');
    socket.emit('NewConnection', "New connection added");
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("app listening at http://%s:%s", host, port)
})