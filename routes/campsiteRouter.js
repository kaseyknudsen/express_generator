
const express = require("express");
const campsiteRouter = express.Router();

campsiteRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the campsites to you");
  })
  .post((req, res) => {
    res.end(
      `Will add the campsite: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`Updating campsites: ${req.body.name} with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end("Deleting all campsites");
  });

campsiteRouter
  .route("/:campsiteId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send all the campsites to you ${req.params.campsiteId}`);
  })
  .post((req, res) => {
    res.end(
      `Will add the campsite: ${req.params.campsiteId} ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.end(`Updating campsites: ${req.params.campsiteId} ${req.body.name} with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end("Deleting all campsites");
  });

module.exports = campsiteRouter;
