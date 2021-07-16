# Raspberry Pi CI/CD Tools

## Overview

This is a collection of tools I personally use for my personal Raspberry Pi CI/CD pipeline. Currently, it has been broken into two parts: a webhook activated container that pulls new code from Github and a nodecron based container that continuiously updates a DNS record on my prefered registrar, Porkbun.

Both Docker containers are populated via an Ansible Playbook (init.yml) and can be started easily utilizing a docker compose file. 

## Setup/Use

Requirements:
* Docker & Docker Compose
* Ansible (optional, but do you really want to configure by hand?)
* Git w/ a valid SSH key populated
* A domain managed by Porkbun

Instructions:
1. `sudo ansible-playbook init.yml`
2. `sudo docker compose build`
3. `sudo docker compose up`

## License

Copyright © 2021 Leigh McKenna

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.