const express = require("express");
const cors = require("cors");

const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/todos", async (_, res) => {
  const result = await pool.query(
    "SELECT * FROM todos ORDER BY id DESC"
  );

  res.json(result.rows);
});

app.post("/todos", async (req, res) => {
  const { text } = req.body;

  const result = await pool.query(
    "INSERT INTO todos (text) VALUES ($1) RETURNING *",
    [text]
  );

  res.json(result.rows[0]);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "DELETE FROM todos WHERE id = $1",
    [id]
  );

  res.json({
    message: "Todo deleted",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});