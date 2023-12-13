const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const question = (quest) => {
	return new Promise((resolve) => {
		rl.question(quest, (answer) => {
			resolve(answer);
		});
	});
};

const calculateRank = (scores, game_scores) => {
	let ranks = [];
	let unique_sorted_scores = [...new Set(scores)].sort((a, b) => b - a);

	for (let score of game_scores) {
		let count = 1;
		for (let s of unique_sorted_scores) if (score < s) count++;

		ranks.push(count);
	}

	return ranks;
};

// ====== sample input
// 7
// 100 100 50 40 40 20 10
// 4
// 5 25 50 120

// ====== expected output
// 6 4 2 1
async function main() {
	let players = 0,
		scores = [],
		games = 0,
		game_scores = [];

	console.log('====== Pemain ======');
	const inp_players = await question('Jumlah pemain: ');
	players = parseInt(inp_players);

	for (let i = 1; i <= players; i++) {
		let inp_player_score = await question(`Skor ke-${i}: `);
		scores.push(parseInt(inp_player_score));
	}

	console.log('\n====== Permainan ======');
	const inp_games = await question('Jumlah permainan yang diikuti: ');
	games = parseInt(inp_games);

	for (let i = 1; i <= games; i++) {
		let inp_games_score = await question(`Skor permainan ke-${i}: `);
		game_scores.push(parseInt(inp_games_score));
	}

	console.log('\n====== Ranking Permainan ======');
	const result = calculateRank(scores, game_scores);
	console.log(result.join(' '));

	rl.close();
}

main();
