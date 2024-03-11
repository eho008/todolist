import { type Request, type Response } from "express";

const express = require("express");

var cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

let lists = [
  {
    title: "Server ToDo List",
    listId: "1",
    createdAt: Date.now(),
  },
  { title: "Another Server ToDo List", listId: "2", createdAt: Date.now() },
];

let items = [
  { content: "some todo", listId: "1", id: "11", checked: false },
  { content: "some other todo", listId: "2", id: "12", checked: false },
];

app.get("/lists", (req: Request, res: Response) => {
  res.json({
    lists: lists,
  });
});

app.post("/lists", (req: Request, res: Response) => {
  lists.push(req.body);
  res.send(req.body);
});

/* app.get("/lists/:id", (req: Request, res: Response) => {
  res.json(lists.filter((list) => list.listId === req.params.id));
});
 */
app.put("/lists/:id", (req: Request, res: Response) => {
  lists.map((list) => {
    list.listId === req.params.id ? (list.title = req.body.title) : list;
  });
});

app.delete("/lists/:id", (req: Request, res: Response) => {
  lists = lists.filter((list) => list.listId !== req.params.id);
  res.send(req.params.id);
});

app.get("/lists/:id/todos", (req: Request, res: Response) => {
  const itemsForList = items.filter((item) => item.listId === req.params.id);
  /*  if (itemsForList.length > 0) { */
  res.json(itemsForList);
});

app.post("/lists/:id/todos", (req: Request, res: Response) => {
  items.push(req.body);
  res.send(req.body);
});

app.put("/lists/:listid/todos/:id", (req: Request, res: Response) => {
  items.map((item) => {
    item.id === req.params.id ? (item.content = req.body.content) : item;
  });
});

app.delete("/lists/:listid/todos/:id", (req: Request, res: Response) => {
  items = items.filter((item) => item.id !== req.params.id);
  res.send(req.params.id);
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
