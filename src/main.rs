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
const DOMAIN: &str = "";
const TTL: &str = "600";

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {

    // Find current IP

    let current_ip_res = reqwest::Client::new()
        .post("https://porkbun.com/api/json/v3/ping")
        .body("{\"secretapikey\": \"".to_owned() + &PRIVKEY + "\",\"apikey\": \"" + &PUBKEY + "\"}")
        .send()
        .await?
        .text()
        .await?;
    
    let auth: AuthResponse = serde_json::from_str(&current_ip_res)?;
    // println!("body = {:?}", res);
    //println!("{}", auth.yourIp);

    let set_dns_res = reqwest::Client::new()
        .post("https://porkbun.com/api/json/v3/dns/editByNameType/".to_owned() + &DOMAIN +"/A")
        .body("{\"secretapikey\": \"".to_owned() + &PRIVKEY + "\",\"apikey\": \"" + &PUBKEY + "\",\"content\": \"" + &auth.yourIp + "\",\"ttl\": \"" + &TTL + "\"}")
        .send()
        .await?
        .text()
        .await?;

    
    // println!("{}", set_dns_res);
    Ok(())
}