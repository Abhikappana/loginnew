const express = require('express')
const app = express()
const path = require('path')
const nocache = require('nocache')



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }))
app.use(nocache())

//session working
const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.get('/signout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

/* GET home page. */

const phone = [
    {
        name: "IPhone 14",
        category: "Mobile",
        description: "this is a good phone",
        image: "https://d1rlzxa98cyc61.cloudfront.net/catalog/product/cache/1801c418208f9607a371e61f8d9184d9/1/8/184913_2022.jpg"
    },
    {
        name: "IPhone 15",
        category: "Mobile",
        description: "this is a good phone",
        image: "https://assets.products-live.ao.com/Images/411cfc19-721f-4758-b049-ef82d417bc2a/1280x1280/iPhone_15_Blue_Apple_01.jpg"
    },
    {
        name: "IPhone 14 pro",
        category: "Mobile",
        description: "this is a good phone",
        image: "https://cellbuddy.in/buddy/wp-content/uploads/2022/09/14-Pro-Deep-Purple-2.png"
    },
    {
        name: "IPhone 15 pro",
        category: "Mobile",
        description: "this is good phone",
        image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1694674187/Croma%20Assets/Communication/Mobiles/Images/300820_0_i1ewet.png?tr=w-640"
    }
]

function checkSignIn(req, res, next) {
    if (req.session.isAuth) {
        next();
    }
    else {
        res.redirect("/");
    }
}

app.get('/', (req, res) => {
    if (req.session.isAuth) {
        res.redirect('/home')
    }
    else {
        res.render('login')
    }  
});

credential = {
    username:"abhi",
    password:"123"
}
var uName;

app.post('/login', (req, res, next) => {
    console.log("1")
    if (req.body.username == credential.username && req.body.password == credential.password) {
        console.log("2")
        req.session.isAuth = true;
        res.redirect('/home')
    }
    else { 
        console.log("3")
        const message = 'Invalid Username and Password';
        res.render('login', { message, redirect: true });  
        
    }
});

app.get('/home', checkSignIn, (req, res) => {
    res.render('home', { phone, uName })
})

app.listen(3000, () => {
    console.log("listening on server!")
}) 
console.log("http://localhost:3000") 