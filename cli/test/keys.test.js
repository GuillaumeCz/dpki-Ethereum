const keys = require('../keys');

test('...should get the ipfs address of the key of Bob', () => {
    const name = 'Bob';
    const expectedAddress = 'QmWjkVAsR7fMnZYtueB2CevFA6GCHHLY3FdiSdCYAL85gT';

    keys.keyAddrOf(name).then(res => {
        console.log(res)
        expect((res).toBe(expectedAddress));
    }).catch(err => {
        console.log(err)
    })

})
