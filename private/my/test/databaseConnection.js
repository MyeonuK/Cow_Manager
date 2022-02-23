class PrivateDatabaseConnection {
  databaseConnection = null;

  constructor(ip) {
    if (ip == "::1" || ip == "::ffff:127.0.0.1") {
      this.databaseConnection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "cowmanager",
        port: "3306",
      });
    } else {
      this.databaseConnection = mysql.createConnection({
        host: "myeonu.cafe24app.com",
        user: "gusdn0217",
        password: "Dbdb4783!",
        database: "gusdn0217",
        port: "3306",
      });
    }

    conn.connect(function (err) {
      if (err) writeLog("connection error: " + err);
      else console.log("connected successfuelly!");
    });
  }

  getNewDatabaseConnection() {
    return this.databaseConnection;
  }
}

class DatabaseConnection {
  constructor() {
    throw new Error("Use DatabaseConnection.getDatabaseConnection!");
  }

  getDatabaseConnection(ip) {
    if (!!!this.databaseConnection) {
      this.databaseConnection = new PrivateDatabaseConnection(ip);
    }

    return this.databaseConnection;
  }
}

exports.getDatabaseConnection = DatabaseConnection.getDatabaseConnection;
