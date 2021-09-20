const urlControllers = {
    checkURL: (req, res, next) => {
        if(req.url.startsWith('/productos/') || req.url.startsWith('/eliminar-producto/') || req.url.startsWith('/editar-producto/') ){
            next()
        }else{
            let validURL = ["/", "/admin", "/crearCuenta", "/ingresar", "/desconectar"]
            validURL.includes(req.url) ? next() : res.redirect('/')
        }
    }
}
module.exports = urlControllers


