const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const calculate = (n) => {
	const list = [1];

	for (let i = 1; i < n; i++) list.push(list[i - 1] + i);

	return list;
};

rl.question('Masukkan angka: ', (inp) => {
	const n = parseInt(inp);
	const result = calculate(n);

	console.log('output: ' + result.join('-'));

	rl.close();
});
