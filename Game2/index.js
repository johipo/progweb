import express, { urlencoded } from "express";
import router from "./src/router/router"
import { engine } from "express-handlebars";
import sass from "node-sass-middleware";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import dotenv from "dotenv";

const morgan = require("morgan");

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.engine('handlebars', engine({
    helpers: require(`${__dirname}/src/views/helpers/helpers`), //helper uma função dentro das views
    layoutsDir: `${__dirname}/src/views/layouts`, //layout é o que fica em padrão em mais de uma view
    defaultLayout: 'main',
}));//cria engine handlebars

app.use(urlencoded({ extended: false }));
app.set('view engine', 'handlebars');//usar ccomo view engine a que foi definida em cima
app.set('views', `${__dirname}/src/views`);

app.use(sass({ //cria um arquivo no css
    src: `${__dirname}/public/scss`,
    dest: `${__dirname}/public/css`,
    outputStyle: "compressed",    //criar css bem compacto
    prefix: "/css" //diretorio para acessar isso tudo
}));

app.use("/img", express.static(`${__dirname}/public/img`));//esse middleware permite o usuario busca uma imagem por meio desse diretorio
app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/webfonts", express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free/webfonts`));
app.use("/js", [    //procura na ordem que aparece
    express.static(`${__dirname}/public/js`),
    express.static(`${__dirname}/node_modules/bootstrap/dist/js/`),
    express.static(`${__dirname}/node_modules/@popperjs/core/dist/umd/`)
]);

app.use(cookieParser());//middleware cookie, cria um metodo no objeto res
app.use(csurf({ cookie: true }));

app.get("/uuid", (req, res) => {
    res.send(uuidv4());
})

app.get("/cookie", (req, res) => {
    if (!('usuario' in req.cookies)) {//req.cookies é um array contendo todos os cookies enviados
        res.cookie('usuario', '1234', { maxAge: 6000 }) //para criar um cookie //maxAge tempo para expirar em milissegundos
        res.send("Usuario não identificado. Criando cookie agora!");
    } else {
        res.send(`Usuario identificado. ID ${req.cookies['usuario']}`);
    }
})

app.use(session({
    genid: (req) => {//define os id dos usuarios
        return uuidv4() // usamos UUIDs para gerar os SESSID //fabrica de hash para definir id de cada usuario
        },
        secret: 'Hi9Cf#mK98', //garantir que o meu sessid foi criado pelo meu proprio servidor
        resave: false,
        saveUninitialized: true
}));

app.use((req, res, next) => {
    app.locals.isLogged = 'uid'in req.session;//variavel booleana que diz se o id do usuario esta logaado ou não
    next();
})

app.get("/session", (req, res) => {
    if(!('qtdItensCarrinho' in req.session)){
        req.session.qtdItensCarrinho = 0;
        res.send("Usuário sem carrinho. Inicializando carrinho de compra");
    }else{
        req.session.qtdItensCarrinho++;
        res.send(`Carrinho ja tinha sido criado. Qttd do carrinho: ${req.session.qtdItensCarrinho}`);
        //req.session.qtdItensCarrinho++; não pode ser aqui pois não posso mexer nas variaveis de sessão depois de enviar a resposta
    }
});

app.get("/apagar-cookie", (req, res) => {
    res.clearCookie('usuario');
    res.send("Cookie foi apagado");
})

//app.use(express.urlencoded( { extended: false }))//como formulario é tudo um objeto so vem como flase se viesse objeto do objeto seria true
app.use(router);
app.use(morgan("combined"));

app.listen(PORT, () => {
    console.log(`Escutando na porta ${PORT}`);
});