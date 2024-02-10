const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000
const multer  = require('multer');
const parentDir = path.join(__dirname, '..');
const axios = require('axios');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
})
const upload = multer({ storage: storage })

const {
  submitEncryptFiles,
  downloadDecryptedFile
} = require('./controllers/misc')

const login_reg = require('./controllers/login_reg');

app.use(bodyParser.urlencoded({ extended: true }));

console.log("hello"+parentDir);
app.use(express.static(parentDir+"/frontend"));




app.get('/',(req,res) =>{
  res.sendFile(parentDir+"/frontend/home.html");
})


app.get('/wrongpass',(req,res) =>{
  res.sendFile(parentDir+"/frontend/wrongpass.html");
})

app.post('/userRegister',(req,res) =>{
  console.log("registering");
  login_reg.registerUser(req,res);
  console.log("registered");
  
})

app.post('/userLogin', (req,res) => {
  console.log("Logging in ");
  login_reg.loginUser(req,res);

})
app.get('/dashboard', (req, res) => {
  res.sendFile(parentDir+"/frontend/DashBoard.html");
})

app.post('/encrypt_page',(req,res)=>{
  //console.log(req.body.fname)

  
 // res.sendFile( parentDir+"/frontend/Encrypt.html");
})

app.post('/uploaded',(req,res)=>{
  console.log(req.body.fname)
  res.send("UPLOADED");
})


app.post('/encryptSubmit',upload.single('image'),(req,res)=>{
  submitEncryptFiles(req,res);
  //res.send("File Encrypted!")
  //console.log(req.body.key)
  console.log("encrypt submit complete");
  //res.send("submitted encryption data");
})

app.post('/decryptSubmit', (req,res) => {

  downloadDecryptedFile(req,res);

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})