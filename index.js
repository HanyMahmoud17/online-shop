// to call server
const express= require('express');
const app=express();
const path= require('path');
// import flash session
const flash= require('connect-flash');

// make serv to my static files
app.use(express.static(path.join(__dirname,"assets")))
app.use(express.static(path.join(__dirname,"images")))
// use flash
app.use(flash())

// use session
const session=require('express-session')
// this to save session in dataBASE NOT IN memory + this return constructor(so i make first letter capital)
const SessionStore= require('connect-mongodb-session')(session)

// not create store to session  
const STORE=new SessionStore({
    uri:'mongodb+srv://HanyMahmoud:9D5X7dxDtfHvhyfn@cluster0.iajcykd.mongodb.net/online-shop?retryWrites=true&w=majority',
    collection: 'sessions'
})

app.use(session({
    secret:"this is my secret key by Hany Mahmoud",
    saveUninitialized:false,
    cookie: {
        // 900 hours is its age
        maxAge: 900*60*60*100
    },
    store:STORE
}))


// use templete engine 
app.set('view engine','ejs');
app.set('views','views');


// route
const homeRouter=require('./routes/home.route')
const productRouter=require('./routes/product.route')
const authRouter=require('./routes/auth.route')
const cartRouter=require('./routes/cart.route')
const orderRouter=require('./routes/order.route')
const adminRouter=require('./routes/admin.route')
app.use('/', homeRouter)
app.use('/product', productRouter)
app.use('/', authRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.use('/admin', adminRouter)

// handle error
app.get('error',(req,res,next) => {
    res.status(500)
    res.render('error.ejs',{
        isUser:req.session.UserId,
        isAdmin : req.session.isAdmin
    })
})
app.use((error,req,res,next)=>{
    res.redirect('/error')
})

app.get('not-admin',(req,res,next) => {
    res.status(403)
    res.render('adminError.ejs',{
        isUser:req.session.UserId,
        isAdmin : false
    })
})

// page not found
app.use((req,res,next)=>{
    res.status(404);
    res.render('not-found',{
        isUser:false,
        isAdmin:false,
        pageTitle:'Page Not Found'
    })
})








// if i need to use a html file i use
app.get('/',(req,res,next)=>{
    res.render('index')
})

// test server
// app.get('/',(req,res,next)=>{
//     res.send('hello world');
// })

const port=process.env.PORT || 3000

app.listen(port,(err)=>{
    // console.log(err);
    console.log('server listening on 3000');
})
