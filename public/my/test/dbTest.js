// mysql 모듈 사용
const mysql = require("mysql");

// 연결할 DB 정보입력
const connection = mysql.createConnection({
  host: "myeonu.cafe24app.com",
  user: "gusdn0217",
  password: "Dbdb4783!",
  database: "gusdn0217",
  port: "3306",
});

const sql_create = "CREATE TABLE TTABLE(testkey int)";
const sql_insert = "INSERT INTO TTABLE(testkey) VALUES(456)";
const sql_select = "SELECT * FROM TTABLE";

// 데이터베이스 연결
connection.connect();

// create 쿼리문 사용
connection.query(sql_select, (error, results, fields) => {
  if (error) throw error;
  console.log(results.length);
});

// 연결 종료
connection.end();
