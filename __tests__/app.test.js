// const app = require("../app.js");

// describe('Palindrom', () => {
//     // it('Should retreive a sentence',()=>{
//     //     expect(app.setence.length).toBeGreaterThan(0);
//     // })

//     // it("Should have a length of 11 letters", ()=>{
//     //     expect(app.setence.length).toEqual(11)
//     // })

//     it("Should be a palindrom", ()=>{
//         expect(app.isPalindrom('kayak')).toEqual(true);
//     })

//     it("Should not be a palindrom", ()=>{
//         expect(app.isPalindrom('azerty')).toEqual(false);
//     })
// })

const request = require("supertest");
const app = require("../app"); // Assure-toi que le chemin d'accès est correct
const Utilisateur = require("../models/Utilisateur");
// const { Utilisateur } = require("../models"); // Ajuste le chemin d'accès selon ton projet

// Mock des méthodes de Sequelize
jest.mock("../models/Utilisateur");

describe('Utilisateur API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a new user", async () => {
    // Données de test
    const newUser = {
      NOM: "Jospin",
      PRENOM: "BA",
      EMAIL: "jospin.ba@example.com",
      MOT_DE_PASSE: "12345678",
    };

    // Mock de la méthode create pour simuler l'insertion
    Utilisateur .create.mockResolvedValue(newUser);

    const response = await request(app)
      .post("/utilisateur/create_user") // Chemin de l'API
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newUser);
    expect(Utilisateur.create).toHaveBeenCalledWith({
      NOM: newUser.NOM,
      PRENOM: newUser.PRENOM,
      EMAIL: newUser.EMAIL,
      MOT_DE_PASSE: "12345678",
    });
  });

  it("Should return an error if creation fails", async () => {
    // Simule une erreur
    Utilisateur.create.mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .post("/utilisateur/create_user")
      .send({});

    expect(response.status).toBe(500);
  });

  it("Should fetch the users", async()=>{
    const userToFetch = {
      count: 2,
      rows: [
        {
          ID_UTILISATEUR: "1",
          NOM: "Jospin",
          PRENOM: "BA",
          EMAIL: "jospin.ba@example.com",
          MOT_DE_PASSE: "12345678",
        },
        {
          ID_UTILISATEUR: "2",
          NOM: "Ketsia",
          PRENOM: "Blessing",
          EMAIL: "Ketsia@example.com",
          MOT_DE_PASSE: "12345678",
        }
      ]
    };
    // Mock de la méthode findAndCountAll pour simuler la réponse
    Utilisateur.findAndCountAll.mockResolvedValue(userToFetch);

    const response = await request(app)
      .get("/utilisateur/"); 

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(userToFetch.rows);
      expect(response.body.totalDatas).toBe(userToFetch.count);
  })

  it("Should update an utilisateur", async () => {
    const userId = "1"; 
    const updatedUserData = {
        NOM: "Jospin",
        PRENOM: "BA",
        EMAIL: "jospin.ba@example.com",
    };

    // Mock de la méthode update pour simuler la mise à jour
    Utilisateur.update.mockResolvedValue([1]); // [nombre de lignes affectées]

    // Mock de la méthode findByPk pour récupérer l'utilisateur mis à jour
    // Utilisateur.findByPk.mockResolvedValue({
    //     ID_UTILISATEUR: userId,
    //     ...updatedUserData,
    // });

    const response = await request(app)
        .put(`/utilisateur/update_user/${userId}`) 
        .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        ID_UTILISATEUR: userId,
        ...updatedUserData,
    });
    expect(Utilisateur.update).toHaveBeenCalledWith(
        updatedUserData,
        { where: { ID_UTILISATEUR: userId } }
    );
});

it("Should return an error if user not found", async () => {
    const userId = "1";
    const updatedUserData = {
        NOM: "Jospin",
        PRENOM: "BA",
        EMAIL: "jospin.ba@example.com",
        MOT_DE_PASSE: "newpassword",
    };

    // Simule que l'utilisateur n'existe pas
    Utilisateur.update.mockResolvedValue([0]); // 0 lignes affectées

    const response = await request(app)
        .put(`/utilisateur/update_user/${userId}`)
        .send(updatedUserData);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Utilisateur non trouvé');
});

});