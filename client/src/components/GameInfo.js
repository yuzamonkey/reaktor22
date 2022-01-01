// gameId: "f837ff63739d91b070a"
// playerB:
// name: "Tellervo Koskinen"
// played: "PAPER"

// playerB:
// name: "Kullervo Jokinen"
// played: "SCISSORS"

// type: "GAME_RESULT"
// type: "GAME_BEGIN"

import paper from '../images/paper.png'
import rock from '../images/rock.png'
import scissors from '../images/scissors.png'

const GameInfo = ({ game }) => {
    console.log(game)
    return (
        <div className="game-info-container">
            <p>{game.time.getSeconds()}</p>
            <PlayerInfo
                name={game.playerA.name}
                played={game.type === "GAME_RESULT" ? game.playerA.played : null}
            />
            <PlayerInfo
                name={game.playerB.name}
                played={game.type === "GAME_RESULT" ? game.playerB.played : null}
            />
        </div>
    )
}

const PlayerInfo = ({ name, played }) => {
    return (
        <div>
            <h3>{name}</h3>
            <PlayedImage played={played} />
        </div>
    )
}

const PlayedImage = ({ played }) => {
    if (played === null) {
        return "Waiting to play..."
    }
    else if (played === "PAPER") {
        return <img className="played-img" src={paper} alt="paper" />
    }
    else if (played === "ROCK") {
        return <img className="played-img" src={rock} alt="rock" />
    }
    else if (played === "SCISSORS") {
        return <img className="played-img" src={scissors} alt="scissors" />
    } else {
        return "not a valid move"
    }

}



export default GameInfo