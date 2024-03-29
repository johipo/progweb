import { Curso, Usuario } from "../models/index";
import bcrypt, { hash } from "bcryptjs";

const index = (req, res) => {
    const username = "Joao";
    res.render("main/index", {
        username: username,
        isRyan: username === 'Ryan',
        //layout: false
    });//pega o diretorio src/view dito no index.js
};

const profs = (req, res) => {
    const professores = [
        {nome: "David Fernandes", sala: 1238},
        {nome: "Horácio Fernandes", sala: 1333},
        {nome: "Tayana Conte", sala: 1234},
        {nome: "Leandro Galvão", sala: 1111}
    ];
    res.render("main/profs", {
        professores, //no lugar de colocar profs: profs pode se colocar desse jeito ja que os dois nomes são iguais
    });
}

const signup = async (req, res) => {
    const cursos = await Curso.findAll();
    if (req.route.methods.get) {
        res.render("main/signup", {
            cursos: cursos.map(c => c.toJSON()),
            csrf: req.csrfToken()
        });
    } else {//Post
        const usuario = req.body;
        try {
            bcrypt.genSalt(10, (errorSalt, salt) => {//gera salt
                bcrypt.hash(usuario.senha, salt, async (error, hash) => { //gera hash
                    await Usuario.create({
                        nome: usuario.nome,
                        email:usuario.email,
                        senha: hash,
                        cursoId: usuario.cursoId
                    });
                    res.redirect("/");
                })
            })
            //await Usuario.create(usuario);
        } catch (error) {
            console.log(error);
        }
    }
    
}

const login = async (req, res) =>{
    if(req.route.methods.get){
        res.render("main/login", {
            csrf: req.csrfToken()
        })
    }else{
        const credentials = req.body;
        const user = await Usuario.findOne({ where: { email: credentials.email }});//email certo
        if (user) {
            bcrypt.compare(credentials.senha, user.senha, (error, sucesso) => {//comparar senha criptografada e senha normal
                if (error) console.log(error);
                else if (sucesso){//senha certa
                    req.session.uid = user.id;
                    res.redirect("/");
                } else {
                    res.render("main/login", {
                        csrf: req.csrfToken()
                    })
                }
            })
        }else{
            res.render("main/login", {
                csrf: req.csrfToken()
            })
        }
        console.log(user.id);
    }
}
const logout = (req, res) =>{
    req.session.destroy((error) => {
        if(error) console.log(error)
        else res.redirect("/");
    })
}


const about = (req, res) => {
    res.render("main/about", {
    });
};

const ui = (req, res) => {
    res.render("main/ui", {
    });
};

export default { index, about, profs, ui, signup, login, logout };