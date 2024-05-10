const Guide = require('../../models/Guide/guide_db_queries');

const addGuide = (req, res) => {
    const newGuide = req.body;
    console.log(req.body);
    Guide.addGuide(newGuide, (err, data) => {
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
    addGuide
};
