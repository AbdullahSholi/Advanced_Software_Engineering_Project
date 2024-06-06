const db = require('../../db-connection');

const Event = {};

Event.addEvent = (newEvent, result) => {

    db.query('INSERT INTO volunteerevent SET ?', newEvent, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, { ...newEvent });
    });
};

Event.getEventsList = (result) => {

    db.query('SELECT * FROM volunteerevent', (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Event.getEventsListById = (EventID, result) => {

    db.query(`SELECT * FROM volunteerevent WHERE EventID = ${EventID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Event.getEventsListByGardenId = (GardenID, result) => {
    db.query(`SELECT * FROM volunteerevent WHERE GardenID = "${GardenID}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};



Event.updateEvent = (EventID, Data, result) => {

    const eventData = db.query(`SELECT * FROM volunteerevent Where EventID = ${EventID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        console.log(res);
        let updateQuery = 'UPDATE volunteerevent SET ';
        Object.keys(Data).forEach((key, index) => { // Object.keys(Data) is used for iterate key-values 
            if (Data[key] !== '') {
                updateQuery += `${key} = '${Data[key]}'`;
                if (index < Object.keys(Data).length - 1) {
                    updateQuery += ', ';
                }
            }
        });
        updateQuery += ` WHERE EventID = ${EventID}`;
        console.log(updateQuery);
        // Execute the update query
        db.query(updateQuery, (err, result) => {
            if (err) {
                console.error('Error updating record:', err);
                return;
            }
            console.log('Record updated successfully');
        });

        result(null, res);

    });

}


Event.deleteEvent = (EventID, result) => {
    db.query(`DELETE FROM volunteerevent WHERE EventID = "${EventID}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
}
module.exports = Event;  