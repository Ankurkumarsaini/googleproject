const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const axios = require('axios');
const https = require('https');
require('dotenv').config();

const { App, LogLevel } = require("@slack/bolt");


const app = new App({
  token: process.env.TOKEN,
  signingSecret: process.env.SIGNING_TOKEN,
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});


function publishMessage() {
  try {	 
    // Call the chat.postMessage method using the built-in WebClient
    const result = app.client.chat.postMessage({
      // The token you used to initialize your app
      token: process.env.TOKEN,
      channel: 'D01F46BL5QE',	  
	  text:'Hello world :tada:',	  
	  //attachments:'[{"color": "#3AA3E3","attachment_type": "default","pretext": "pre-hello","text": "Cool Corporate Buzz Word...""}]'
	  //as_user:true,
      attachments:'[{"color": "#3AA3E3","author_name": "Bobby Tables","author_link": "http://flickr.com/bobby/","author_icon": "http://flickr.com/icons/bobby.jpg","text": "Cool Corporate Buzz Word..."}]',
	  //blocks:'[{"type": "section", "text": {"type": "plain_text", "text": "Hello world"}}]',
	  //icon_emoji:':chart_with_upwards_trend:'
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}



const PORT = 8002;
const yourWebHookURL = 'https://hooks.slack.com/services/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'; // PUT YOUR WEBHOOK URL HERE
const userAccountNotification = {
  'username': 'Error notifier', // This will appear as user name who posts the message
  'text': 'User failed to login 3 times. Account locked for 15 minutes.', // text
  'icon_emoji': ':bangbang:', // User icon, you can also use custom icons here
  'attachments': [{ // this defines the attachment block, allows for better layout usage
    'color': '#eed140', // color of the attachments sidebar.
    'fields': [ // actual fields
      {
        'title': 'Environment', // Custom field
        'value': 'Production', // Custom value
        'short': true // long fields will be full width
      },
      {
        'title': 'User ID',
        'value': '331',
        'short': true
      }
    ]
  }]
};



console.log(`app listening on port ${PORT}`);
publishMessage();
//runSample(); 
//hello();
//webhookmessage();



function webhookmessage(){
	
	
	
	 console.log('Sending slack message');
  try {
    const slackResponse = sendSlackMessage(yourWebHookURL, userAccountNotification);
    console.log('Message response', slackResponse);
  } catch (e) {
    console.error('There was a error with the request', e);
  }
}

function sendSlackMessage (webhookURL, messageBody) {
  // make sure the incoming message body can be parsed into valid JSON
  try {
    messageBody = JSON.stringify(messageBody);
  } catch (e) {
    throw new Error('Failed to stringify messageBody', e);
  }

  // Promisify the https.request
  return new Promise((resolve, reject) => {
    // general request options, we defined that it's a POST request and content is JSON
    const requestOptions = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }
    };

    // actual request
    const req = https.request(webhookURL, requestOptions, (res) => {
      let response = '';


      res.on('data', (d) => {
        response += d;
      });

      // response finished, resolve the promise with data
      res.on('end', () => {
        resolve(response);
      })
    });

    // there was an error, reject the promise
    req.on('error', (e) => {
      reject(e);
    });

    // send our message body (was parsed to JSON beforehand)
    req.write(messageBody);
    req.end();
  });
}


function hello(){
	
	/*
	const data = {
		"text": "Danny Torrence left a 1 star review for your property.",
    "blocks": [
    	{
    		"type": "section",
    		"text": {
    			"type": "mrkdwn",
    			"text": "Danny Torrence left the following review for your property:"
    		}
    	},
    	{
    		"type": "section",
    		"block_id": "section567",
    		"text": {
    			"type": "mrkdwn",
    			"text": "<https://example.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s."
    		},
    		"accessory": {
    			"type": "image",
    			"image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
    			"alt_text": "Haunted hotel image"
    		}
    	},
    	{
    		"type": "section",
    		"block_id": "section789",
    		"fields": [
    			{
    				"type": "mrkdwn",
    				"text": "*Average Rating*\n1.0"
    			}
    		]
    	}
    ]
}
*/


const data = {
    "attachments": [
        {
            "fallback": "Cool Corporate Buzz Word: *",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "text": "Cool Corporate Buzz Word..."
        }
    ]
}


/*
const data = {
                "text": "Note: Idea has changed...",
                "attachments": [{
                    "text": "Idea has been replaced with a slash command and is accessable by typing\n/idea",
                    "fallback": "Idea has been replaced with a slash command and is accessable by typing\n/idea",
                    "color": "#3AA3E3",
                    "attachment_type": "default",

                }]
            }
	*/		
	//const res = axios.post('https://hooks.slack.com/services/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', data);
	const res=axios.post('https://hooks.slack.com/services/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',data);
	console.log(res.data);
	
	
	
	/*
var options = {
		method: 'POST',
		url: 'https://api.slack.com/apps/A01ECJVP12L/incoming-webhooks',
		headers: {
			Accept: 'application/json',
			"Content-Type": "application/json; charset=utf-8",						
		},
		body: {						
			text: "Hello WOrld!"						
		},
		json: true

    };
    return rp(options)
        .then(results => {
            res.send("sent message to user").end();
        });
		*/
}		
		
		

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(projectId = 'ffn-chatbot-weather-dev') {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: 'hello',
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`Query: ${result.queryText}`);
  console.log(`Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`Intent: ${result.intent.displayName}`);
  } else {
    console.log(`No intent matched.`);
  }
}