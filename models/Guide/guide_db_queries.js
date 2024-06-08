const db = require('../../db-connection');

const Guide = {};

Guide.addGuide = async (newGuide, result) => {
    // console.log(global.userId)
    db.query('INSERT INTO guide SET ?', {GuideID: newGuide.GuideID, AuthorUserID: newGuide.AuthorUserID, Title: newGuide.Title, Content: newGuide.Content, Rate: newGuide.Rate}, (err, res) => {
        
      if (err) {
        console.log(3);
        result(err, null);
        return;
      }
      result(null, {GuideID: newGuide.GuideID, AuthorUserID: newGuide.AuthorUserID, Title: newGuide.Title, Content: newGuide.Content, Rate: newGuide.Rate});
    });
  };

  Guide.getGuide = ( result) => {

    db.query('SELECT * FROM guide',  (err, res) => {
        
        if (err) {
        console.log(3);
        result(err, null);
        return;
        }
        result(null, res);
    });
    };

    Guide.getGuideById = (GuideID, result) => {

        db.query(`SELECT * FROM guide WHERE GuideID = ${GuideID}`, (err, res) => {
    
            if (err) {
                console.log(3);
                result(err, null);
                return;
            }
            result(null, res);
        });
    };
    
    
    Guide.getGuideListByTitle = (Title, result) => {
        db.query(`SELECT * FROM guide WHERE Title = "${Title}"`, (err, res) => {
    
            if (err) {
                console.log(3);
                result(err, null);
                return;
            }
            result(null, res);
        });
    };

  Guide.updateGuideList = (GuideID, Data, result) => {

    const guideData = db.query(`SELECT * FROM guide Where GuideID = ${GuideID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        console.log(res);
        let updateQuery = 'UPDATE guide SET ';
        Object.keys(Data).forEach((key, index) => { // Object.keys(Data) is used for iterate key-values 
            if (Data[key] !== '') {
                updateQuery += `${key} = '${Data[key]}'`;
                if (index < Object.keys(Data).length - 1) {
                    updateQuery += ', ';
                }
            }
        });
        updateQuery += ` WHERE GuideID = ${GuideID}`;
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


Guide.deleteSpecificGuideFromList = (GuideID, result) => {
  db.query(`DELETE FROM guide WHERE GuideID = "${GuideID}"`, (err, res) => {

      if (err) {
          console.log(3);
          result(err, null);
          return;
      }
      result(null, res);
  });
}


Guide.addComment = (newComment, result) => {

    db.query('INSERT INTO comments SET ?', newComment, (err, res) => {
        
      if (err) {
        console.log(3);
        result(err, null);
        return;
      }
      result(null, { ...newComment });
    });
  };

  Guide.commentsList = ( result) => {

    db.query('SELECT * FROM comments',  (err, res) => {
        
        if (err) {
        console.log(3);
        result(err, null);
        return;
        }
        result(null, res);
    });
    };


    Guide.updateComment = (CommentID, Data, result) => {

        const guideData = db.query(`SELECT * FROM comments Where CommentID = ${CommentID}`, (err, res) => {
    
            if (err) {
                console.log(3);
                result(err, null);
                return;
            }
            console.log(res);
            let updateQuery = 'UPDATE comments SET ';
            Object.keys(Data).forEach((key, index) => { // Object.keys(Data) is used for iterate key-values 
                if (Data[key] !== '') {
                    updateQuery += `${key} = '${Data[key]}'`;
                    if (index < Object.keys(Data).length - 1) {
                        updateQuery += ', ';
                    }
                }
            });
            updateQuery += ` WHERE CommentID = ${CommentID}`;
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

module.exports = Guide;  