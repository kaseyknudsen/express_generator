const express = require("express");
const partnerRouter = express.Router();

partnerRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the partners to you");
  })
  .post((req, res) => {
    res.end(
      `Will add the partners: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`Updating partners: ${req.body.name} with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end("Deleting all partners");
  });

partnerRouter
  .route("/:partnerId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send all the partners to you ${req.params.partnerId}`);
  })
  .post((req, res) => {
    res.end(
      `Will add the partners: ${req.params.partnerId} ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.end(`Updating partners: ${req.params.partnerId} ${req.body.name} with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end("Deleting all partners");
  });

module.exports = partnerRouter;
