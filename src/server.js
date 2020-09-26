const express = require("express");
const server = express();

// Getting the database from exported module
const db = require("./database/db");

// Configuring public directory
server.use(express.static("public"));

// Habilitating req.body in the application 
server.use(express.urlencoded({ extended: true }));

// Using template engine 
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Routes of application
// Initial page
// req: require
// res: respose
server.get("/", (req,res) => {
    return res.render("index.html");
})

// Create-point page
server.get("/create-point", (req,res) => {
    return res.render("create-point.html");
})

// Saving collection point (POST)
// Method is embedded in form of create-point.html page
// Each form's input name attribute value would show up in the browser' address
// if form's method was left with default GET.
// This POST method will execute db.run which will fetch create-point.html  
server.post("/savepoint", (req,res) => {

    // inserting data into the database
    // SQL query for inserting data into table
    const query = `
    INSERT INTO places(
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err);
        }
        // console.log(this);
        // Toggle partial point-created.html
        return res.render("create-point.html", { saved: true });
    }
    // POST method runs an SQL query with call-back function to render page and 
    db.run(query, values, afterInsertData); // toggle partial HTML that runs
    // a JavaScript command to go back to home page
})

// Search for collection point page
server.get("/search", (req,res) => {

    const search = req.query.search;

    if(search == "") {
        // no results
        return res.render("search-results.html", { total: 0 });
    }

    // take data from database 
    // consult data from table 
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows) {
        if(err) {
            return console.log(err);
        }
        const total = rows.length;
        // show html page filled with data from database 
        return res.render("search-results.html", { places: rows, total: total });    
    });

})


// Turn on server
server.listen(3000)