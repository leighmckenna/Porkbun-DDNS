use reqwest;
use tokio;
use serde::{Deserialize};
use serde_json;

#[derive(Debug, Deserialize)]
struct AuthResponse {
	status: String,
	yourIp: String,
}

const PUBKEY: &str = "";
const PRIVKEY: &str = "";


#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {

    // Find current IP

    let res = reqwest::Client::new()
        .post("https://porkbun.com/api/json/v3/ping")
        .body("{\"secretapikey\": \"".to_owned() + &PRIVKEY + "\",\"apikey\": \"" + &PUBKEY + "\"}")
        .send()
        .await?
        .text()
        .await?;
    
    let auth: AuthResponse = serde_json::from_str(&res)?;
    // println!("body = {:?}", res);
    println!("{}", auth.yourIp);

    // Check if the IP has changed


    // If it has, redirect the DNS to the new IP
    // If it hasn't, do nothing


    Ok(())
}



