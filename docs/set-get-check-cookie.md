# Set-get-check-cookie.js

---

> Credits: w3schools.com

### Ejemplo de cookie en JavaScript

En el ejemplo que verémos a continuación, crearemos un cookie que almacena el nombre de un visitante. Estos ejemplos se pueden comprobar desde la consola de cualquier navegador.

La primera vez que un visitante visita la pagina web, se le hará rellenar su nombre. El nombre quedará almacenado en un cookie.

La siguiente vez que el visitante llegue a la pagina, recibirá un mensaje de bienvenida.

Para el ejemplo crearemos 3 funciones en JavaScript:

* Una funcion para añadir un valor a una cookie
* Una funcion para obtener un valor de una cookie
* Una funcion para comprobar el valor de una cookie

#### La función para añadir una cookie

Primero vamos a crear la funcion que almacena el nombre del visitante en una cookie:

```js
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
```

###### Explicación del ejemplo

Los parámetros de la funcion son el nombre de la cookie \(cname\), el valor de la cookie \(cvalue\), y el numero de dias para que expire el cookie \(exdays\).

La función almacena un cookie añadiendo el nombre del cookie, su valor y la fecha de expiración mediante la última línea:

```js
document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
```

#### La función para obtener un cookie

A continuación, vamos a crear una función que devuelve el valor de un cookie específico:

```js
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
```

###### Explicación del ejemplo

El nombre del cookie se obtiene por parámetros \(cname\).

Se crea una variable nombre con el nombre del cookie y "=".

Se decodifica el cookie string, para poder manejar cookies con caracteres especiales, como '$'.

Se parte el document.cookie por ";" en un array de tokens \(ca\).

Se recorren todos los tokens del vector en un bucle "for", es decir, todas las cookies y se almacena el cookie actual en la variable "c". Si el cookie se encuentra, es decir si c contiene \(cname\), se devuelve el valor del cookie \(name.length y c.length\).

#### La función para comprobar un cookie

Por último, crearemos una funcion que comprueba si un cookie está añadido.

```js
function checkCookie() {
    var username = getCookie("username");
    if (username != "") {
        alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        }
    }
}
```

###### Explicación del ejemplo

Si se encuentra el cookie dentro del string, se enviará un mensaje de saludo con el nombre del usuario que ya ha sido añadido al string de cookies. Si no, se le pide que introduzca su nombre y se crea un cookie con su nombre correspondiente y fecha de expiración en un año. Este cookie por último se almacena con la funcion previamente creada
