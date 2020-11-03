interface boxState {
    busy: boolean,
    bomb: boolean,
    alignQueue: string[]
}

let box: boxState = {
    busy: false,
    bomb: false,
    alignQueue: []
}

var board = [
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}
]

var oppositeBoard = [
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box},
    {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}, {...box}
]

var game = {
    gameID: null,
    playerID: null
}


export { 
    board,
    box as defaultBox, 
    game as gameSettings,
    oppositeBoard 
}
