/*

    Author: Joe Strickland
    App JavaScript file for initializing application and hosting services
    Date: December 31st, 2022

*/

//Require third party NPM packages so that they may be used throughout the application
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const homeRoutes = require("./routes/homeRoutes");
const newRoutes = require("./routes/newRoutes");
const prevRoutes = require("./routes/prevRoutes");

//Configure application instance settings so that app runs correctly
const app = express();
const host = "localhost";
let port = 3000;
let URL = "mongodb://localhost:27017/Rent";
app.set("view engine", "ejs"); 

//Connect the application to the local mongo database
const connect = async() => {
    await mongoose.connect(URL);

    app.listen(port, host, ()=> {
        console.log(`Connection to Mongo database successful. URL: ${URL}`);
        console.log("Server started on " + host + " with port " + port + " .");
    });
}

//Attempt to connect with the mongo database server
try {
    connect();
} catch(e) {
    console.log(`Server failed to start due to failing to connect to the database. What's wrong with the database? Error: ${e} `);
}

//Mount application middleware functions that will be used throughout the application to perform actions
app.use(express.static("public"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

//Establishing sessions for application
app.use(session({
    secret: "Idontreallyknowwhattoputhere2005",
    resave: false,
    saveUninitialized: false,
    cookie: {
        //Cookie good for one hour (Terms of MS)
        maxAge: 60 * 60 * 1000 
    },

    //Create a persistent session store using mongo connect package. Set the URL to the database URL. Collection = sessions
    store: new MongoStore({
        mongoUrl: URL
    }),
}));

//==============Set up initial Routing to different webpages throughout the web server============================
app.use("/", homeRoutes);

app.use("/newReport", newRoutes);

app.use("/prevReport", prevRoutes);

app.use((req, res, next) => {                  //Error handling middleware (404)
    let err = new Error("Server cannot locate the file specified by the user via " + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {                  //Error handling middleware (500)
    console.log(err.stack)                          //Print out the error stack to the console so that the developer may debugg the system
    if(!err.status) {                               //If an error code has not been set, then default it to 500 (Server error)
        err.status = 500;
        err.message = ("Internal Server error - Server was unable to process request!");
    }

    res.status(err.status);                         //Set the response status as the error status
    res.render("error", {error: err});              //Render the error template with the error object

});