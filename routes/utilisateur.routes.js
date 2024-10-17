const express = require("express")
const utilisateur_routes = express.Router("")
const utilisateur_controller = require("../controllers/utilisateur.controller")

utilisateur_routes.post("/create_user", utilisateur_controller.createUtilisateur)
utilisateur_routes.get("/", utilisateur_controller.findAll),
utilisateur_routes.put("/update_user/:ID_UTILISATEUR", utilisateur_controller.updateUtilisateur);



module.exports = utilisateur_routes