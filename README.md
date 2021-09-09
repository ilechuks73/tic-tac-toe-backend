# TIC TAC TOE GAME (BACKEND)

This is the backend code for a game of tic tac toe (you can view the frontend code [Here](https://github.com/ilechuks73/tic-tac-toe-frontend)


this is a basic websocket server that provides and controls the real time feature of the game

### FOR DEVELOPERS & COLLABORATORS:

clone the repository:
```
$ git clone https://github.com/ilechuks73/tic-tac-toe-backend
```
in the root of the project directory, initialize a new node project with npm

```
$ npm init
```

copy and paste this

```
{
  "name": "tic-tac-toe-game-backend",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "socket.io": "^4.0.0",
    "nodemon": "^2.0.7"
  }
}
```

in your newly created ```package.json``` file.

to install dependencies run
```
$ npm install
```
 
to start the server run 
```
$ npm start
```


