// const setence = "Hello world";
// function isPalindrom(world) {
//     const reversedTxt = world.split('').reverse().join('');
//     const result = world === reversedTxt;
//     console.log("Result = ",result);
    
//     return result;
// }
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const utilisateur_routes = require('./routes/utilisateur.routes');

dotenv.config();
const app = express();

var corsOptions = {
    origin: function (origin, callback) {
        if (!origin || (origin !== -1)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/utilisateur', utilisateur_routes);

const port = process.env.PORT || 3000;

// Démarre le serveur uniquement si ce fichier est exécuté directement
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Serveur écoutant sur le port ${port}`);
    });
}

module.exports = app; // Exporte l'application pour les tests

// module.exports = {
//     // setence,
//     isPalindrom
// }