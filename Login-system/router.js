let express = require("express")
let router = express.Router()

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}

// login user
router.post('/login',(req,res)=>{
    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.user=req.body.email
        res.redirect('/route/dashboard')
        // res.end('Logged in successfully')
    }else{
      res.end("invalid Username")  
    }
})

// route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }
    else{
       res.send("Unauth User") 
    }
})

// route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
          console.log(err)
          res.send("Error")  
        }
        else{
            res.render('base',{titel:"Express",logout:"Logout successfully"})
        }
    })
})
module.exports = router