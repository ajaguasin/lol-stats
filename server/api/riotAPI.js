const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Kayn, REGIONS } = require("kayn");
const API_KEY = process.env.API_KEY;

const kayn = Kayn(API_KEY)({
  region: REGIONS.NORTH_AMERICA,
  locale: "en_US",
  debugOptions: {
    isEnabled: true,
    showKey: false
  },
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 3,
    delayBeforeRetry: 1000,
    burst: false,
    shouldExitOn403: false
  },
  cacheOptions: {
    cache: null,
    timeToLives: {
      useDefault: false,
      byGroup: {},
      byMethod: {}
    }
  }
});

router.get("/", async (req, res, next) => {
  const { summonerName } = req.query;

  const user = await getSummonerByName(summonerName);

  const matchList = await getMatchListByAccount(user.accountId);

  const matchList_10 = get10Matches(matchList);

  const myMatchDetails = await getMyMatchDetails(matchList_10[0], summonerName);
  res.send(myMatchDetails);
});

//helper functions and api calls

async function getSummonerByName(summonerName) {
  const summoner = await kayn.Summoner.by.name(summonerName);
  return summoner;
}

async function getMatchListByAccount(accountId) {
  const matchList = await kayn.MatchlistV4.by.accountID(accountId);
  return matchList;
}

async function getMyMatchDetails(matchID, summonerName) {
  const match = await kayn.Match.get(matchID);
  console.log(match);
  const myParticipantId = match.participantIdentities.filter(participants => {
    return participants.player.summonerName === summonerName;
  });

  const myDetails = match.participants.filter(participants => {
    return participants.participantId === myParticipantId[0].participantId;
  });

  return { mydetails: myDetails[0], match: match };
}

function get10Matches(matchList) {
  let matches = [];

  for (let i = 0; i < 10; i++) {
    matches.push(matchList.matches[i].gameId);
  }
  return matches;
}

module.exports = router;
