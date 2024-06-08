const db = require('../../db-connection');

const Activity = {};

// Add a new activity
Activity.addActivity = (newActivity, result) => {
    db.query('INSERT INTO `planning activity` SET ?', newActivity, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newActivity });
    });
};

Activity.addActivityPlant = (newActivity, result) => {
    db.query('INSERT INTO plantingactivity_plant SET ?', newActivity, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newActivity });
    });
};

// Get the list of all activities
Activity.getActivitiesList = (result) => {
    db.query('SELECT * FROM `planning activity`', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Activity.getActivitiesPlantList = (result) => {
    db.query('SELECT * FROM plantingactivity_plant', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Get the list of activities by ActivityID
Activity.getActivitiesListById = (ActivityID, result) => {
    db.query('SELECT * FROM `planning activity` WHERE ActivityID = ?', [ActivityID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Get the list of activities by UserID
Activity.getActivitiesListByUserId = (UserID, result) => {
    db.query('SELECT * FROM `planning activity` WHERE UserID = ?', [UserID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Get the list of activities by PlotID
Activity.getActivitiesListByPlotId = (PlotID, result) => {
    db.query('SELECT * FROM `planning activity` WHERE PlotID = ?', [PlotID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};



// Update an activity
Activity.updateActivity = (ActivityID, Data, result) => {
    // Get the existing activity
    db.query('SELECT * FROM `planning activity` WHERE ActivityID = ?', [ActivityID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        
        // Build the update query
        let updateQuery = 'UPDATE `planning activity` SET ';
        let updateData = [];
        Object.keys(Data).forEach((key, index) => {
            if (Data[key] !== '') {
                updateQuery += `${key} = ?`;
                updateData.push(Data[key]);
                if (index < Object.keys(Data).length - 1) {
                    updateQuery += ', ';
                }
            }
        });
        updateQuery += ' WHERE ActivityID = ?';
        updateData.push(ActivityID);
        
        // Execute the update query
        db.query(updateQuery, updateData, (err, res) => {
            if (err) {
                console.error('Error updating record:', err);
                result(err, null);
                return;
            }
            console.log('Record updated successfully');
            result(null, res);
        });
    });
};

// Delete an activity
Activity.deleteActivity = (ActivityID, result) => {
    db.query('DELETE FROM `planning activity` WHERE ActivityID = ?', [ActivityID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Activity;
