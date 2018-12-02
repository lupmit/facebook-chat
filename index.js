//lupmit
//26/11/2018

// các thư viện cần cài đặt trước khi chạy
// npm install request				
// npm install facebook-chat-api	

var request = require("request");
var login = require("facebook-chat-api");
const fs = require("fs");

var http = require('http');
http.createServer(function(req, res) {
  console.log("ping");
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end("");
}).listen(process.env.PORT || 5000);

setInterval(function() {
  http.get("http://dungshin.herokuapp.com", function(res) {
    console.log("pong");
  });
}, 1800000 * Math.random() + 1200000);

function write (url)
{
	request(url).pipe(fs.createWriteStream(__dirname + '/song.mp3'));
}

var mess = new Array("bạn nói cái gì v ạ?","ý bạn là gì","nhắn cái gì có ý nghĩa cái coi ><","đừng spam nuwaxx má ơi-.-")
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
			return;
		}
		else if (message.body.search("sing")!= -1||message.body.search("Sing")!= -1) {
			var key = message.body.slice(5);
			request('https://phucmit.000webhostapp.com/api/getinfo.php?key='+encodeURI(key),
			function(error, response, body)
			{
				var obj = JSON.parse(body);
				if(obj.link === null)
				{
					api.sendMessage("Xin loi, k tim thay bai hat nay!",message.threadID);
					return;
				}
				write(obj.link);
				setTimeout(function() {
					var msg = {
						attachment: fs.createReadStream(__dirname + '/song.mp3')
					}
					api.sendMessage("dù như thế nào thì e vẫn ở bên anh, chúc anh nghe nhạc vui vẻ!",message.threadID);
					api.sendMessage(msg,message.threadID);
				}, 2000);
			});
			return;
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
				text = text.replace(/Gà Símimi/gi,"Miu Miu");
				text = text.replace(/sim sim/gi,"Miu Miu");
				text = text.replace(/simsimi/gi,"Miu Miu");
				text = text.replace(/simsi/gi,"Miu Miu");
				text = text.replace(/Pooh/gi,"Miu Miu");
				text = text.replace(/símimi/gi,"Miu Miu");
				text = text.replace(/simi/gi,"Miu Miu");
				text = text.replace("Talk with random person: https://play.google.com/store/apps/details?id=www.speak.com", mess[Math.floor(Math.random() * 3)]);
				console.log(text);
				api.sendMessage(text, message.threadID);					
			});
		}
	});
})