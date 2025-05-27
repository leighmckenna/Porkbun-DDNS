# Porkbun DDNS

## Overview

This is a quick tool built in Rust to run in a cronjob to update my DNS records on Porkbun. A previous version was built in JS and has been swapped over for ease of use on my server.

## Reqs

* cron
* Rust/Cargo

## Setup

1. Insert your API keys in the relevant constants in src/main.rs along with your relevant domain
2. Compile for your machine using the apropriate `cargo build --target` command.
3. Utilize `crontab -e` to schedule the executable to run every 5 minutes (*/5 * * * *)

![Leigh's GitHub stats](https://github-readme-stats.vercel.app/api?username=leighmckenna&show_icons=true&theme=radical)






## License

Copyright © 2021 Leigh McKenna

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
