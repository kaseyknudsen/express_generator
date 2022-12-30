const express = require("express");
const authenticate = require("../authenticate");
const multer = require("multer");
const cors = require('./cors')

/* custom configuration for multer */
const storage = multer.diskStorage({
  //destination property takes a function
  destination: (req, file, cb) => {
    //null means no error
    //2nd argument is the path we want to save the file to
    //public/images is a file that can be accessed in outside world
    cb(null, "public/images");
  },
  /* file.originalname ensures the file on the server will be the same as the name
    of the file on the client side*/
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  //true tells multer to accept this file
  cb(null, true);
};

//calling multer function with options we configured
const upload = multer({ storage: storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();

//configure to handle http requests
uploadRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end("GET operation not supported on /imageUpload");
  }) //upload.single is multer middleware that uploads and deals with any errors
  .post(
    cors.corsWithOptions, 
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    upload.single("imageFile"),
    (req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      //res.json(req.file) confirms file was received correctly
      res.json(req.file);
    }
  )
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /imageUpload");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /imageUpload");
  });

module.exports = uploadRouter;
