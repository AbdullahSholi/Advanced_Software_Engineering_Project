const mysql = require("mysql");
require("dotenv").config();

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "greenthumb"


});

con.connect( (err)=>{
    if(err) throw err;
    console.log(" Connected Successfully to DB ");
    con.query("CREATE DATABASE IF NOT EXISTS greenthumb", function(err, results){
        if(err){
            throw err;
        } 
        console.log(`GreenThumb DB Created!!`);
    })
} )

module.exports = con;