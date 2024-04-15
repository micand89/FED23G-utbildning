import express, { NextFunction, Request, Response } from "express";
require("express-async-errors"); /* Låter oss skriva handlers async */

import todoRouter from "./routers/todos-router";
import usersRouter from "./routers/users-router";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json("Välkommen till mitt api");
});

app.use(express.json());
app.use("/api/todos", todoRouter);
app.use("/api/users", usersRouter);
// app.use("/api/history", todoRouter);
// app.use("/api/calendar", todoRouter);

app.use("*", (req, res) => {
  res.status(404).json("Resursen verkar inte finnas...");
});

/* Felhanteraren */
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof Error) {
    // Kan vara bra att sanera svaret i produktion - process-env.NODE_ENV
    res.status(500).json(err.stack);
    return;
  }
  res.status(500).json("Ett oväntat fel har uppstått");
});

/* Vilken port lyssnar applikationen på */
app.listen(3500),
  () => {
    console.log("Server running on http://localhost:3500");
  };
