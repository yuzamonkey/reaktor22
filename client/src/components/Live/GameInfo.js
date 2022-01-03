// gameId: "f837ff63739d91b070a"
// playerB:
// name: "Tellervo Koskinen"
// played: "PAPER"

// playerB:
// name: "Kullervo Jokinen"
// played: "SCISSORS"

// type: "GAME_RESULT"
// type: "GAME_BEGIN"

import paper from '../../images/paper.png'
import rock from '../../images/rock.png'
import scissors from '../../images/scissors.png'

const getTimeString = (time) => {
    const getNumber = (num) => {
        return num < 10 ? `0${num}` : num
    }
    return `${time.getDate()}.${time.getMonth()+1}.${time.getFullYear()} ${getNumber(time.getHours())}:${getNumber(time.getMinutes())}:${getNumber(time.getSeconds())}`
}

const parseTime = (time) => {
    const date = new Date(time)
    return getTimeString(date)
}

const GameInfo = ({ game }) => {
    return (
        <div className="game-info-container">
            <PlayerInfo
                name={game.playerA.name}
                played={game.type === "GAME_RESULT" ? game.playerA.played : null}
            />
            <div className="game-info-middle-container">
                <h4>VS</h4>
                <p>{game.type === "GAME_RESULT" ? parseTime(game.t): "Waiting for players to play..."}</p>
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