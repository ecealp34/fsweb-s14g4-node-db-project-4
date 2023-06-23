const express = require("express");
const server = express();
const tarifRouter = require("./tarif/tarif-router");
server.use(express.json());

server.get("/", (req,res) => {
    res.send("<h3> App is working </h3>")
})

server.use("/api/tarif", tarifRouter);

module.exports = server;