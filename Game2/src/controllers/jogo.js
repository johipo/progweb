import { Usuario, Partida } from "../models/index";

const index = async (req, res) => {
    const users = await Usuario.findAll();
    if (req.route.methods.get) {
        res.render("jogo/index", {
            users: users.map(u => u.toJSON()),
            csrf: req.csrfToken()
        });
    }
    
};

const ranking = async (req, res) => {
    const partidas = await Partida.findAll();
    res.render("jogo/ranking", {
        partidas: partidas.map((partida) => partida.toJSON())
    });
}
const save = (req, res) => {
    res.render("jogo/save", {
    });
}

export default { index, ranking, save};