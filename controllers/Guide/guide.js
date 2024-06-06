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

  const getGuide = (req, res) => {
    Guide.getGuide( (err, data) => {
        console.log(1);
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while get the task.'
        });
      } else {
        console.log(1);
        res.send(data);
      }
    });
  };

  const getGuideById = (req, res) => {
    console.log(req.params.id);
    Guide.getGuideById( req.params.id ,(err, data) => {
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
    
    const getGuideListByTitle = (req, res) => {
        console.log(req.params.title);
        Guide.getGuideListByTitle( req.params.title ,(err, data) => {
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


  const updateGuideList = (req, res) => {
  console.log(req.params.id);
  Guide.updateGuideList( req.params.id, req.body ,(err, data) => {
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
  
  
const deleteSpecificGuideFromList = (req, res) => {
  console.log(req.params.id);
  Guide.deleteSpecificGuideFromList( req.params.id,(err, data) => {
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
    addGuide ,
    getGuide ,
    getGuideById,
    getGuideListByTitle,
    updateGuideList,
    deleteSpecificGuideFromList
};
