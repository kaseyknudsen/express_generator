/* this file will contain the code for handling the REST API endpoints for campsites and 
campsites/campsitesId */
//we chained them to be one single statement by removing .app and the path from the parameters

const express = require("express");
const promotionRouter = express.Router();

promotionRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the promotions to you");
  })
  .post((req, res) => {
    res.end(
      `Will add promotion: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`Updating promotions: ${req.body.name} with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end("Deleting all promotions");
  });

promotionRouter
  .route("/:promotionId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send all the promotions to you ${req.params.promotionId}`);
  })
  .post((req, res) => {
    res.end(
      `Will add the promotion: ${req.params.promotionId} ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.end(`Updating promotions: ${req.params.promotionId} ${req.body.name} with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end("Deleting all promotions");
  });

module.exports = promotionRouter;
