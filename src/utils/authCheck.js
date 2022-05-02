const authCheck = (req, res, next) =>{//se o cara estiver logado vai para proxima cadeia de middleware se não pasta raiz
    if ('uid' in req.session) next();
    else res.redirect("/login")
}

export default authCheck;