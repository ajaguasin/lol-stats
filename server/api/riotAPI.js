const express = require("express");
const router = express.Router();
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
  getSummonerByName(summonerName).then(res => console.log(res));
});

async function getSummonerByName(summonerName) {
  const summoner = await kayn.Summoner.by.name(summonerName);
  return summoner;
}

async function getMatchListByAccount(accountId) {}

module.exports = router;
