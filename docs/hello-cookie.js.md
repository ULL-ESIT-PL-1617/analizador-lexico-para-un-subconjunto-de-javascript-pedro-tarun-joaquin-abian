# hello-cookie.js

---

En este ejemplo veremos una forma muy simple de realizar un login utilizando cookies y permitir el acceso a /content tan solo si el usuario ha realizado el login.

```js
var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
var path = require('path')

app.use(express.static(path.join(__dirname, '/../img')))

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "who" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

app.get('/', function(req, res, next){
   res.send("Visit /content. If you cannot see anything, you should login at /login.To logout go to /logout")
})

// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed' + 'You should visit /login?username=user&password=yourpassword' + "\n Try user = who and password = whospassword");
  } else if(req.query.username === "who" || req.query.password === "whospassword") {
    req.session.user = "who";
    req.session.admin = true;
    res.send("login success!");
  }
});

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

// Get content endpoint
app.get('/content', auth, function (req, res) {
    //res.sendFile('../kitten.jpg')
    //res.write("You can only see this after you've logged in.");
    res.send('<a>You can only see this after you have logged in.</a><br><img src="kitten.jpg">')
});

app.listen(3000);
console.log("app running at http://localhost:3000");
```

#### Comentando el ejemplo:

En la variable "**auth**" estamos creando un middleware que solo dejará pasar si existe una sesion y si el usuario de dicha sesión es el usuario "who", que a demás es el admin. Este middleware es utilizado en el handdler para "/content", que tiene una respuesta tan solo si te has registrado previamente, es decir, si has entrado a /login como /login?username=who&password=whospassword, de otra manera no se permitirá el login. Si entras a la ruta "/logout", se destruye la sesión actual.

