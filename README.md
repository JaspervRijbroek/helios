# Helios
## Need for Speed: World server emulator

![Deploy](https://github.com/JaspervRijbroek/helios/actions/workflows/build.yml/badge.svg)

Helios is a Need for Speed: World server emulator written in node.  
As the game itself has been abandoned by the developer/ maintainer it is more accepted
to host your own server.

## Installation

System requirements:
- Raspberry PI
- MySQL 5.7 or later
- NodeJS 14 or later

Installation steps:
1. Clone this repo
1. Run `yarn` or `npm i` to install the dependencies
2. Create a .env file with the configuration (see the wiki).
3. Run `yarn start` to start the server.