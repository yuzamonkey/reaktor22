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

const getTime = (time) => {
    console.log("TIME", time)
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
}

const GameInfo = ({ game }) => {
    const time = getTime(game.time)
    return (
        <div className="game-info-container">
            <PlayerInfo
                name={game.playerA.name}
                played={game.type === "GAME_RESULT" ? game.playerA.played : null}
            />
            <div className="game-info-middle-container">
                <h4>VS</h4>
                <p>Game started at {time}</p>
                {game.type === "GAME_BEGIN" && <p><b>Waiting for players to play...</b></p>}
            </div>
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
        return ""
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
        return "Not a valid move"
    }

}



export default GameInfo