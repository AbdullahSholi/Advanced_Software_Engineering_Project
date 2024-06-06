const db = require('../../db-connection');

const Resource = {};

Resource.addResource = (newResource, result) => {

    db.query('INSERT INTO resource SET ?', newResource, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, { ...newResource });
    });
};

Resource.getResourcesList = (result) => {

    db.query('SELECT * FROM resource', (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Resource.getResourcesListById = (ResourceID, result) => {

    db.query(`SELECT * FROM resource WHERE ResourceID = ${ResourceID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};






Resource.getResourcesListByType = (Type, result) => {
    db.query(`SELECT * FROM resource WHERE Type = "${Type}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

///////////////


Resource.updateResource = (ResourceID, Data, result) => {

    const ResourceData = db.query(`SELECT * FROM resource Where ResourceID = ${ResourceID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        console.log(res);
        let updateQuery = 'UPDATE resource SET ';
        Object.keys(Data).forEach((key, index) => { // Object.keys(Data) is used for iterate key-values 
            if (Data[key] !== '') {
                updateQuery += `${key} = '${Data[key]}'`;
                if (index < Object.keys(Data).length - 1) {
                    updateQuery += ', ';
                }
            }
        });
        updateQuery += ` WHERE ResourceID = ${ResourceID}`;
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


Resource.deleteResource = (ResourceID, result) => {
    db.query(`DELETE FROM resource WHERE ResourceID = "${ResourceID}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
}
module.exports = Resource;  