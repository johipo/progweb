import express from "express";
import mainController from "../controllers/main";
import areaController from "../controllers/area";
import cursoController from "../controllers/curso";
import jogoController from "../controllers/jogo";
import authCheck from "../utils/authCheck"

const router = express.Router();    //objeto para definir rotas da aplicação

//Main controller
router.get("/", mainController.index);
router.get("/about", mainController.about);
router.get("/profs", mainController.profs);
router.get("/signup", mainController.signup);
router.post("/signup", mainController.signup);
router.get("/login", mainController.login);
router.post("/login", mainController.login);
router.get("/logout", mainController.logout);
router.get("/ui", mainController.ui);

//User controller

//Area controller
router.get("/areas", areaController.index);

//Curso controller
router.get("/curso", authCheck, cursoController.index);

router.get("/curso/create", authCheck, cursoController.create);//imprimir o formulario //com authCheck so é executado se tiver next
router.post("/curso/create", authCheck, cursoController.create);//receber os dados do formulario

router.get("/curso/update/:id", authCheck, cursoController.update);
router.post("/curso/update/:id", authCheck, cursoController.update);

router.get("/curso/:id", authCheck, cursoController.read); //:id diz que é o argumento dessa rota
router.delete("/curso/:id", authCheck, cursoController.remove); //:id diz que é o argumento dessa rota

//Jogo Controller
router.get("/jogo/index", authCheck, jogoController.index);
router.get("/jogo/ranking", authCheck, jogoController.ranking);
router.get("/jogo/save", authCheck, jogoController.save); 


//Products controller

export default router;
