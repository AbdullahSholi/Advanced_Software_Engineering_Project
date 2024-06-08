const Activity = require('../../models/Activity/activity_db_queries');

const addActivity= (req, res) => {
    const newActivity = req.body;
    console.log(req.body);
    Activity.addActivity(newActivity, (err, data) => {
        console.log(1);
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the task.'
        });
      } else {
        console.log(1);
        res.send(data);
      }
    });
  };

  const addActivityPlant= (req, res) => {
    const newActivity = req.body;
    console.log(req.body);
    Activity.addActivityPlant(newActivity, (err, data) => {
        console.log(1);
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the task.'
        });
      } else {
        console.log(1);
        res.send(data);
      }
    });
  };


  const getActivitiesList = (req, res) => {
    console.log(req.body);
    Activity.getActivitiesList( (err, data) => {
        console.log(1);
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the task.'
        });
      } else {
        console.log(1);
        res.send(data);
      }
    });
  };

  const getActivitiesPlantList = (req, res) => {
    console.log(req.body);
    Activity.getActivitiesPlantList( (err, data) => {
        console.log(1);
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the task.'
        });
      } else {
        console.log(1);
        res.send(data);
      }
    });
  };

  const getActivityById = (req, res) => {
    console.log(req.params.id);
    Activity.getActivitiesListById( req.params.id ,(err, data) => {
        console.log(1);
        if (err) {
        res.status(500).send({
            message:
            err.message || 'Some error occurred while creating the task.'
        });
        } else {
        console.log(1);
        res.send(data);
        }
    });
    };

    const getActivitiesListByUserId = (req, res) => {
      console.log(req.params.id);
      Activity.getActivitiesListByUserId( req.params.id ,(err, data) => {
          console.log(1);
          if (err) {
          res.status(500).send({
              message:
              err.message || 'Some error occurred while creating the task.'
          });
          } else {
          console.log(1);
          res.send(data);
          }
      });
      };

      const getActivitiesListByPlotId = (req, res) => {
        console.log(req.params.id);
        Activity.getActivitiesListByPlotId( req.params.id ,(err, data) => {
            console.log(1);
            if (err) {
            res.status(500).send({
                message:
                err.message || 'Some error occurred while creating the task.'
            });
            } else {
            console.log(1);
            res.send(data);
            }
        });
        };


  
        const updateActivity = (req, res) => {
          console.log(req.params.id);
          Activity.updateActivity( req.params.id, req.body ,(err, data) => {
              console.log(1);
              if (err) {
              res.status(500).send({
                  message:
                  err.message || 'Some error occurred while creating the task.'
              });
              } else {
              console.log(1);
              res.send(data);
              }
          });
          };
          
          
        const deleteActivity = (req, res) => {
          console.log(req.params.id);
          Activity.deleteActivity( req.params.id,(err, data) => {
              console.log(1);
              if (err) {
              res.status(500).send({
                  message:
                  err.message || 'Some error occurred while creating the task.'
              });
              } else {
              console.log(1);
              res.send(data);
              }
          });
          };

module.exports = {
    addActivity,
    addActivityPlant,
    getActivitiesList,
    getActivitiesPlantList,
    getActivityById,
    getActivitiesListByUserId,
    getActivitiesListByPlotId,
    updateActivity,
    deleteActivity,
};