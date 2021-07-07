import { DNSAPIKey, DNSSecKey } from './secrets.js';
import * as publicIp from 'public-ip';
import express from 'express';
import cron from 'node-cron';
import axios from 'axios';

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
cron.schedule('* * * * *', async function() {
    var futurIp = await publicIp.v4();
    if (futurIp != currentIp) {
        currentIp = futurIp;

        //get current records
        axios.post('https://porkbun.com/api/json/v3/dns/retrieve/' + domain, {
            secretapikey: DNSSecKey,
            apikey: DNSAPIKey,
        }).then(res => {
            let recordArr = res.data.records;
            let recordId = "";
            //see if intended subdomain's record already exists
            for (let i = 0; i < recordArr.length; i++){
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

