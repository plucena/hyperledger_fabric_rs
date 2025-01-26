const appName = require('./../package').name;
const express = require('express');
const log4js = require('log4js');
const localConfig = require('./config/local.json');
const compression = require('compression');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const cors = require('cors');
const blockinfoRoutes = require('./routes/blockinfo');
const fabric = require('./utils/fabric-wrapper');

const logger = log4js.getLogger(appName);
const app = express();
app.use(log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || 'info' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(cors());
// 
app.use(history({
  // verbose: true,
  rewrites: [
    {
      from: /^\/api\/.*$/,
      to: (context) => context.parsedUrl.pathname
    }
  ]
}));

app.use('/', express.static(`${__dirname}/../public/`));
app.use('/api/blockinfo', blockinfoRoutes);

fabric.init();

const port = process.env.PORT || localConfig.port;
app.listen(port, () => {
  // logger.info(`App listening on http://localhost:${port}/appmetrics-dash`);
  
  logger.info(`App listening on http://localhost:${port}`);
});
