const Plot = require('../../models/Plot/plot_db_queries');

const addPlot= (req, res) => {
    const newPlot = req.body;
    console.log(req.body);
    Plot.addPlot(newPlot, (err, data) => {
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


  const getPlotsList = (req, res) => {
    console.log(req.body);
    Plot.getPlotsList( (err, data) => {
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

  const getPlotById = (req, res) => {
    console.log(req.params.id);
    Plot.getPlotsListById( req.params.id ,(err, data) => {
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

    const getPlotsListByGardenId = (req, res) => {
      console.log(req.params.id);
      Plot.getPlotsListByGardenId( req.params.id ,(err, data) => {
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
  
        const updatePlot = (req, res) => {
          console.log(req.params.id);
          Plot.updatePlot( req.params.id, req.body ,(err, data) => {
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
          
          
        const deletePlot = (req, res) => {
          console.log(req.params.id);
          Plot.deletePlot( req.params.id,(err, data) => {
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
    addPlot,
    getPlotsList,
    getPlotById,
    getPlotsListByGardenId,
    updatePlot,
    deletePlot,
};