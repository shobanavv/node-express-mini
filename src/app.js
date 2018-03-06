const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;
const PORT = 3000;
let wordArr = [];
let wordSoFar = [];
const finalWord =[];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};
const word = readWords()[100];

server.get("/", (req, res) => {
    
    console.log(finalWord);
    let currentWord =word.split(' ');
    currentWord = currentWord.map(l => {

    })
    res.status(200);
    res.send(finalWord);
});

server.post("/guess", (req, res) => {
    // if(wordArr.length === 0) {
    //     finalWord.forEach(l => {
    //        wordSoFar.push('-');
    //     });
    // }
    // console.log(wordSoFar);
    // res.status(200);
    // res.send(wordSoFar);

    if(!req.body.letter) {
        res.status(422);
        res.send({ error: "User must provide a letter"});
    } else if (req.body.letter > 1) {
        res.status(422);
        res.send({ error: "User must provide letter only"});
    } else if (req.body.letter > 1) {
        res.status(422);
        res.send({ error: "User must provide letter only"});
    } else {
        guessedLetters[req.body.letter] = true;
        res.status(200);
        res.send();
    }
});



server.listen(PORT, err => {
    if(err) {
        console.log("There was an error");
    } else {
        console.log(`Server is listening on PORT number ${PORT}`);
    }
});
