//lupmit
//26/11/2018
//
const fs = require("fs");
const login = require("facebook-chat-api");
const readline = require("readline");

var credentials = {email: "", password: ""};

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

login(credentials, (err, api) => {
    if(err) {
        switch (err.error) {
            case 'login-approval':
                console.log('Enter code > ');
                rl.on('line', (line) => {
                    err.continue(line);
                    rl.close();
                });
                break;
            default:
                console.error(err);
        }
        return;
    }
	api.setOptions({forceLogin: true});
    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
});