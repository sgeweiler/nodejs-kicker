for (let i = 0; i < players.length - 1; i++) {
    for (let j = i + 1; j <= players.length - 1; j++) {
        roundPairings.push({
            a: players[i],
            b: players[j],
        })
    }
}