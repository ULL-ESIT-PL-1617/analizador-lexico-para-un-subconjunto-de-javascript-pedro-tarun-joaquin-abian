# Creación de Cookies

---

Como hemos estudiado previamente, las cookies siguen una estructura predefinida. Pero, ¿Cómo es el proceso de creación de estas?. En primer lugar, en la primera petición, el servidor crea o genera lo que se denomina una **Set-Cookie, **mediante un programa **CGI** o Interfaz de entrada común**. **Esta contendrá la estrcutura de la cookie, pero con algunos campos vacíos, como por ejemplo, &lt;cookie-value&gt;. Por lo tanto, en la siguiente petición, esos campos vacíos serán completados por el cliente.

Por ejemplo:

**Navegador-&gt;Servidor**

```
GET /index.html HTTP/1.1
```

**Navegador&lt;-Servidor**

```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value

(content of page)
```

Ahora, imaginemos que el mismo cliente hace otra petición a otra página del mismo servidor o dominio, en este caso no es necesario que el servidor genere una nueva cookie, pues el cliente ya posee una cookie de sesión para el mismo dominio. Por lo tanto, la petición tendría el siguiente aspecto:

**Navegador-&gt;Servidor**

```
GET /spec.html HTTP/1.1
Cookie: name=value
Accept: */*
```



