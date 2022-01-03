import paper from '../../images/paper.png'
import rock from '../../images/rock.png'
import scissors from '../../images/scissors.png'
import { playerWonGame } from '../../logic/rps'


const GameInfo = ({ game }) => {

    const getTimeString = (time) => {
        const getNumber = (num) => {
            return num < 10 ? `0${num}` : num
        }
        return `${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()} ${getNumber(time.getHours())}:${getNumber(time.getMinutes())}:${getNumber(time.getSeconds())}`
    }

    const parseTime = (time) => {
        const date = new Date(time)
        return getTimeString(date)
    }
    return (
        <div className="game-info-container">
            <PlayerInfo
                name={game.playerA.name}
                played={game.type === "GAME_RESULT" ? game.playerA.played : null}
                won={playerWonGame(game.playerA.name, game)}
            />
            <div className="game-info-middle-container">
                <h4>VS</h4>
                <p>{game.type === "GAME_RESULT" ? parseTime(game.t) : "Waiting for players to play..."}</p>
            </div>
            <PlayerInfo
                name={game.playerB.name}
                played={game.type === "GAME_RESULT" ? game.playerB.played : null}
                won={playerWonGame(game.playerB.name, game)}
            />
        </div>
    )
}

const PlayerInfo = ({ name, played, won }) => {
    return (
        <div className={won ? "player-info-container won" : "player-info-container"}>
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