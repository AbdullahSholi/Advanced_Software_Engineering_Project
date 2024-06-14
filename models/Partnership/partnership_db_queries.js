
const db = require('../../db-connection');

const Partnership = {};

Partnership.addPartnership = (newPartnership, result) => {

    db.query('INSERT INTO partnership SET ?', newPartnership, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, { ...newPartnership });
    });
};

Partnership.getPartnershipsList = (result) => {

    db.query('SELECT * FROM partnership', (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Partnership.getPartnershipsListById = (PartnershipID, result) => {

    db.query(`SELECT * FROM partnership WHERE PartnershipID = ${PartnershipID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Partnership.getPartnershipsListByName = (Name, result) => {
    db.query(`SELECT * FROM partnership WHERE Name = "${Name}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};



Partnership.updatePartnership = (PartnershipID, Data, result) => {

    const PartnershipData = db.query(`SELECT * FROM partnership Where PartnershipID = ${PartnershipID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        console.log(res);
        let updateQuery = 'UPDATE partnership SET ';
        Object.keys(Data).forEach((key, index) => { // Object.keys(Data) is used for iterate key-values 
            if (Data[key] !== '') {
                updateQuery += `${key} = '${Data[key]}'`;
                if (index < Object.keys(Data).length - 1) {
                    updateQuery += ', ';
                }
            }
        });
        updateQuery += ` WHERE PartnershipID = ${PartnershipID}`;
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


Partnership.deletePartnership = (PartnershipID, result) => {
    db.query(`DELETE FROM partnership WHERE PartnershipID = "${PartnershipID}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
}
module.exports = Partnership;  