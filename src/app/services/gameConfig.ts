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

let boatsNumber = {
    1: 5,
    2: 3,
    3: 2,
    4: 2,
    5: 1
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
    boatsNumber,
    box as defaultBox, 
    game as gameSettings,
    oppositeBoard
}
