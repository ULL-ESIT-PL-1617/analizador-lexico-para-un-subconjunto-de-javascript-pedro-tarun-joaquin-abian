# cookie-counter.js

---

### cookie-session

Cookie-session es un middleware para una sesion simple basada en cookies. Funciona con la siguiente API:

```js
var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.use(cookieSession({
  name: 'session',
  keys: [/* secret keys */],
}))
```

### cookieSession\(options\)

Crea un middleware para una sesión con cookies. Este middleware pasará "**session**" a "**req**", que provee de un objeto que representa la sesión cargada.

El middleware enviará automáticamente una cabecera Set-Cookie a la respuesta si el contenido de "req.session" \(nuestra sesión\) fuera alterado, por lo que no habrá ninguna cabecera Set-Cookie en la respuesta si no hay contenido en la sesión, por lo que hay que añadir algo a req.session desde que hayas identificado algo para almacenar en la sesión.

* **name: **el nombre del cookie a añadir.
* **keys: **La lista de claves a usar para verificar valores de cookies. Las cookies de configuración siempre son "firmadas" en keys\[0\], mientras que las otras claves sirven para la verificación, permitiendo la rotación de claves.

### Ejemplo: cookie-counter.js

```js
var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.get('/', function (req, res, next) {
  // Update views
  req.session.views = (req.session.views || 0) + 1

  // Write response
  res.end(req.session.views + ' views')
})

app.listen(3000)
```

Este ejemplo utiliza la API explicada anteriormente. Aquí se crea un handdler para '/' en el que se incrementa en 1 las visitas a la sesion \(pasada al objeto req, como comentamos anteriormente\). Obtendremos en el navegador "\[numero de visitas en la sesion\] views" desde el objeto response si accedemos a "localhost:3000/".

