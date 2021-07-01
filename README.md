# Helios
## Need for Speed: World server emulator

![Deploy](https://github.com/JaspervRijbroek/helios/actions/workflows/build.yml/badge.svg)

Helios is a Need for Speed: World server emulator written in node.  
As the game itself has been abandoned by the developer/ maintainer it is more accepted
to host your own server.

## Roadmap
Here is a basic layout for the upcoming versions.
Feature and bugfix versions will nog be shown in here and will be added when needed.

v1.0.0:  
This version will include hosted single-player and basic chat.

v2.0.0:
This version will include freeroam mulitiplayer

v3.0.0:
This version will include race multiplayer

## Running your own
To start your own helios server you can run the following commands.
Keep in mind that the migrations will have to be ran manually.

System requirements:
- Raspberry PI
- MySQL 5.7 or later
- NodeJS 14 or later

Installation steps
1. Clone this repository
2. Install the dependencies: `yarn` or `npm i`
3. Create a `.env` file with the required config (see the wiki).
4. Run `yarn start` or `npm run start` to start the server
