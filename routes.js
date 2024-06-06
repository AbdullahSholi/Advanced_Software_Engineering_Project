// routes.js

const express = require('express');

const router = express.Router();

const gardenController = require('./controllers/Garden/garden');

const userController = require('./controllers/User/user');

const guideController = require('./controllers/Guide/guide');

// Create a new task
router.post('/GreenThumb/api/v1/new-garden', gardenController.addGarden);
router.get("/GreenThumb/api/v1/gardens-list", gardenController.getGardenList);
router.get("/GreenThumb/api/v1/garden-list/:id", gardenController.getGardenListById);
router.get("/GreenThumb/api/v1/garden-list-by-name/:name", gardenController.getGardenListByName);
router.get("/GreenThumb/api/v1/garden-list-by-location/:location", gardenController.getGardenListByLocation);
router.patch("/GreenThumb/api/v1/garden/:id", gardenController.updateGardenList)
router.delete("/GreenThumb/api/v1/specific-garden-from-list/:id", gardenController.deleteSpecificGardenFromList)


// Crop Planning and Tracking:
// creat a new user 


router.post("/GreenThumb/api/v1/new-user", userController.creatNewUser);
router.get("/GreenThumb/api/v1/users-list", userController.getUserList);
router.get("/GreenThumb/api/v1/user/:id", userController.getUserListById);
router.get("/GreenThumb/api/v1/users-list-by-name/:name", userController.getUserListByName);
router.get("/GreenThumb/api/v1/users-list-by-email/:email", userController.getUserListByEmail);
router.patch("/GreenThumb/api/v1/user-data/:id", userController.updateUser);
router.delete("/GreenThumb/api/v1/user/:id", userController.deleteUser);


// Knowledge Sharing:
// create a new guide 
router.post('/GreenThumb/api/v1/new-guide', guideController.addGuide);
router.get('/GreenThumb/api/v1/guide-list', guideController.getGuide);
router.get("/GreenThumb/api/v1/guide/:id", guideController.getGuideById);
router.get("/GreenThumb/api/v1/guide-list-by-title/:title", guideController.getGuideListByTitle);
router.patch("/GreenThumb/api/v1/guide/:id", guideController.updateGuideList);
router.delete("/GreenThumb/api/v1/specific-guide-from-list/:id", guideController.deleteSpecificGuideFromList);


module.exports =  router;
    