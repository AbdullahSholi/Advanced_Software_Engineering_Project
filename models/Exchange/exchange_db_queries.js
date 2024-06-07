const db = require('../../db-connection');

const Exchange = {};

Exchange.addExchange = (newExchange, result) => {

    db.query('INSERT INTO exchange SET ?', newExchange, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, { ...newExchange });
    });
};

Exchange.getExchangesList = (result) => {

    db.query('SELECT * FROM exchange', (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Exchange.getExchangesListById = (ExchangeID, result) => {

    db.query(`SELECT * FROM exchange WHERE ExchangeID = ${ExchangeID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};



Exchange.getExchangesListByOfferUserId = (OfferUserID, result) => {
    db.query(`SELECT * FROM exchange WHERE OfferUserID = "${OfferUserID}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Exchange.getExchangesListByRequestorUserId = (RequestorUserID, result) => {
    db.query(`SELECT * FROM exchange WHERE RequestorUserID = "${RequestorUserID}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Exchange.getExchangesListByStatus = (Status, result) => {
    db.query(`SELECT * FROM exchange WHERE Status = "${Status}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

///////////////


Exchange.updateExchange = (ExchangeID, Data, result) => {

    const ExchangeData = db.query(`SELECT * FROM exchange Where ExchangeID = ${ExchangeID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        console.log(res);
        let updateQuery = 'UPDATE exchange SET ';
        Object.keys(Data).forEach((key, index) => { // Object.keys(Data) is used for iterate key-values 
            if (Data[key] !== '') {
                updateQuery += `${key} = '${Data[key]}'`;
                if (index < Object.keys(Data).length - 1) {
                    updateQuery += ', ';
                }
            }
        });
        updateQuery += ` WHERE ExchangeID = ${ExchangeID}`;
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


Exchange.deleteExchange = (ExchangeID, result) => {
    db.query(`DELETE FROM exchange WHERE ExchangeID = "${ExchangeID}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
}
module.exports = Exchange;  