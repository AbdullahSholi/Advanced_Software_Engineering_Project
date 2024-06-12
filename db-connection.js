const mysql = require("mysql2");
require("dotenv").config();
const dbConfig = require('./db.config');


const con = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB

});

con.connect( (err)=>{
    if(err) throw err;
    console.log(" Connected Successfully to DB ");
    con.query("CREATE DATABASE IF NOT EXISTS testDB", function(err, results){
        if(err){
            throw err;
        } 
        console.log(`testDB DB Created!!`);

         // Create 'users' table if not exists
  const createTableQuery = `
  -- Database: greenthumb
  
  -- Table structure for table user
  CREATE TABLE IF NOT EXISTS user (
    UserID int(50) NOT NULL PRIMARY KEY,
    Username varchar(50) NOT NULL,
    Email varchar(50) NOT NULL,
    Password varchar(100) NOT NULL,
    Role text NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- Table structure for table garden
  CREATE TABLE IF NOT EXISTS garden (
    GardenID int(50) NOT NULL PRIMARY KEY,
    Name varchar(50) NOT NULL,
    Location varchar(50) NOT NULL,
    Description varchar(1000) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- Table structure for table user_garden
  CREATE TABLE IF NOT EXISTS user_garden (
    UserGardenID int(50) NOT NULL PRIMARY KEY,
    UserID int(50) NOT NULL,
    GardenID int(50) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES user (UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (GardenID) REFERENCES garden (GardenID) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- Table structure for table guide
  CREATE TABLE IF NOT EXISTS guide (
    GuideID int(50) NOT NULL PRIMARY KEY,
    AuthorUserID int(50) NOT NULL,
    Title varchar(500) NOT NULL,
    Content varchar(500) NOT NULL,
    Rate int(11) NOT NULL,
    FOREIGN KEY (AuthorUserID) REFERENCES user (UserID) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- Table structure for table comments
  CREATE TABLE IF NOT EXISTS comments (
    CommentID int(11) NOT NULL PRIMARY KEY,
    GuideID int(11) NOT NULL,
    Comment text NOT NULL,
    FOREIGN KEY (GuideID) REFERENCES guide (GuideID) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- Table structure for table partnership
  CREATE TABLE IF NOT EXISTS partnership (
    PartnershipID int(50) NOT NULL PRIMARY KEY,
    Name varchar(50) NOT NULL,
    Type varchar(50) NOT NULL,
    ContactInfo varchar(50) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- Table structure for table resource
  CREATE TABLE IF NOT EXISTS resource (
    ResourceID int(50) NOT NULL PRIMARY KEY,
    Type varchar(50) NOT NULL,
    Description varchar(1000) NOT NULL,
    AvailableQuantity bigint(20) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- Table structure for table exchange
  CREATE TABLE IF NOT EXISTS exchange (
    ExchangeID int(50) NOT NULL PRIMARY KEY,
    OfferUserID int(50) NOT NULL,
    RequestorUserID int(50) NOT NULL,
    Status varchar(200) NOT NULL,
    FOREIGN KEY (OfferUserID) REFERENCES user (UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (RequestorUserID) REFERENCES user (UserID) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- Table structure for table exchange_resource
  CREATE TABLE IF NOT EXISTS exchange_resource (
    Exchange_Resource_ID int(50) NOT NULL PRIMARY KEY,
    ExchangeID int(50) NOT NULL,
    ResourceID int(50) NOT NULL,
    FOREIGN KEY (ExchangeID) REFERENCES exchange (ExchangeID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ResourceID) REFERENCES resource (ResourceID) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- Table structure for table resource_partnership
  CREATE TABLE IF NOT EXISTS resource_partnership (
    Resource_Partnership_ID int(50) NOT NULL PRIMARY KEY,
    ResourceID int(50) NOT NULL,
    PartnershipID int(50) NOT NULL,
    FOREIGN KEY (ResourceID) REFERENCES resource (ResourceID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (PartnershipID) REFERENCES partnership (PartnershipID) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  
  
  -- Table structure for table plant
  
  
  -- Table structure for table plantingactivity_plant
  
  
  -- Table structure for table gardenplot
  CREATE TABLE IF NOT EXISTS gardenplot (
    PlotID int(50) NOT NULL PRIMARY KEY,
    GardenID int(50) NOT NULL,
    PlotSize int(50) NOT NULL,
    SunLight varchar(500) NOT NULL,
    SoilType varchar(500) NOT NULL,
    Available text NOT NULL,
    FOREIGN KEY (GardenID) REFERENCES garden (GardenID) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- Table structure for table volunteerevent
  CREATE TABLE IF NOT EXISTS volunteerevent (
    EventID int(50) NOT NULL PRIMARY KEY,
    GardenID int(50) NOT NULL,
    Date date NOT NULL,
    Description varchar(1000) NOT NULL,
    FOREIGN KEY (GardenID) REFERENCES garden (GardenID) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  
    `;
  
    const createTableQueries = createTableQuery.split(';');
    createTableQueries.forEach((query) => {
      con.query(query, (error, results, fields) => {
        if (error) {
          console.error('Error executing SQL query:', error);
          return;
        }
        console.log('SQL query executed successfully!');
      });
    });
  
    con.query(`CREATE TABLE IF NOT EXISTS \`planning activity\` (
    ActivityID int(50) NOT NULL PRIMARY KEY,
    UserID int(50) NOT NULL,
    PlotID int(50) NOT NULL,
    PlantDate date NOT NULL,
    HarvestDate date NOT NULL,
    FOREIGN KEY (UserID) REFERENCES user (UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (PlotID) REFERENCES gardenplot (PlotID) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`, (error, results, fields) => {
      if (error) {
  
        return;
      }
      console.log('SQL query executed successfully!');
    });
  
    
    con.query(`CREATE TABLE IF NOT EXISTS plant (
    PlantID int(50) NOT NULL PRIMARY KEY,
    Name varchar(50) NOT NULL,
    GrowingSeason varchar(50) NOT NULL,
    Description varchar(1000) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`, (error, results, fields) => {
      if (error) {
        // console.error('Error executing SQL query:', error);
        return;
      }
      console.log('SQL query executed successfully!');
    });
    con.query(`CREATE TABLE IF NOT EXISTS plantingactivity_plant (
      PlantingActivity_Plant_ID int(50) NOT NULL PRIMARY KEY,
      ActivityID int(50) NOT NULL,
      PlantID int(50) NOT NULL,
      FOREIGN KEY (ActivityID) REFERENCES \`planning activity\` (ActivityID) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (PlantID) REFERENCES plant (PlantID) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`, (error, results, fields) => {
        if (error) {
          return;
        }
        console.log('SQL query executed successfully!');
      
      });

    })
} )

module.exports = con;