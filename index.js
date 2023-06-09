import mysql2 from "mysql2";
import express from "express";

const connection = mysql2.createConnection({
  host: "localhost",
  database: "store",
  user: "root",
  password: "Rahul@sql",
});

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json()); // Middleware that allows you to read data from req.body

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SERVER : http://localhost:${PORT}`);
  connection.connect((err) => {
    if (err) throw err;
    console.log("DATABASE CONNECTED");
  });
});

const getOrders = async (req, res) => {
  const sql_query = `Select * from orders`;
  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    else {
      console.log(result);
      res.send(result);
    }
  });
};
const postOrder = async (req, res) => {
  const columns = Object.keys(req.body).join(", ");
  const values = Object.values(req.body)
    .map((value) => {
      if (typeof value === "string") {
        return `'${value}'`;
      }
      return value;
    })
    .join(", ");
  const sql_query = `INSERT INTO orders (${columns}) VALUES (${values})`;
  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    else {
      console.log(result);
      res.send(result);
    }
  });
};
const deleteOrder = async (req, res) => {
  const sql_query = `DELETE FROM orders WHERE id=${parseInt(req.params.id)}`;
  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    else {
      console.log(result);
      res.send(result);
    }
  });
};
app.post("/api/order", postOrder);
app.get("/api/order", getOrders);
app.delete("/api/order/:id", deleteOrder);

// app.use('/api/order/:id').delete()
