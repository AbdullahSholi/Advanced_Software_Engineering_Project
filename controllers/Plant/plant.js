const Plant = require('../../models/Plant/plant_db_queries');

const addPlant= (req, res) => {
    const newPlant = req.body;
    console.log(req.body);
    Plant.addPlant(newPlant, (err, data) => {
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


  const getPlantsList = (req, res) => {
    console.log(req.body);
    Plant.getPlantsList( (err, data) => {
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


  const getPlantById = (req, res) => {
    console.log(req.params.id);
    Plant.getPlantsListById( req.params.id ,(err, data) => {
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

    const getPlantsListByName = (req, res) => {
      console.log(req.params.name);
      Plant.getPlantsListByName( req.params.name ,(err, data) => {
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

  
        const updatePlant = (req, res) => {
          console.log(req.params.id);
          Plant.updatePlant( req.params.id, req.body ,(err, data) => {
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
          
          
        const deletePlant = (req, res) => {
          console.log(req.params.id);
          Plant.deletePlant( req.params.id,(err, data) => {
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
    addPlant,
    getPlantsList,
    getPlantById,
    getPlantsListByName,
    updatePlant,
    deletePlant,
};