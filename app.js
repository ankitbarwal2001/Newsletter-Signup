const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res)=>{

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_feilds: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

app.post("/failure", (req, res)=>{
  res.redirect("/")
})

const jsonData = JSON.stringify(data);

const url = "https://us14.api.mailchimp.com/3.0/lists/1401e05dfd"

const options = {
  method: "POST",
  auth: "ankit:d6bf51a97126b90274e1dcc516a68c65-us14"
}

const request = https.request(url, options, function(response){

  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html")
  } else {
    res.sendFile (__dirname + "/failure.html")
  }

  response.on("data", (data)=>{
    console.log(JSON.parse(data));
  })
})

  request.write(jsonData);
  request.end();

});

app.listen(3000, function(){
  console.log("This server is running on port 3000");
});



// mailchimp API key
// d6bf51a97126b90274e1dcc516a68c65-us14
// adudience list id
// 1401e05dfd
