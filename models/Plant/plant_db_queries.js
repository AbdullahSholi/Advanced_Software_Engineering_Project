const db = require('../../db-connection');

const Plant = {};

Plant.addPlant = (newPlant, result) => {

    db.query('INSERT INTO plant SET ?', newPlant, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, { ...newPlant });
    });
};

Plant.getPlantsList = (result) => {

    db.query('SELECT * FROM plant', (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Plant.getPlantsListById = (PlantID, result) => {

    db.query(`SELECT * FROM plant WHERE PlantID = ${PlantID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};




Plant.updatePlant = (PlantID, Data, result) => {

    const PlantData = db.query(`SELECT * FROM plant Where PlantID = ${PlantID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        console.log(res);
        let updateQuery = 'UPDATE plant SET ';
        Object.keys(Data).forEach((key, index) => { // Object.keys(Data) is used for iterate key-values 
            if (Data[key] !== '') {
                updateQuery += `${key} = '${Data[key]}'`;
                if (index < Object.keys(Data).length - 1) {
                    updateQuery += ', ';
                }
            }
        });
        updateQuery += ` WHERE PlantID = ${PlantID}`;
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

Plant.getPlantsListByName = (Name, result) => {
    db.query(`SELECT * FROM plant WHERE Name = "${Name}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


Plant.deletePlant = (PlantID, result) => {
    db.query(`DELETE FROM plant WHERE PlantID = "${PlantID}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
}
module.exports = Plant;  