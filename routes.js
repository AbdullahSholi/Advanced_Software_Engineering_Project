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

const resourceController = require('./controllers/Resource/resource');
const exchangeController = require('./controllers/Exchange/exchange');
const activityController = require('./controllers/Activity/activity');
//------------
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');
const { getPublicData, getUserData, getAdminData } = require('./controllers/User/user');
//------------

// Create a new task
router.post('/GreenThumb/api/v1/new-garden', authMiddleware, roleMiddleware(['admin']), gardenController.addGarden);
router.post('/GreenThumb/api/v1/new-user-garden', authMiddleware, roleMiddleware(['admin']), gardenController.addUserGarden);
router.get('/GreenThumb/api/v1/user-garden-list/:id', authMiddleware, roleMiddleware(['user' ,'admin']), gardenController.getUserGardenList);
router.get('/GreenThumb/api/v1/user-gardens-list', authMiddleware, roleMiddleware(['admin']), gardenController.getUserGardensList);
router.get("/GreenThumb/api/v1/gardens-list", authMiddleware, roleMiddleware(['user' ,'admin']), gardenController.getGardenList);
router.get("/GreenThumb/api/v1/garden-list/:id", authMiddleware, roleMiddleware(['user','admin']), gardenController.getGardenListById);
router.get("/GreenThumb/api/v1/garden-list-by-name/:name", authMiddleware, roleMiddleware(['user','admin']), gardenController.getGardenListByName);
router.get("/GreenThumb/api/v1/garden-list-by-location/:location", authMiddleware, roleMiddleware(['user','admin']), gardenController.getGardenListByLocation);
router.patch("/GreenThumb/api/v1/garden/:id", authMiddleware, roleMiddleware(['admin']), gardenController.updateGardenList)
router.delete("/GreenThumb/api/v1/specific-garden-from-list/:id", authMiddleware, roleMiddleware(['admin']), gardenController.deleteSpecificGardenFromList)


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
router.post('/GreenThumb/api/v1/new-guide', authMiddleware, roleMiddleware(['admin']), guideController.addGuide);
router.get('/GreenThumb/api/v1/guide-list', authMiddleware, roleMiddleware(['user','admin']), guideController.getGuide);
router.get("/GreenThumb/api/v1/guide/:id", authMiddleware, roleMiddleware(['user','admin']), guideController.getGuideById);
router.get("/GreenThumb/api/v1/guide-list-by-title/:title", authMiddleware, roleMiddleware(['user','admin']), guideController.getGuideListByTitle);
router.patch("/GreenThumb/api/v1/guide/:id", authMiddleware, roleMiddleware(['admin']), guideController.updateGuideList);
router.delete("/GreenThumb/api/v1/specific-guide-from-list/:id", authMiddleware, roleMiddleware(['admin']), guideController.deleteSpecificGuideFromList);

// Comment 
router.post('/GreenThumb/api/v1/add-comment', authMiddleware, roleMiddleware(['user','admin']), guideController.addComment);
router.get('/GreenThumb/api/v1/comments-list', authMiddleware, roleMiddleware(['user','admin']), guideController.commentsList);
router.patch("/GreenThumb/api/v1/comments/:id", authMiddleware, roleMiddleware(['user','admin']), guideController.updateComment);


// VolunteerEvent

router.post('/GreenThumb/api/v1/new-event', authMiddleware, roleMiddleware(['admin']), eventController.addEvent);
router.get("/GreenThumb/api/v1/events-list", authMiddleware, roleMiddleware(['user','admin']), eventController.getEventsList);
router.get("/GreenThumb/api/v1/event/:id", authMiddleware, roleMiddleware(['user','admin']), eventController.getEventById);
router.get("/GreenThumb/api/v1/events-list-by-garden/:id", authMiddleware, roleMiddleware(['user','admin']), eventController.getEventsListByGardenId);
router.patch("/GreenThumb/api/v1/event/:id", authMiddleware, roleMiddleware(['admin']), eventController.updateEvent)
router.delete("/GreenThumb/api/v1/event/:id", authMiddleware, roleMiddleware(['admin']), eventController.deleteEvent)

// Plots

router.post('/GreenThumb/api/v1/new-plot', authMiddleware, roleMiddleware(['admin']), plotController.addPlot);
router.get("/GreenThumb/api/v1/plots-list", authMiddleware, roleMiddleware(['user','admin']), plotController.getPlotsList);
router.get("/GreenThumb/api/v1/plot/:id", authMiddleware, roleMiddleware(['user','admin']), plotController.getPlotById);
router.get("/GreenThumb/api/v1/plots-list-by-garden/:id", authMiddleware, roleMiddleware(['user','admin']), plotController.getPlotsListByGardenId);
router.patch("/GreenThumb/api/v1/plot/:id", authMiddleware, roleMiddleware(['admin']), plotController.updatePlot)
router.delete("/GreenThumb/api/v1/plot/:id", authMiddleware, roleMiddleware(['admin']), plotController.deletePlot)

// Plants

router.post('/GreenThumb/api/v1/new-plant', authMiddleware, roleMiddleware(['admin']), plantController.addPlant);
router.get("/GreenThumb/api/v1/plants-list", authMiddleware, roleMiddleware(['user','admin']), plantController.getPlantsList);
router.get("/GreenThumb/api/v1/plant/:id", authMiddleware, roleMiddleware(['user','admin']), plantController.getPlantById);
router.get("/GreenThumb/api/v1/plants-list-by-name/:name", authMiddleware, roleMiddleware(['user','admin']), plantController.getPlantsListByName);
router.patch("/GreenThumb/api/v1/plant/:id", authMiddleware, roleMiddleware(['admin']), plantController.updatePlant)
router.delete("/GreenThumb/api/v1/plant/:id", authMiddleware, roleMiddleware(['admin']), plantController.deletePlant)

// Partnership

router.post('/GreenThumb/api/v1/new-partnership', authMiddleware, roleMiddleware(['user','admin']), partnershipController.addPartnership);
router.get("/GreenThumb/api/v1/partnerships-list", authMiddleware, roleMiddleware(['user','admin']), partnershipController.getPartnershipsList);
router.get("/GreenThumb/api/v1/partnership/:id", authMiddleware, roleMiddleware(['user','admin']), partnershipController.getPartnershipById);
router.get("/GreenThumb/api/v1/partnerships-list-by-name/:name", authMiddleware, roleMiddleware(['user','admin']), partnershipController.getPartnershipsListByName);
router.patch("/GreenThumb/api/v1/partnership/:id", authMiddleware, roleMiddleware(['user','admin']), partnershipController.updatePartnership)
router.delete("/GreenThumb/api/v1/partnership/:id", authMiddleware, roleMiddleware(['user','admin']), partnershipController.deletePartnership)


// Resource 
router.post('/GreenThumb/api/v1/new-resource', authMiddleware, roleMiddleware(['user','admin']), resourceController.addResource);
router.post('/GreenThumb/api/v1/new-resource-partnership', authMiddleware, roleMiddleware(['user','admin']), resourceController.addResourcePartnership);
router.get("/GreenThumb/api/v1/resources-list", authMiddleware, roleMiddleware(['user','admin']), resourceController.getResourcesList);
router.get("/GreenThumb/api/v1/resource-partnership-list", authMiddleware, roleMiddleware(['user','admin']), resourceController.getResourcePartnershipList);
router.get("/GreenThumb/api/v1/resource/:id", authMiddleware, roleMiddleware(['user','admin']), resourceController.getResourceById);
router.get("/GreenThumb/api/v1/resources-list-by-type/:type", authMiddleware, roleMiddleware(['user','admin']), resourceController.getResourcesListByType);
router.patch("/GreenThumb/api/v1/resource/:id", authMiddleware, roleMiddleware(['user','admin']), resourceController.updateResource)
router.delete("/GreenThumb/api/v1/resource/:id", authMiddleware, roleMiddleware(['user','admin']), resourceController.deleteResource)


// Exchange
router.post('/GreenThumb/api/v1/new-exchange', authMiddleware, roleMiddleware(['user','admin']), exchangeController.addExchange);
router.post('/GreenThumb/api/v1/new-exchange-resource', authMiddleware, roleMiddleware(['user','admin']), exchangeController.addExchangeResource);
router.get("/GreenThumb/api/v1/exchanges-list", authMiddleware, roleMiddleware(['user','admin']), exchangeController.getExchangesList);
router.get("/GreenThumb/api/v1/exchange-resource-list", authMiddleware, roleMiddleware(['user','admin']), exchangeController.getExchangeResourceList);
router.get("/GreenThumb/api/v1/exchange/:id", authMiddleware, roleMiddleware(['user','admin']), exchangeController.getExchangeById);
router.get("/GreenThumb/api/v1/exchanges-list-by-offer-user/:id", authMiddleware, roleMiddleware(['user','admin']), exchangeController.getExchangesListByOfferUserId);
router.get("/GreenThumb/api/v1/exchanges-list-by-requestor-user/:id", authMiddleware, roleMiddleware(['user','admin']), exchangeController.getExchangesListByRequestorUserId);
router.get("/GreenThumb/api/v1/exchanges-list-by-status/:status", authMiddleware, roleMiddleware(['user','admin']), exchangeController.getExchangesListByStatus);
router.patch("/GreenThumb/api/v1/exchange/:id", authMiddleware, roleMiddleware(['user','admin']), exchangeController.updateExchange)
router.delete("/GreenThumb/api/v1/exchange/:id", authMiddleware, roleMiddleware(['user','admin']), exchangeController.deleteExchange)



// Planting Activity
router.post('/GreenThumb/api/v1/new-activity', authMiddleware, roleMiddleware(['admin']), activityController.addActivity);
router.post('/GreenThumb/api/v1/new-plantingactivity-plant', authMiddleware, roleMiddleware(['admin']), activityController.addActivityPlant);
router.get("/GreenThumb/api/v1/activities-list", authMiddleware, roleMiddleware(['admin']), activityController.getActivitiesList);
router.get("/GreenThumb/api/v1/plantingactivity-plant-list", authMiddleware, roleMiddleware(['admin']), activityController.getActivitiesPlantList);
router.get("/GreenThumb/api/v1/activity/:id", authMiddleware, roleMiddleware(['admin']), activityController.getActivityById);
router.get("/GreenThumb/api/v1/activities-list-by-user/:id", authMiddleware, roleMiddleware(['admin']), activityController.getActivitiesListByUserId);
router.get("/GreenThumb/api/v1/activities-list-by-plot/:id", authMiddleware, roleMiddleware(['admin']), activityController.getActivitiesListByPlotId);
router.patch("/GreenThumb/api/v1/activity/:id", authMiddleware, roleMiddleware(['admin']), activityController.updateActivity)
router.delete("/GreenThumb/api/v1/activity/:id", authMiddleware, roleMiddleware(['admin']), activityController.deleteActivity)

//---For access data base on the role -----


//------------
router.post('/GreenThumb/api/v1/register',userController.register);
router.post('/GreenThumb/api/v1/login',userController.login);

router.get('/GreenThumb/api/v1/public', getPublicData);


// user data
router.get('/GreenThumb/api/v1/user', authMiddleware, roleMiddleware(['user', 'admin']), userController.getUserData);




router.get('/GreenThumb/api/v1/admin', authMiddleware, roleMiddleware(['admin']), userController.getAdminData);

//------------

// Generate Report
router.get("/GreenThumb/api/v1/generate-report", (req, res)=>{
    ///////////////////////////////////////
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a new PDF document
const doc = new PDFDocument();

// Pipe the PDF to a file
doc.pipe(fs.createWriteStream('report.pdf'));

// Add content to the PDF
doc
  .fontSize(20)
  .text('Sample Report', { align: 'center' });

doc
  .fontSize(12)
  .text('This is a sample report For Crops');

doc.end();
res.send({status: "Success"});

///////////////////////////
} )

module.exports =  router;
    
