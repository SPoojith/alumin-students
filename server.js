var express = require('express');  
var app = express();  
var bodyParser = require('body-parser');  
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use('/', express.static(__dirname + '/public'));
// app.get('/', function (req, res) {  
//    res.sendFile("C:/Users/Aparna/aluminstudents/prgfiles/index.html" );  
// })  
app.post('/process_post', urlencodedParser, function (req, res) {  
   // Prepare output in JSON format  
   response = {  
       first_name:req.body.Name,  
       last_name:req.body.Address  
   };  
   var fname=req.body.Name;
   var lname=req.body.Address;

   const {MongoClient} = require('mongodb');
   const uri = "mongodb+srv://AluminStudents:Hm7Mj7yHJwgDOgaD@cluster0.fd9h01d.mongodb.net/?retryWrites=true&w=majority";


   const client = new MongoClient(uri);
 
   try {
       // Connect to the MongoDB cluster
        client.connect();
 
       // Make the appropriate DB calls
        //listDatabases(client);
 
        createListing(client,
         {
             name: fname,
             summary: lname,
             bedrooms: 1,
             bathrooms: 1
         }
       );
 
        findOneListingByName(client, "1db18is058");
 
   } catch (e) {
       console.error(e);
   } finally {
        client.close();
   }

   console.log("fname--",fname,"-",lname);server.js
   console.log(response);  
   res.end(JSON.stringify(response));  
})  

var server = app.listen(3000 ||process.env.PORT, function () {  
  var host = "localhost"  
  var port = server.address().port  
  console.log("http:/localhost:3000/index.html")  
})  

//  function listDatabases(client){
//     databasesList =  client.db().admin().listDatabases();
  
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
//   };
  
   function createListing(client, newListing){
    const result =  client.db("AluminStudents_db").collection("Dbit_students").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
  }
  
   function findOneListingByName(client, nameOfListing) {
    const result =  client.db("AluminStudents_db").collection("Dbit_students").findOne({ _id: nameOfListing });
  
    if (result) {
        console.log(`${result._id} : ${result.name}`)
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
  }