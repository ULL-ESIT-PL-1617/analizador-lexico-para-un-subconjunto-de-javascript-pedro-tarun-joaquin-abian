# Administración de Cookies en ExpressJS

## Instalación

Hasta ahora hemos visto qué son las cookies y cómo usar ExpressJS. Sin embargo, ahora vamos a comprobar cómo adquirir la habilidad de manejar cookies en ExpressJS. Lo primero que debemos hacer es instalar el middleware ***cookie-parser*** a través de **npm**:

1. Abre una terminal
2. Posiciónate en el directorio raíz de tu aplicación
3. Ejecuta:

```
$ npm install cookie-parser
```

## Usando Cookie-Parser

Importa ***cookie-parser*** en tu aplicación:

```` 
var express = require('express');
var cookieParser = require('cookie-parser');
    
var app = express();
app.use(cookieParser());
````

## Sintaxis

Cookie-parser parses Cookie header and populate **req.cookies** with an object keyed by the cookie names. To set a new cookie lets define a new route in your express app like :
    
``` 
app.get('/cookie',function(req, res){
     res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
});
```

Para comprobar si una cookie ha sido creada o no, vete a la consola del navegador y escribe **document.cookie**.

El navegador devuelve la cookie al servidor cada vez que hace una petición a la página. Para obtener la cookie que el navegador puede enviar al servidor vinculándola al encabezado, podemos escribir el siguiente código:
    
```
app.get('/', function(req, res) {
  console.log("Cookies :  ", req.cookies);
});
```
    

## ¿Cómo poner Fecha de Caducidad a una Cookie?

La fecha de caducidad de una cookie se puede indicar mediante:
    
```
res.cookie(name , 'value', {expire : new Date() + 9999});
```

Las opciones adicionales para las cookies se pueden especificar pasando un objeto como argumento que contiene ajustes adicionales para las cookies. Por tanto, para poner una fecha, se puede pasar un objeto con atributo ***expire***, que almacena un valor de tiempo en milisegundos.

Alternativamente, se puede usar la propiedad ***maxAge*** para poner una fecha de caducidad.
    
```    
res.cookie(name, 'value', {maxAge : 9999});
```
    

## ¿Cómo borrar una Cookie?

Una cookie existente se puede borrar fácilmente usando el método **clearCookie**, que acepta el nombre de la cookie que quieres borrar.

```
app.get('/clearcookie', function(req,res){
     clearCookie('cookie_name');
     res.send('Cookie deleted');
});
```

Ahora, puedes comprobar en tu navegador que la cookie se ha borrado.