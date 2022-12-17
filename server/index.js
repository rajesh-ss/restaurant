const mysql = require('mysql');

const express = require('express');
const cors = require('cors');
const app = express();

let data;

app.use(cors());
app.use(express.json());


app.listen(3306, () => {
   console.log(`Server is running on port 3306.`);
  });



app.get('/message', (req, res) => {
    res.json( {message:"it's working!!"} );
});
const con = mysql.createConnection({
    host: "chesking.cl0zsig3h8z6.us-east-1.rds.amazonaws.com",
    user: "admin",
    port: "3306",
    password: "rajesh123",
    connectionLimit: 15,
    queueLimit: 30,
    acquireTimeout: 1000000
});


con.connect(function(err) {
  if (err) throw err;
 // console.log("Connected!");
  con.query("use lab7", function (err, result) {
    if (err) throw err;
   // console.log("using lab7 database");
    //console.log(result);

});

});


try{
app.post('/insert', (req, res) => {
        console.log(req.body);
        con.query(
    'INSERT INTO Covid_details(State_Name, Date_of_Record, No_of_Samples, No_of_Deaths, No_of_Positive, No_of_Negative, No_of_Discharge) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [req.body.State_Name, req.body.Date_of_Record, req.body.No_of_Samples, req.body.No_of_Deaths, req.body.No_of_Positive, req.body.No_of_Negative, req.body.No_of_Discharge])
//    [items.map(item => [item.State_Name, item.Date_of_Record, item.No_of_Samples, item.No_of_Deaths, item.No_of_Positive, item.No_of_Negative, item.No_of_Discharge])])
});}
catch(e){
        console.log(e);
}



//con.query("create table Covid_details(State_Name varchar(50), Date_of_Record date, No_of_Samples int, No_of_Deaths int, No_of_Positive int, No_of_Negative int, No_of_Discharge int)", function (err, result) {
//if (err) throw err;
//      console.log("table created");
//      console.log(result);
//  });

//con.query("insert into Covid_details values('karnataka', 10/12/2020, 10, 30, 50, 60, 10)", function (err, result) {
//    if (err) throw err;
//    console.log("");
//    console.log(result);

//});


//data =con.query("select * from Covid_details", function (err, result) {
//    if (err) throw err;
//    console.log("display tables");
   // console.log(result);

//});


//app.get('/data', (req, res) => {
//    res.json(JSON.stringify(data[2]));
//});

//data = JSON.stringify(data)

//});

//});

app.get('/data', (req, res) => {
   // res.json(JSON.stringify(data[2]));

 //con.connect();
 con.query("select * from Covid_details", function (err, result) {
    if (err){
        res.status(400).send("error in database operation");
}
else{
	//console.log(res);
        res.json({message:result});
}
   // console.log("display tables");
   // console.log(result);
});

});
