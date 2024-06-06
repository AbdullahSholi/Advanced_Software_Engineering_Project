// routes.js

const express = require('express');

const router = express.Router();

const gardenController = require('./controllers/Garden/garden');

const userController = require('./controllers/User/user');

const guideController = require('./controllers/Guide/guide');

const eventController = require('./controllers/Event/event');

const plotController = require('./controllers/Plot/plot');

const plantController = require('./controllers/Plant/plant');

const partnershipController = require('./controllers/Partnership/partnership');

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

///////////////
// VolunteerEvent

router.post('/GreenThumb/api/v1/new-event', eventController.addEvent);
router.get("/GreenThumb/api/v1/events-list", eventController.getEventsList);
router.get("/GreenThumb/api/v1/event/:id", eventController.getEventById);
router.get("/GreenThumb/api/v1/events-list-by-garden/:id", eventController.getEventsListByGardenId);
router.patch("/GreenThumb/api/v1/event/:id", eventController.updateEvent)
router.delete("/GreenThumb/api/v1/event/:id", eventController.deleteEvent)

// Plots

router.post('/GreenThumb/api/v1/new-plot', plotController.addPlot);
router.get("/GreenThumb/api/v1/plots-list", plotController.getPlotsList);
router.get("/GreenThumb/api/v1/plot/:id", plotController.getPlotById);
router.get("/GreenThumb/api/v1/plots-list-by-garden/:id", plotController.getPlotsListByGardenId);
router.patch("/GreenThumb/api/v1/plot/:id", plotController.updatePlot)
router.delete("/GreenThumb/api/v1/plot/:id", plotController.deletePlot)

// Plants

router.post('/GreenThumb/api/v1/new-plant', plantController.addPlant);
router.get("/GreenThumb/api/v1/plants-list", plantController.getPlantsList);
router.get("/GreenThumb/api/v1/plant/:id", plantController.getPlantById);
router.get("/GreenThumb/api/v1/plants-list-by-name/:name", plantController.getPlantsListByName);
router.patch("/GreenThumb/api/v1/plant/:id", plantController.updatePlant)
router.delete("/GreenThumb/api/v1/plant/:id", plantController.deletePlant)

// Partnership

router.post('/GreenThumb/api/v1/new-partnership', partnershipController.addPartnership);
router.get("/GreenThumb/api/v1/partnerships-list", partnershipController.getPartnershipsList);
router.get("/GreenThumb/api/v1/partnership/:id", partnershipController.getPartnershipById);
router.get("/GreenThumb/api/v1/partnerships-list-by-name/:name", partnershipController.getPartnershipsListByName);
router.patch("/GreenThumb/api/v1/partnership/:id", partnershipController.updatePartnership)
router.delete("/GreenThumb/api/v1/partnership/:id", partnershipController.deletePartnership)


module.exports =  router;
    