const Resource = require('../../models/Resource/resource_db_queries');

const addResource= (req, res) => {
    const newResource = req.body;
    console.log(req.body);
    Resource.addResource(newResource, (err, data) => {
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

  const addResourcePartnership= (req, res) => {
    const newResource = req.body;
    console.log(req.body);
    Resource.addResourcePartnership(newResource, (err, data) => {
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

  const getResourcesList = (req, res) => {
    console.log(req.body);
    Resource.getResourcesList( (err, data) => {
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

  const getResourcePartnershipList = (req, res) => {
    console.log(req.body);
    Resource.getResourcePartnershipList( (err, data) => {
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

  const getResourceById = (req, res) => {
    console.log(req.params.id);
    Resource.getResourcesListById( req.params.id ,(err, data) => {
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

  



        const getResourcesListByType = (req, res) => {
            console.log(req.params.type);
            Resource.getResourcesListByType( req.params.type ,(err, data) => {
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
  
        const updateResource = (req, res) => {
          console.log(req.params.id);
          Resource.updateResource( req.params.id, req.body ,(err, data) => {
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
          
          
        const deleteResource = (req, res) => {
          console.log(req.params.id);
          Resource.deleteResource( req.params.id,(err, data) => {
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
    addResource,
    addResourcePartnership,
    getResourcesList,
    getResourcePartnershipList,
    getResourceById,
    getResourcesListByType,
    updateResource,
    deleteResource,
};