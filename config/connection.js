// Connect Node to MySQL.
var mysql = require("mysql");


var db_config  = mysql.createConnection({
        host: "us-cdbr-iron-east-02.cleardb.net",
        user: "bf48eacefdf541",
        password: "7042638b",
        database: "heroku_b7067b0921c5731"
    });



var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err.stack);
      
      setTimeout(handleDisconnect, 2000);
      return; // We introduce a delay before attempting to reconnect,
    }     
    console.log("connected as id " + connection.threadId);          // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
// Export the connection.
module.exports = connection;