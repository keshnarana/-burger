// Connect Node to MySQL.
var mysql = require("mysql");


    connection = mysql.createConnection({
        host: "us-cdbr-iron-east-02.cleardb.net",
        user: "bf48eacefdf541",
        password: "7042638b",
        database: "heroku_b7067b0921c5731"
    });


connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Export the connection.
module.exports = connection;