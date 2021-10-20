console.log("boom");

/// import TwitterApi from "twitter-api-v2";

require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");
let RiTa = require("rita");
var fs = require("fs");
let counter = 0;

//divide to sentences
var data = fs.readFileSync("Anna.txt", "utf8");
let sentences = RiTa.sentences(data.toString());

let annaSentences = [];
// regular exp to find sen with Anna

sentences.forEach((sentence) => {
  const regex = /Anna/g;
  const found = sentence.match(regex);

  if (found) {
    annaSentences.push(sentence);
    //console.log("Pushed");
  }
});

//keys
const client = new TwitterApi({
  appKey: process.env.appKey,
  appSecret: process.env.appSecret,
  accessToken: process.env.accessToken,
  accessSecret: process.env.accessSecret,
});

// myTweet();

setInterval(myTweet, 50000);

async function myTweet() {
  const response = client.v1
    .tweet(annaSentences[counter])
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(response);
  counter++;
}
