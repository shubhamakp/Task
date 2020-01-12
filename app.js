const express = require('express')
const app = express()
const path =require('path')
var request = require('request');
const bodyParser = require('body-parser');
const items = require('./models/db')
const sequelize = require('./models/db')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded ({extended : true}))

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', 'views');

// let bd = [];
// request('https://task.dressworm.com/menu.json', function (error, response, body) {
//    bd =  JSON.parse(body)
// })


app.get('/',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'views','store.html'))
  // res.render('store',{bd})
})

app.post('/',(req,res)=>{


  const data = req.body;
  // console.log(data)
  // console.log(data.category)
  // console.log(data.title)
  // console.log(new Date())
  
var st = data.price.toString();
var str = parseInt(st.slice(2,5))

  items.create({
    category : data.category,
    name :data.title,
    price:str,
    time :new Date()
  }).then(() =>{
    console.log("inserted")
})
.catch((err) =>{
    console.log(err)
})
  
  res.sendFile(path.join(__dirname,'views','store.html'))
})

sequelize.sync()
.then((result) =>{
    //console.log(result)
    app.listen(3000)
})
.catch((err) =>{
    console.log(err)
})
