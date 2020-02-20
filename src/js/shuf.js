
function parseWinner(event) {
    return {
        winner: event['topics'][1].replace('0x000000000000000000000000', ''),
        amount: parseInt(event['data']),
        tx: event['transactionHash']
    }
}

module.exports.getLastRewards = function (callback) {
        $.ajax(process.env.ETH_NODE, {
            data : JSON.stringify({
                'jsonrpc': '2.0',
                'method': 'eth_getLogs',
                'params': [
                    {
                        'address': '0x3a9fff453d50d4ac52a6890647b823379ba36b9e',
                        'fromBlock': '0x912ce3',
                        'toBlock': 'latest',
                        'topics': ['0x9c2270628a9b29d30ae96b6c4c14ed646ee134febdce38a5b77f2bde9cea2e20']
                    }
                ],
                'id': 1
            }),
            contentType : 'application/json',
            type : 'POST'
        }).done(function(data) { 
            callback(data['result'].slice(-6).reverse().map((a) => parseWinner(a)));
        });
    }
