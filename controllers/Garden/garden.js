const Garden = require('../../models/Garden/garden_db_queries');

const addGarden = (req, res) => {
    const newGarden = req.body;
    console.log(req.body);
    Garden.addGarden(newGarden, (err, data) => {
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

const getGardenList = (req, res) => {
    console.log(req.body);
    Garden.getGardenList( (err, data) => {
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


const getGardenListById = (req, res) => {
console.log(req.params.id);
Garden.getGardenListById( req.params.id ,(err, data) => {
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

const getGardenListByName = (req, res) => {
    console.log(req.params.name);
    Garden.getGardenListByName( req.params.name ,(err, data) => {
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

    const getGardenListByLocation = (req, res) => {
        console.log(req.params.location);
        Garden.getGardenListByLocation( req.params.location ,(err, data) => {
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
    addGarden,
    getGardenList,
    getGardenListById,
    getGardenListByName,
    getGardenListByLocation,

};