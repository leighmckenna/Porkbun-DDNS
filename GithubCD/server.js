import bodyParser  from 'body-parser';
import express from 'express';
import {workingDirectory, startCommand} from './config.js';

const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


app.post('/payload', function (req, res) {
    // disgard changes and pull current update
	exec('git -C ' + workingDirectory + ' reset --hard', execCallback);
	exec('git -C ' + workingDirectory + ' clean -df', execCallback);
	exec('git -C ' + workingDirectory + ' pull -f', execCallback);

    // run start
    exec(startCommand, execCallback);
});
    
app.listen(3565, function () {
	console.log('listening on 3565');
});


function execCallback(err, stdout, stderr) {
    if(stdout) console.log(stdout);
	if(stderr) console.log(stderr);
}