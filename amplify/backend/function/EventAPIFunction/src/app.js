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
	STORAGE_RSVPTABLE_ARN
	STORAGE_RSVPTABLE_NAME
	STORAGE_RSVPTABLE_STREAMARN
	STORAGE_USERTABLE_ARN
	STORAGE_USERTABLE_NAME
	STORAGE_USERTABLE_STREAMARN
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "EventTable";
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
  const query = req.query;
  let getItemParams = {
    TableName: tableName,
  }
  dynamodb.scan(getItemParams,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        console.log("items", data.Item)
        res.json(data.Item);
      } else {
        console.log("nitems", data);
        res.json(data) ;
      }
    }
  });
});

app.get('/events/event', function(req, res) {
  let eventID = req.query.eventID;
  var params = { 
    TableName: tableName,
    Key: { "id": eventID}
  }
  dynamodb.get(params,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        console.log("items", data.Item)
        res.json(data.Item);
      } else {
        console.log("nitems", data);
        res.json(data) ;
      }
    }
  });

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
  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'put call succeed!', url: req.url, data: data})
    }
  });
});

// UPDATE METHOD (not done)
app.put('/events/event', function(req, res) {
  let eventID = req.query.eventID;
  let params = {
    TableName: tableName,
    Key:{
        "id": eventID,
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues:{
        ":r":5.5,
        ":p":"Everything happens all at once.",
        ":a":["Larry", "Moe", "Curly"]
    },
    ReturnValues:"UPDATED_NEW"
};

  dynamodb.update(params, (err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'put call succeed!', url: req.url, data: data})
    }
  });
});

/****************************
* Example delete method *
****************************/

app.delete('/events', function(req, res) {
  let eventID = req.query.eventID;
  var params = {
    TableName: tableName,
    Key: {"id": eventID },
  }
  dynamodb.delete(params, (err, data)=> {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url});
    } else {
      res.json({url: req.url, data: data});
    }
  });
});

app.delete('/events/*', function(req, res) {
  
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});




/*************************************************************************************
 *                                      PROFILE API
 ************************************************************************************/
app.get('/events/profile', function(req, res) {
  console.log("IN PROFILE GET");
  const userID = req.query.userID;
  console.log("USERID", userID);
  let params = {
    TableName: "UserTable-dev",
    Key: {"cognitoUserID": userID},
  }
  dynamodb.get(params,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        console.log("items", data.Item)
        res.json(data.Item);
      } else {
        console.log("nitems", data);
        res.json(data) ;
      }
    }
  });
});
/*************************************************************************************
 *                                      RSVP API
 ************************************************************************************/
app.put('/events/RSVP', function(req, res) {
  let putItemParams = {
    TableName: "RSVPTable-dev",
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'put call succeed!', url: req.url, data: data})
    }
  });
});
 
app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app