const questionModel = require('../model/question');
const gamesModel = require('../model/games');
const gamelogsModel = require('../model/gamelogs');


//get for all questions
exports.question = async (req, res) => {
    try {
        const data = await questionModel.find();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


//get random 15 questions from db
exports.team_a = async (req, res) => {

    try {
        const data = await questionModel.find({ language: req.params.language }, { correct_option: 0, level: 0 }).limit(50);

        const shuffled = data.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, 15);

        res.status(200).json(selectedQuestions);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


//get random 15 questions from db
exports.team_b = async (req, res) => {

    try {
        const data = await questionModel.find({ language: req.params.language }, { correct_option: 0, level: 0 }).limit(50);

        const shuffled = data.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, 15);

        res.status(200).json(selectedQuestions);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


//Insert the values in db when click the start button
exports.game = async (req, res) => {
    try {
        const now = new Date();

        const details = new gamesModel({
            "teama_playername": req.body.teama_playername,
            "teamb_playername": req.body.teamb_playername,
            "language": req.body.language,
            "created_at": now,
            "game_id": req.body.game_id,
            "updated_at": now,
            "deleted_at": null
        });

        const savedData = await details.save();
        res.status(200).json(savedData);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


//Insert the values in db when user choses next question
exports.game_log = async (req, res) => {
    try {
        const now = new Date();

        const details = new gamelogsModel({
            "game_id": req.body.game_id,
            "team": req.body.team,
            "question_id": req.body.question_id,
            "user_option": req.body.user_option,
            "is_correct": req.body.is_correct,
            "created_at": now,
            "updated_at": now,
        });

        const savedData = await details.save();
        res.status(200).json(savedData);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


//validating the user option and correct option
exports.validate = async (req, res) => {
    const user_answer = req.params.answer;

    try {
        const data = await questionModel.findById(req.params.id);
        const corrected = (user_answer == data.correct_option) ? true : false;
        res.status(200).json(corrected);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

};


//getting the result when result button clicked
exports.results = async (req, res) => {

    const { game_id } = req.params;

    try {
        const queryA = {
            team: 'a',
            game_id: game_id,
            is_correct: true
        };
        const optionsA = {
            sort: { is_correct: true },
            limit: 20
        };
        const teamA = await gamelogsModel.find(queryA, optionsA);


        const queryB = {
            team: 'b',
            game_id: game_id,
            is_correct: true
        };
        const optionsB = {
            sort: { is_correct: true },
            limit: 20
        };
        const teamB = await gamelogsModel.find(queryB, optionsB);

        let winner;
        if (teamA.length > teamB.length) {
            winner = "A";
        } else if (teamA.length < teamB.length) {
            winner = "B";
        }
        res.send(winner);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//leaderboard logic
exports.leader_board = async (req, res) => {
    try {
        const gameTable = await gamesModel.find({ game_id: req.params.game_id }, { teama_playername: 1, teamb_playername: 1 });

        const gamelogsTeamA = await gamelogsModel.countDocuments({ game_id: req.params.game_id, is_correct: "true", team: "a" });
        const gamelogsTeamB = await gamelogsModel.countDocuments({ game_id: req.params.game_id, is_correct: "true", team: "b" });

        const playerA = gameTable[0].teama_playername;
        const playerB = gameTable[0].teamb_playername;
        const response = [
            { s_no: 1, team: 'a', teamaplayer: playerA, points: gamelogsTeamA },
            { s_no: 2, team: 'b', teambplayer: playerB, points: gamelogsTeamB },
        ];
        // response.sort((a, b) => b.s_no - a.s_no);
        response.sort((a, b) => b.points - a.points);
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

};
