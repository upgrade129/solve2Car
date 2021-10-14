const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../Swagger/swagger.json');

const customCss = fs.readFileSync(
  `${process.cwd()}/src/Swagger/swagger.css`,
  'utf8',
);

const authRoutes = require('../api/routes/carkee.routes');
const endpointRouter = require('../api/routes/endpoints.routes');

const app = express();

const upload = multer();
app.use(cors());

// for parsing application/json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
// form-urlencoded

// for parsing multipart/form-data
app.use(upload.any());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization',
  );
  next();
});
const router = express.Router();
app.use('/api', router);
authRoutes(router);
endpointRouter(router);
// let express to use this
app.use(
  '/api/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss }),
);
module.exports = app;
