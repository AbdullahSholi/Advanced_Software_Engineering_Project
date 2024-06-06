const Event = require('../../models/Event/event_db_queries');

const addEvent= (req, res) => {
    const newEvent = req.body;
    console.log(req.body);
    Event.addEvent(newEvent, (err, data) => {
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


  const getEventsList = (req, res) => {
    console.log(req.body);
    Event.getEventsList( (err, data) => {
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

  const getEventById = (req, res) => {
    console.log(req.params.id);
    Event.getEventsListById( req.params.id ,(err, data) => {
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

    const getEventsListByGardenId = (req, res) => {
      console.log(req.params.id);
      Event.getEventsListByGardenId( req.params.id ,(err, data) => {
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
  
        const updateEvent = (req, res) => {
          console.log(req.params.id);
          Event.updateEvent( req.params.id, req.body ,(err, data) => {
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
          
          
        const deleteEvent = (req, res) => {
          console.log(req.params.id);
          Event.deleteEvent( req.params.id,(err, data) => {
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
    addEvent,
    getEventsList,
    getEventById,
    getEventsListByGardenId,
    updateEvent,
    deleteEvent,
};