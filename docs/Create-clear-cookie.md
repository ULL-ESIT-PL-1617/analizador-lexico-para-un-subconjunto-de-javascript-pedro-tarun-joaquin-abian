# Create-clear-cookie
---
En este ejemplo demostramos como crear un cookie y enviarlo al cliente. Lo que se propone es crear un cookie con un determinado nombre y enviarlo al cliente, de modo que cuando se vuelva a conectar podamos identificarlo.

> res.cookie('PL_Cookie' , 'Cookie_for_PL!')



Una vez hemos enviado el cookies es bastante sencillo usarlo. Basta con acceder a

>req.cookies

Para poder analizar este objeto, necesitamos el módulo 'util', y lo utilizamos del siguiente modo:
> util.inspect(req.cookies)

De este modo ya podemos crear y analizar cookies
```
app.get('/createCookie',function(req, res){
        console.log('To view your cookie in web browser, go to developer tools and Application. Then to Cookies')
        res.cookie('PL_Cookie' , 'Cookie_for_PL!').send('Cookie is set. Visit /seeCookie to view. Visit /clearCookie to delete.');
});

app.get('/seeCookie', function(req, res){
     res.send("This is your cookie" + util.inspect(req.cookies))
})
```

Sin embargo, puede que en algún momento queramos borrarla, para lo que existe el comando:
>res.clearcookie(<nombredelcookie>)

De ese modo podemos observar que en el cliente desaparece la cookie.

```
app.get('/clearCookie', function(req,res){
     res.clearCookie('PL_Cookie');
     res.send('Cookie deleted');
});
```


