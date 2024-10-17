const Utilisateur = require("../models/Utilisateur");


const createUtilisateur = async (req, res) => {
    try {
      const { NOM, PRENOM, EMAIL } = req.body;
  // return console.log(req.body)
      const data = { ...req.body};
  
      const utilisateur = await Utilisateur.create({
        NOM,
        PRENOM,
        EMAIL,
        MOT_DE_PASSE:"12345678",
      });
  
      res.status(201).json(utilisateur);
  
    } catch (error) {
      console.log(error);
    }
  };

  const findAll = async (req, res) => {
    try {
      const result = await Utilisateur.findAndCountAll();
      res.status(200).json({
        data : result.rows,
        totalDatas : result.count
      });
    } catch (error) {
      console.log(error)
    }
  };

  const updateUtilisateur = async (req, res) => {
    const { ID_UTILISATEUR } = req.params; 
    const { NOM, PRENOM, EMAIL } = req.body;

    try {
        const updated = await Utilisateur.update(
            { NOM, PRENOM, EMAIL },
            { where: { ID_UTILISATEUR: ID_UTILISATEUR } }
        );

        if (updated) {
            const updatedUser = await Utilisateur.findByPk(ID_UTILISATEUR);
            return res.status(200).json(updatedUser);
        }
        throw new Error('Utilisateur non trouvé');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

  module.exports = {
    createUtilisateur,
    findAll,
    updateUtilisateur
  }