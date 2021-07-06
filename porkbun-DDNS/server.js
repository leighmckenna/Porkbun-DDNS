import { DNSAPIKey, DNSSecKey } from './secrets';

const publicIp = require('public-ip');
const express = require('express');
const cron = require('node-cron');
const https = require('https');
const axios = require('axios');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const timeoutValue = 600;
const subdomain = "picicd"
const domain = "cael.tech"

// App
const app = express();

var currentIp = "";

//utilizes node cron to schedule a task every minute
cron.schedule('* * * * *', function() {
    let newIp = await publicIp.v4();
    if (newIp != currentIp) {
        currentIp = newIp;

        //get current records
        axios.post('https://porkbun.com/api/json/v3/dns/retrieve/' + domain, {
            secretapikey: DNSSecKey,
            apikey: DNSAPIKey,
        }).then(res => {
            let recordArr = res.records;
            let recordId = "";
            //see if intended subdomain's record already exists
            for (let i = 0; i < recordArr.count(); i++){
                if (subdomain == recordArr[i].name) {
                    recordId = recordArr[i].id;
                }
            }
            if (recordId != "") {
                //update record
                axios.post('https://porkbun.com/api/json/v3/dns/edit/' + domain + '/' + recordId, {
                    secretapikey: DNSSecKey,
                    apikey: DNSAPIKey,
	                name: subdomain,
	                type: "A",
	                content: currentIp,
	                ttl: "300"
                }).then(res => {
                    console.log("Record updated at: " + new Date().getTime());
                }).catch(error => {
                    console.error(error)
                })
            }
            else {
                axios.post('https://porkbun.com/api/json/v3/dns/create/' + domain, {
                    secretapikey: DNSSecKey,
                    apikey: DNSAPIKey,
	                name: subdomain,
	                type: "A",
	                content: currentIp,
	                ttl: "300"
                }).then(res => {
                    console.log("Record updated at: " + new Date().getTime());
                }).catch(error => {
                    console.error(error)
                })
            }

        }).catch(error => {
            console.error(error)
        })
    }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

