var spawn = require('child_process').spawn;
const python_location = 'python';
const login_reg = require('./login_reg');
const mailer = require('./sendMail');
const path = require('path');
const parentDir = path.join(__dirname, '../..');




const sendKey= async (email,key) => {

    mailer.sendKey(email,key);

}





const submitEncryptFiles =async (req,res) => {
    let filePath=parentDir+"/uploads/"+req.body.fileName;
    filepath=filePath.replaceAll("\\","/");

    let user = "default";
     user =await login_reg.getCurrentUser();//userName 
     console.log(typeof user[0].name);

    var process = spawn(python_location, ['./backend/python_scripts/encrypt_image.py',filePath,req.body.key,user[0].name]);
    var tempVar="#######";
    var tempstring='';
    process.stdout.setEncoding("utf8");
    process.stdout.on('data',(data)=>{
        tempVar=data;
        tempstring=data;
        console.log("in stdout "+data.toString());

        //res.send(tempVar);
    });
    process.stderr.on('data',(data)=>{
    tempVar+=data.toString();
    console.log("in stderr"+data.toString());
    });
    process.on('close',(data)=>{
    tempVar+=data.toString();
    console.log("ended"+data.toString());
   // res.send("submitEncrpytFile completed where temp returned is "+ tempVar);
    sendKey(user[0].email,req.body.key);
    res.redirect("/dashboard");

    });

    console.log("submitEncrpytFile completed where temp returned is "+ tempstring);
   
 }

 const encryptImage=async(req,res)=>{
    var process=spawn(python_location,["./backend/python_scripts/encrypt_image.py"]);
 }

 const downloadDecryptedFile =async (req,res) => {

    let user = "default";
    user =await login_reg.getCurrentUser();
     login_reg.getCurrentUser().then(result=>{
        user=result;
    }).catch(err=>{
        console.log(err)
    })//userName 

    var process = spawn(python_location, ['./backend/python_scripts/decrypt_image.py',req.body.fileName,req.body.key,user[0].name]);
    var tempVar="#######";
    var tempstring='';
    process.stdout.setEncoding("utf8");
    process.stdout.on('data',(data)=>{
        tempVar=data;
        tempstring=data;
        console.log("in stdout "+data.toString());
        //res.send(tempVar);
    });
    process.stderr.on('data',(data)=>{
    tempVar+=data.toString();
    console.log("in stderr"+data.toString());
    });
    process.on('close',(data)=>{
    tempVar+=data.toString();
    console.log("ended"+data.toString());
   // res.send("submitEncrpytFile completed where temp returned is "+ tempVar);

    res.redirect("/dashboard");

    });

    console.log("Decrypted data downloaded completed where temp returned is "+ tempstring);
   
 }


module.exports ={
    submitEncryptFiles,
    downloadDecryptedFile
}



// process.stderr.on('data',(data)=>{
//     tempVar+=data.toString();
//     console.log("in stderr"+data.toString());
// });
// process.on('close',(data)=>{
//     tempVar+=data.toString();
//     console.log("ended"+data.toString());