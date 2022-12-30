// const cors = require('cors');

// //whitelist--tells server to accept origins

// const whitelist = ['http://localhost:3000', 'https://localhost:3443']

// const corsOptionsDelegate = (req, callback) => {
//     let corsOptions;
//     console.log(req.header('Origin'))
//     //checking if an origin can be found in the whitelist
//     if (whitelist.indexOf(req.header('Origin'))!== -1) {
//         //true allows request to be accepted
//         corsOptions = { origin: true };
//     } else {
//         corsOptions = {origins: false}
//     }
//     //null means no error was found
//     callback(null, corsOptions)
// }

// /* cors returns a middleware function configured to set a cors header of 
// access-control-allow-origin on a response object with a wildcard as it's value*/
// exports.cors = cors()

// /* returns middleware that checks if the incoming request belongs to one of the 
// whitelist origins. Response header will send back access-control-allow-origin with 
// the whitelisted origin as the value*/
// exports.corsWithOptions = cors(corsOptionsDelegate)

const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);