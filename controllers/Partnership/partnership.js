const Partnership = require('../../models/Partnership/partnership_db_queries');

const addPartnership= (req, res) => {
    const newPartnership = req.body;
    console.log(req.body);
    Partnership.addPartnership(newPartnership, (err, data) => {
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


  const getPartnershipsList = (req, res) => {
    console.log(req.body);
    Partnership.getPartnershipsList( (err, data) => {
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

  const getPartnershipById = (req, res) => {
    console.log(req.params.id);
    Partnership.getPartnershipsListById( req.params.id ,(err, data) => {
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

    const getPartnershipsListByName = (req, res) => {
      console.log(req.params.name);
      Partnership.getPartnershipsListByName( req.params.name ,(err, data) => {
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
        const updatePartnership = (req, res) => {
          console.log(req.params.id);
          Partnership.updatePartnership( req.params.id, req.body ,(err, data) => {
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
          
          
        const deletePartnership = (req, res) => {
          console.log(req.params.id);
          Partnership.deletePartnership( req.params.id,(err, data) => {
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
    addPartnership,
    getPartnershipsList,
    getPartnershipById,
    getPartnershipsListByName,
    updatePartnership,
    deletePartnership,
};