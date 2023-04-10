const express = require('express');

const app = express();

const routes = require('./routes/items')
const ExpressError = require('./expressError')

app.use(express.json());
app.use('/shopList', routes)

// 404 handler
app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404);
  });
  
// general error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.json({
      error: err.message,
    });
  });
  
module.exports = app


// Server
app.listen(3300, function() {
    console.log('Server is listening on port 3300')
})