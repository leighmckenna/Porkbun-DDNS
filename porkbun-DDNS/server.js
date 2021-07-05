import { apiKey, secretKey } from './secrets';

const publicIp = require('public-ip');
const express = require('express');
const cron = require('node-cron');
const https = require('https');
const axios = require('axios');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const timeoutValue = 600;

// App
const app = express();

var currentIp = "";

cron.schedule('* * * * *', function() {
    let newIp = await publicIp.v4();
    if (newIp != currentIp) {
        currentIp = newIp;

        axios.post('https://porkbun.com/api/json/v3/dns/retrieve/cael.tech', {
            secretapikey: secretKey,
            apikey: apiKey
        }).then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        }).catch(error => {
            console.error(error)
        })
    }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

