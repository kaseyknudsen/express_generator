const express = require("express");
const Campsite = require("../models/campsite");

const campsiteRouter = express.Router();

campsiteRouter
  .route("/")

  .get((req, res, next) => {
    Campsite.find()
      //is the result of Campsite.find() automatically set to whatever the 1st parameter is?
      .then((campsites) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsites);
        //res.json() middleware will automatically close the response stream
      })
      //this is passing the error handling off to the built in express error handling function
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    //mongoose create() method will automatically check the data to make sure it fits the schema we have defined
    //create() returns a promise
    Campsite.create(req.body)
      //campsite holds information about the document that was posted
      .then((campsite) => {
        console.log("Campsite Created ", campsite);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsite);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites");
  })
  .delete((req, res, next) => {
    //an empty parameter list results in every campsite in the collection being deleted
    Campsite.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

campsiteRouter
  .route("/:campsiteId")
  .get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then((campsite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsite);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 400;
    res.end(
      `POST operation not supported on /campsites/${req.params.campsiteId}`
    );
  })
  .put((req, res, next) => {
    Campsite.findByIdAndUpdate(
      req.params.campsiteId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((campsite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsite);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Campsite.findByIdAndDelete(req.params.campsiteId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = campsiteRouter;
