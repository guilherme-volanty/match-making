const express = require('express');
const router = express.Router();

const MatchController = require("../Controllers/match-controller");

router.get("/match/all", MatchController.getAllMatchs);
router.post("/match", MatchController.postNewMatch)

module.exports = router; 