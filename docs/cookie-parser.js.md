# cookie-parser.js

---

```js
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

app.get('/', function (req, res) {
// Cookies that have not been signed
console.log('Cookies: ', req.cookies)

})

app.listen(8080)
```

> Credits: https://www.npmjs.com/package/cookie-parser

Este ejemplo, que utiliza el módulo _cookie-parser_, te permite capturar las cookies que estén en el _document.cookie_ y mostrarlas por pantalla. Para comprobarlo, arrancar el programa con node, ir a _localhost:8080/_ y desde la consola del navegador, utilizar la funcion _setCookie\(\)_ que ya hemos comentado en anteriores ejemplos para añadir una cookie a nuestro _document.cookie_. A continuación, podremos ver desde nuestra terminal, que se muestran las cookies previamente insertadas. Es un ejemplo sencillo que ilustra el parseo de las cookies desde el navegador hasta la terminal.
