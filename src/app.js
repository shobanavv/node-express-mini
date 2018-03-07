const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;
const PORT = 3000;
let wordArr = [];
let wordSoFar = [];
let finalWord =[];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

    const words = readWords();
    const word = words[Math.floor(Math.random()*words.length)];
    console.log(word.split(''));
    wordArr = word.split('');
    finalWord = word.split('').map(l => {
        return '_';
    })
    console.log(finalWord);
    

server.get("/", (req, res) => {
    res.status(200);
    res.send(`Input any single letter like "letter":"l" ${finalWord}`);
    });    

server.post("/guess", (req, res) => {
    console.log(req.body.letter );
    if(!req.body.letter) {
        res.status(422);
        res.send({ error: "User must provide a letter"});
    } else if (req.body.letter > 1) {
        res.status(422);
        res.send({ error: "User must provide one letter only"});
    } 
    else if(wordSoFar.includes(req.body.letter)){
        res.status(200);
        res.send({ error: "Choose different letter"});
    }
    else {
        wordSoFar.push(req.body.letter);
    for(let i=0;i<=finalWord.length;i++){
            if(wordArr[i] === req.body.letter) {
                finalWord[i]=req.body.letter;
            }
        } 
    }
    res.status(200);
    res.send(finalWord);
     
});



server.listen(PORT, err => {
    if(err) {
        console.log("There was an error");
    } else {
        console.log(`Server is listening on PORT number ${PORT}`);
    }
});
