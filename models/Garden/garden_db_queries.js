const db = require('../../db-connection');

const Garden = {};

Garden.addGarden = (newGarden, result) => {

    db.query('INSERT INTO garden SET ?', newGarden, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, { ...newGarden });
    });
};

Garden.getGardenList = (result) => {

    db.query('SELECT * FROM garden', (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Garden.getGardenListById = (GardenID, result) => {

    db.query(`SELECT * FROM garden WHERE GardenID = ${GardenID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


Garden.getGardenListByName = (Name, result) => {
    db.query(`SELECT * FROM garden WHERE Name = "${Name}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Garden.getGardenListByLocation = (Location, result) => {

    db.query(`SELECT * FROM garden WHERE Location = "${Location}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Garden.updateGardenList = (GardenID, Data, result) => {

    const gardenData = db.query(`SELECT * FROM garden Where GardenID = ${GardenID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        console.log(res);
        let updateQuery = 'UPDATE garden SET ';
        Object.keys(Data).forEach((key, index) => { // Object.keys(Data) is used for iterate key-values 
            if (Data[key] !== '') {
                updateQuery += `${key} = '${Data[key]}'`;
                if (index < Object.keys(Data).length - 1) {
                    updateQuery += ', ';
                }
            }
        });
        updateQuery += ` WHERE GardenID = ${GardenID}`;
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

Garden.deleteSpecificGardenFromList = (GardenID, result) => {
    db.query(`DELETE FROM garden WHERE GardenID = "${GardenID}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

module.exports = Garden;  