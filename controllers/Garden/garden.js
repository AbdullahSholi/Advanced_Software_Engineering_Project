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

module.exports = {
    addGarden
};