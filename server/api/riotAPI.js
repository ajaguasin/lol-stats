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

const BASE_URL = "https://na1.api.riotgames.com";
const SUMMONER_BY_NAME_URL = "/lol/summoner/v4/summoners/by-name/";
const MATCH_LIST_URL = "/lol/match/v4/matchlists/by-account/";

router.get("/", async (req, res, next) => {
  const { summonerName } = req.query;

  const user = await getSummonerByName(summonerName);
  //   console.log(user.accountId);

  const matchList = await getMatchListByAccount(user.accountId);
  //   console.log(matchList);

  const matchList_20 = get20Matches(matchList);
  //   console.log(matchList_20);

  const match = await getMyMatchDetails(matchList_20[0], summonerName);
});

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
  const myParticipantId = match.participantIdentities.filter(participants => {
    return participants.player.summonerName === summonerName;
  });

  const myDetails = match.participants.filter(participants => {
    return participants.participantId === myParticipantId[0].participantId;
  });

  console.log(myDetails[0]);
}

function get20Matches(matchList) {
  let matches = [];

  for (let i = 0; i < 10; i++) {
    matches.push(matchList.matches[i].gameId);
  }
  return matches;
}

module.exports = router;
