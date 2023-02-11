const express = require("express")
const path = require("path")
const bodyparser = require("body-parser")
const session = require("express-session")
const {v4:uuidv4} = require("uuid")
const router = require('./router')
const app = express()

const PORT = process.env.PORT||4000
// resposible for passing the income req bodies in the middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
  extended:true
}))

app.set('view engine', 'ejs')

//  Load staic asset
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/asset',express.static(path.join(__dirname,'public/asset')))

app.use(session({
  secret:uuidv4(),
  resave: false,
  saveUninitialized:true
}))

app.use('/route',router)
// home route
app.get('/',(req,res)=>{
  res.render('base',{title:"Login System"})

})

app.listen(PORT,()=>{
  console.log("listening to the server on http://localhost:4000")
})