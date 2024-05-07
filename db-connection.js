const mysql = require("mysql");
require("dotenv").config();
// createPool --> Create more than 1 connections

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,


});

con.connect( (err)=>{
    if(err) throw err;
    console.log(" Connected Successfully to DB ");
    con.query("CREATE DATABASE IF NOT EXISTS GreenThumb", function(err, results){
        if(err){
            throw err;
        } 
        console.log(`GreenThumb DB Created!!`);
    })
} )