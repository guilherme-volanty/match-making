const express = require('express');
const router = express.Router();

const MatchController = require("../Controllers/match-controller");

router.get("/match/all", MatchController.getAllMatchs);
router.get("/match/:id", MatchController.getMatchById);
router.post("/match", MatchController.postNewMatch)
router.delete("/match/delete/:id", MatchController.deleteMatchById);
router.put("/match/update/:id", MatchController.updateMatchById);

module.exports = router; 