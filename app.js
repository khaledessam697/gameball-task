require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
app.use(morgan('dev'));
app.use(express.json({
  limit: '500MB',
  extended: false
}));
app.use(express.urlencoded({
  extended: false
}));

//swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:5000"]
    }
  },
  // ['.routes/*.js']
  apis: ["app.js","./src/modules/**/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));




// To allow cross-origin requests
const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOption));
app.use('/', require('./src/routes'));
app.use(require('./middlewares/MainErrorsHandlerMiddleware'));
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

try {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(process.env.MONGODB_URL);
      console.log('Connected to MongoDB');
      app.listen(process.env.PORT, () => {
        console.log('App listening on port ' + process.env.PORT);
      });
    })
    .catch((err) => {
      if (err) return console.log(err);
    });
} catch (err) {
  console.log(err.message);
}

// module.exports = app;