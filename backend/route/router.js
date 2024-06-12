const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();


router.get('/questions', controller.question);
router.get('/questions/team-a/:language', controller.team_a);
router.get('/questions/team-b/:language', controller.team_b);
router.post('/game', controller.game);
router.post('/game-log', controller.game_log);
router.get('/validate/:id/:answer', controller.validate);
router.get('/results/:game_id', controller.results);
router.get('/leader-board/:game_id', controller.leader_board);



module.exports = router;