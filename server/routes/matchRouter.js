const express = require('express');
const router = express.Router();

const MatchController = require("../Controllers/match-controller");

router.get("/matches/match/all", MatchController.getAllMatchs);
router.get("/matches/match/:id", MatchController.getMatchById);
router.post("/matches/match", MatchController.postNewMatch)
router.delete("/matches/match/delete/:id", MatchController.deleteMatchById);
router.put("/matches/match/update/:id", MatchController.updateMatchById);

module.exports = router; 