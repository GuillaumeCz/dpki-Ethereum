const ipfs = require('../ipfs');

describe('IPFS', () => {
    test('...should save a file to ipfs', () => {
        const filePath = './cli/assets/id_rsa.pub';
        const fileId = 'QmWjkVAsR7fMnZYtueB2CevFA6GCHHLY3FdiSdCYAL85gT';
        const expectedValue = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCuBocNLNg5XEngN63wkEd/1yLfrBMCqI1G23wugdh8xGOaTW6aHFBYfhtDmeQsydEVxvsfCtj1y2T49uJkmQw1qd4mkf3v6yS7wVQ0qYSN6mvjyPV6JrqYqnFXGktteLYI65Ffvyvn4BQ6Z58JpEAZyRqBU39muCSQbSyAl8pPFZYSzbuYruA2toIBcvRHHJYlYW9C2oRyZWXePQ+EWa6ahGZ6aj0REVAKEt02EjuWEGnwAXYxs+WyUSNvOIBpMnqKSNayn6prYcT28BbKZcV5mdvoiPSInxYW4C57paEmhluTkbYnsWJB410Cr6plhalvUEPBpO3fbEJtqr2IOpcZ2SeXjNqlP8UgeSGVN1ReR2/GX7/pEo8/ygdiUcwLvzutyRz2rXvLtTdrWuxoWnz+fvAtaKRnmqo7ApVzsp6nVE35kvTtEwLIaX72c9r5FSn80eW+U9WAKBdLBTY7bucJK6BciG2Q471OPaJyXXe6/2veJ1tUNV6JMQQRE6EZU/aJ+0LSd/lDtDd0TDgO9JA3sE/96O54N0wquFnVqBpIYckkAvlRsKPRczz8xGL/N3isxMy4BNh1p1iPv0ewTUgVaj545XC8nv6BfYkUTCpLTEK24Dex5qol8zGDB+9mAjvjDwlCEcZngR0NpROBGgzKKmRZlI672Ijlnme/hgLXVf==";
        
        ipfs.saveFile(filePath)
            .then(() => ipfs.cat(fileId))
            .then(res => {
                expect((res).toBe(expectedValue));
            });
    });
});
