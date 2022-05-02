import { Area } from "../models/index";

const index = async (req, res) => {
    const areas = await Area.findAll(); //recuperar todos os registros com findAll
    res.render("area/index",  { 
        areas: areas.map((area) => area.toJSON()) //mostra cada area de forma mais amigavel
    });
}

export default { index }