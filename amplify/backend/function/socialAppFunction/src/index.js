const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
// var cors = require('cors') // ADDED - for avoiding CORS in local dev
// app.use(cors())  // ADDED - for avoiding CORS in local dev

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
