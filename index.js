

// npm install request				
// npm install facebook-chat-api	

var request = require("request");
var login = require("facebook-chat-api");
var mess = new Array("bạn nói cái gì v ạ?","ý bạn là gì","nhắn cái gì có ý nghĩa cái coi ><","đừng spam nuwaxx má ơi-.-")
const fs = require("fs");
var botkey = "http://ghuntur.com/simsim.php?lc=vn&deviceId=&bad=0&txt=";

login(
	{
	appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))
	},
	
function callback (err, api)
{
	if(err) return console.error(err);
	
	api.setOptions({forceLogin: true, selfListen: false, logLevel: "silent"});
	
	api.listen(function callback(err, message)
	{
		if(message.body === "/logout") { 
			api.sendMessage(";) Ngừng auto chat thành công.", message.threadID); 
			api.markAsRead(message.threadID);
			return api.logout(err);
		}
		if (message.body==="Getid"||message.body==="getid"||message.body==="get id"||message.body==="Get id") {
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			api.sendMessage("Your ID: ", message.threadID); 
			api.sendMessage(message.senderID, message.threadID); 
			api.markAsRead(message.threadID); 
			console.log("Sender ID: " + message.senderID);
		}
		else if (message.body.indexOf("stop")===0){
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			return;
		}
		else if (message.body)
		{
			request(botkey + encodeURI(message.body),  
			function(error, response, body)
			{  
				let text = '';
				text += body;
				text = text.replace(/Gà Símimi/gi,"phúc");
				text = text.replace(/sim sim/gi,"phúc");
				text = text.replace(/simsimi/gi,"phúc");
				text = text.replace(/simsi/gi,"phúc");
				text = text.replace(/Pooh/gi,"phúc");
				text = text.replace(/símimi/gi,"phúc");
				text = text.replace(/simi/gi,"phúc");
				text = text.replace("Talk with random person: https://play.google.com/store/apps/details?id=www.speak.com", mess[Math.floor(Math.random() * 3)]);
				console.log(text.respSentence);
				api.sendMessage(text, message.threadID);					
			});
		}
	});
})