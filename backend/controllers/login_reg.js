const mysql = require('mysql2');
const fs = require('fs');
const mysqlPromise=require('mysql2/promise');

const path = require('path');
const parentDir = path.join(__dirname, '..');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aksb67@2001",
  database : "secure_data_search"
});


//method to register a user in the server
const registerUser = async (req,res) =>{
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected");
        var sql = `INSERT INTO users (name, email,password) VALUES ('${req.body.name}', '${req.body.email}','${req.body.password}')`;
        con.query(sql , function(err,result){
            if(err) throw err;
            console.log("Entry Inserted");
        })
    })
    
    //creating directory to store user's encrypted data
    fs.mkdir(`USER_DATABASE/${req.body.name}`, (err) => {
        if (err) {
          console.error('Error creating directory:', err);
        } else {
          console.log('Directory created successfully');
        }
      });

     res.redirect("/");

}
const startSession = async(userName,email) =>{
      con.query("TRUNCATE TABLE session_table",(err, result, fields)=> {
        if (err) throw err;
    });

    //adding the user to session table
    var sql = `INSERT INTO session_table (name, email) VALUES ('${userName}', '${email}')`;
    con.query(sql , function(err,result){
        if(err) throw err;
        console.log("Entry Inserted in session table");
    })
}
const loginUser =async (req,res) =>{

    let userName;
    con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT name, password FROM users WHERE email = "${req.body.email}"`,(err, result, fields)=> {
          if (err) throw err;
         // console.log(result);
          if(result[0].password!==req.body.password)
          {
            res.redirect("/wrongpass");
            return false;  
          }
            
          else{
            userName=result[0].name;
            console.log("Inside");
            startSession(userName,req.body.email);
            res.redirect("/dashboard");
            return true;
          }
        });
        console.log("Outside");

    })
}

async function getUsers() {
  const connection = await mysqlPromise.createConnection({
    host: "localhost",
  user: "root",
  password: "Aksb67@2001",
  database : "secure_data_search"
  });

  const [rows] = await connection.query('SELECT * FROM session_table');
  return rows;
}
const getCurrentUser= async () =>{

    // con.connect(function(err) {
    //   if (err) throw err;
    //   con.query("SELECT name FROM session_table",(err, result, fields)=> {
    //     if (err) throw err;

    //     console.log("name is "+(result[0].name));
    //     return result[0].name;


        // return new Promise((resolve, reject) => {
        //     resolve(result[0].name);
        // }); 

        try {
          const users =   await getUsers();
          console.log(users);
          return users;
        } catch (err) {
          console.error(err);
        }

        
//       });
// })

}
module.exports = {
    registerUser, 
    loginUser,
    getCurrentUser
}