const StoragePk = artifacts.require('./StoragePk.sol');
const Dpki = artifacts.require('./Dpki.sol');

contract('StoragePk', (accounts) => {
	const currentUser = accounts[0];
	const key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCuBocNLNg5XEngN63wkEd/1yLfrBMCqI1G23wugdh8xGOaTW6aHFBYfhtDmeQsydEVxvsfCtj1y2T49uJkmQw1qd4mkf3v6yS7wVQ0qYSN6mvjyPV6JrqYqnFXGktteLYI65Ffvyvn4BQ6Z58JpEAZyRqBU39muCSQbSyAl8pPFZYSzbuYruA2toIBcvRHHJYlYW9C2oRyZWXePQ+EWa6ahGZ6aj0REVAKEt02EjuWEGnwAXYxs+WyUSNvOIBpMnqKSNayn6prYcT28BbKZcV5mdvoiPSInxYW4C57paEmhluTkbYnsWJB410Cr6plhalvUEPBpO3fbEJtqr2IOpcZ2SeXjNqlP8UgeSGVN1ReR2/GX7/pEo8/ygdiUcwLvzutyRz2rXvLtTdrWuxoWnz+fvAtaKRnmqo7ApVzsp6nVE35kvTtEwLIaX72c9r5FSn80eW+U9WAKBdLBTY7bucJK6BciG2Q471OPaJyXXe6/2veJ1tUNV6JMQQRE6EZU/aJ+0LSd/lDtDd0TDgO9JA3sE/96O54N0wquFnVqBpIYckkAvlRsKPRczz8xGL/N3isxMy4BNh1p1iPv0ewTUgVaj545XC8nv6BfYkUTCpLTEK24Dex5qol8zGDB+9mAjvjDwlCEcZngR0NpRmBGgzKKmRZlI672Ijlnme/hgLXVf==";
	const key_2 = "ssh-rsa 0000B3NzaC1yc2EAAAADAQABAAACAQCuBocNLNg5XEngN63wkEd/1yLfrBMCqI1G23wugdh8xGOaTW6aHFBYfhtDmeQsydEVxvsfCtj1y2T49uJkmQw1qd4mkf3v6yS7wVQ0qYSN6mvjyPV6JrqYqnFXGktteLYI65Ffvyvn4BQ6Z58JpEAZyRqBU39muCSQbSyAl8pPFZYSzbuYruA2toIBcvRHHJYlYW9C2oRyZWXePQ+EWa6ahGZ6aj0REVAKEt02EjuWEGnwAXYxs+WyUSNvOIBpMnqKSNayn6prYcT28BbKZcV5mdvoiPSInxYW4C57paEmhluTkbYnsWJB410Cr6plhalvUEPBpO3fbEJtqr2IOpcZ2SeXjNqlP8UgeSGVN1ReR2/GX7/pEo8/ygdiUcwLvzutyRz2rXvLtTdrWuxoWnz+fvAtaKRnmqo7ApVzsp6nVE35kvTtEwLIaX72c9r5FSn80eW+U9WAKBdLBTY7bucJK6BciG2Q471OPaJyXXe6/2veJ1tUNV6JMQQRE6EZU/aJ+0LSd/lDtDd0TDgO9JA3sE/96O54N0wquFnVqBpIYckkAvlRsKPRczz8xGL/N3isxMy4BNh1p1iPv0ewTUgVaj545XC8nv6BfYkUTCpLTEK24Dex5qol8zGDB+9mAjvjDwlCEcZngR0NpRmBGgzKKmRZlI672Ijlnme/hgLXVf==";
	const name = "Guizy";
	const name_2 = "Zygui";

	it('...should associate a name to a key', () => {
		let storagePkInstance;
		return StoragePk.deployed().then(instance => {
			storagePkInstance = instance;
			return Promise.all([
				storagePkInstance.addRecord(name, key, { from: currentUser }), 
				storagePkInstance.addRecord(name_2, key_2, { from: currentUser })
			]);
		}).then(() => Promise.all([
			storagePkInstance.getRecordKey(name),
			storagePkInstance.getRecordKey(name_2)
		])).then(res => {
			assert.equal(res[0], key, '(0) The keys are not similar');
			assert.equal(res[1], key_2, '(1) The keys are not similar');
		});
	});

	it('...should register a key, calling Dpki contract', () => {
		let storagePkInstance;
		return Dpki.deployed().then(instance => instance.registerKey(key))
		.then(() => StoragePk.deployed())
		.then(instance => {
			storagePkInstance = instance;
			return storagePkInstance.queryAndAddRecord(name, currentUser, { from: currentUser }) })
		.then(() => storagePkInstance.getRecordKey(name))
		.then(res => {
			assert.equal(res, key, 'The keys arent similar');
		});
	});
});
