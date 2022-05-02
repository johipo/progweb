const models = require("../models/index")
const Curso = models.Curso;
const Area = models.Area;

async function index (req, res) {//listar cursos criados
    const cursos = await Curso.findAll();
    res.render("curso/index", {
        cursos: cursos.map((curso) => curso.toJSON()),
        csrf: req.csrfToken()
    })
};

async function create (req, res) {
    try{
        if(req.route.methods.get){
            res.render("curso/create", {
                csrf: req.csrfToken()
            });
        }else{//post
            await Curso.create({
                sigla: req.body.sigla,//req.body é o urlencoded codificado
                nome: req.body.nome,
                descricao: req.body.descricao,
                areaId: req.body.area,
            });
            res.redirect("/curso/");
        }
    }catch(errors){
        res.render("curso/update" , {
            curso: req.body,
            errors: errors, //passar o erro que aconteceu na view
        });
    }
};
async function read (req, res) {
    /*const curso = await Curso.findOne({where: {id: req.params.id}}) //req.params.id é a informação que o usuario passa na barra de pesquisa
    res.render("curso/read", {
        curso: curso.toJSON()//por não ser um array colocar so toJSON
    })*/
    const { id } = req.params;
    try{
        const curso = await Curso.findByPk(id, { include: Area})//conexão com chave estrangeira
        res.render("curso/read", { curso: curso.toJSON() })
    }catch(error){
        console.log(error);
    }
};
async function update (req, res) {
    const curso = await Curso.findOne({where: {id:req.params.id}});
    if(req.route.methods.get){//rederinza a view
        res.render("curso/update" , {
            curso: curso.toJSON(),
            csrf: req.csrfToken()
        })
    }else{//se for POST
        try{
            await Curso.update({
                sigla: req.body.sigla,
                nome: req.body.nome,
                descricao: req.body.descricao,
                areaId: req.body.areaId,
            }, {where:{id:req.params.id}});//onde vai ser atualizado
            res.redirect("/curso/" + req.params.id)
        }catch(errors){
            res.render("curso/update" , {
                curso: req.body,
                errors: errors, //passar o erro que aconteceu na view
            });
        }
    }
};
async function remove (req, res) {
    /*//await Curso.destroy({where:{id:req.params.id}});
    const curso = await Curso.findOne({where:{id:req.params.id}});//recupera o curso que quer deletar
    await curso.destroy();
    res.redirect("/curso/");*/
    const { id } = req.params;
    try{
        await Curso.destroy({ where: { id: id } })
        res.send("Curso apagado com sucesso",);//status bem sucedido é 200
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = { index, create, read, update, remove }    