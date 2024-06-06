const db = require('../../db-connection');

const Plot = {};

Plot.addPlot = (newPlot, result) => {

    db.query('INSERT INTO gardenplot SET ?', newPlot, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, { ...newPlot });
    });
};

Plot.getPlotsList = (result) => {

    db.query('SELECT * FROM gardenplot', (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Plot.getPlotsListById = (PlotID, result) => {

    db.query(`SELECT * FROM gardenplot WHERE PlotID = ${PlotID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Plot.getPlotsListByGardenId = (GardenID, result) => {
    db.query(`SELECT * FROM gardenplot WHERE GardenID = "${GardenID}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};



Plot.updatePlot = (PlotID, Data, result) => {

    const PlotData = db.query(`SELECT * FROM gardenplot Where PlotID = ${PlotID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        console.log(res);
        let updateQuery = 'UPDATE gardenplot SET ';
        Object.keys(Data).forEach((key, index) => { // Object.keys(Data) is used for iterate key-values 
            if (Data[key] !== '') {
                updateQuery += `${key} = '${Data[key]}'`;
                if (index < Object.keys(Data).length - 1) {
                    updateQuery += ', ';
                }
            }
        });
        updateQuery += ` WHERE PlotID = ${PlotID}`;
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


Plot.deletePlot = (PlotID, result) => {
    db.query(`DELETE FROM gardenplot WHERE PlotID = "${PlotID}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
}
module.exports = Plot;  