/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_EVENTTABLE_ARN
	STORAGE_EVENTTABLE_NAME
	STORAGE_EVENTTABLE_STREAMARN
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "eventTable";
if(process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const partitionKeyName = "id";
const partitionKeyType = "S";
const sortKeyName = "time";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/events";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/events', function(req, res) {
  // const params = {
  //   TableName : tableName,
  //   /* Item properties will depend on your application concerns */
  //   Item: {
  //      id: '12345',
  //      title: 'first event'
  //   }
  // }
  // FOR TESTING
  const query = req.query;
  console.log("QUERY", query);
  console.log("IN GET API THING"); 
    // const response = { statusCode: 200 };
  const params = {
      TableName: tableName,
      Item: {
          id: '123456',
          title: 'second event',
          location: 'Big House',
          date: 'today',
          time: 'now'
      }
  };

  // var putPromise = dynamodb.put(params).promise();
  // putPromise.then(function(data) {
  //   console.log("DATA", data);
  //   res.body = JSON.stringify({
  //     message: "Successfully created post.",
  //     data,
  //   });
  // })
  // .catch(function(err) {
  //   console.log("ERROR", err);
  //   res.statusCode = 500;
  //   res.body = JSON.stringify({
  //     message: "Failed to create post.",
  //     errorMsg: e.message,
  //     errorStack: e.stack,
  //   });
  // })

  // putPromise.then(function(data) {
  //   console.log('Success'); 
  //   console.log(data);
  // }).catch(function(err) {
  //   console.log("EPIC FAIL");
  //   console.log(err);
  // });

  try {
    const data = dynamodb.put(params)
    // this logs 'Promise { <pending> }'
    console.log("DATA", data);
    console.log("in try block");
  }
  catch (err) {
    console.log(err);
    console.log("in catch block");
  }
  const events = [
    {id: 'abc', title: 'first event', location: 'big house', date: 'today', time: 'now'},
    {id: 'def', title: 'second event', location: 'yo momas house', date: 'today', time: 'now'},
    {id: 'ghi', title: 'third event', location: 'yo momas house', date: 'today', time: 'now'},
    {id: 'jkl', title: 'fourth event', location: 'yo momas house', date: 'today', time: 'now'},
    {id: 'mno', title: 'fifth event', location: 'yo momas house', date: 'today', time: 'now'},
    {id: 'pqr', title: 'sixth event', location: 'yo momas house', date: 'today', time: 'now'},
    {id: 'stu', title: 'seventh event', location: 'yo momas house', date: 'today', time: 'now'},
    {id: 'vwx', title: 'eighth event', location: 'yo momas house', date: 'today', time: 'now'},
    {id: 'yza', title: 'ninth event', location: 'yo momas house', date: 'today', time: 'now'},
    {id: 'bcd', title: 'tenth event', location: 'yo momas house', date: 'today', time: 'now'},
  ]
  res.json({
    events
  })
});

app.get('/events/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/events', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/events/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/events', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/events/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/events', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/events/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
