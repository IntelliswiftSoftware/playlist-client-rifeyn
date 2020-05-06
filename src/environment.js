const{
    Environment,
    Network,
    RecordSource,
    Store
} = require('relay-runtime')

const store = new Store(new RecordSource())

const network = Network.create((operation, variable) => {
    return fetch('http://localhost:3000/songPlaylist', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            query: operation.text,
            variable,
        }),
    }).then(response => {
        return response.json()
    })
})

const environment = new Environment({
    network,
    store,
})

export default environment