import express from "express";
import { log } from "node:console";
import crypto from "node:crypto";

let users = [
  {id: "1", name: "John Doe", age: "25"},
  {id: "2", name: "Jane Smith", age: "30"}
]

const app = express();
// Middleware
app.use(express.json());

// get all users
app.get("/api/users", (req,res) => {
  res.json(users);
})

// get one user by id
app.get("/api/users/:id", (req,res) => {
  const id = req.params.id;
  const user = users.find(user => user.id === id);
  if(!user) return res.json({ error: 404 });
  res.json(user);
})

// create user
app.post("/api/users", (req, res) => {
  const { name, age } = req.body;

  const newUser ={
    id: crypto.randomUUID(),
    name,
    age,
  };

  users.push(newUser);

  res.json({ name, age });
});

// update user
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const {name, age} = req.body;
  const user = users.find((user) => user.id === id);
  if (!user) return res.json({ error: 404 });
  if(name) user.name = name;
  if(age) user.age = age;

  res.json(user);
});
 
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) return res.json({ error: 404 });
  users = users.filter((user) => user.id !== id);
  res.json(user);
});

app.listen(1234, () => {
  console.log(`Server on http://localhost:1234`);  
})

process.loadEnvFile();
const PORT = process.env.PORT
