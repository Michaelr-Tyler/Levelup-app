import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"


export const GameForm = props => {
    const { createGame, getGameTypes, gameTypes, getGame, updateGame} = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])
    useEffect(() => {

        if("gameId" in props.match.params) {
            getGame(props.match.params.gameId).then((game) => {
                setCurrentGame({
                    skillLevel: game.skill_level,
                    numberOfPlayers: game.number_of_players,
                    title: game.title,
                    gameTypeId: game.gametype_id
                })
            })
        }
    }, [props.match.params.gameId])
    /*
        Update the `currentGame` state variable every time
        the state of one of the input fields changes.
    */
    const handleControlledInputChange = (event) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players</label>
                    <input type="integer" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Game type:</label>
                    <select name="gameTypeId" className="form-control"
                            value={currentGame.gameTypeId}
                            onChange={handleControlledInputChange}>
                        <option  value="0">Select type</option>
                        {gameTypes.map(gt =>(
                        <option key={gt.id} value={gt.id}>
                            {gt.label}
                        </option>))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Game difficulty:</label>
                    <select name="skillLevel" className="form-control"
                            value={currentGame.skillLevel}
                            onChange={handleControlledInputChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </fieldset>

            {
                ("gameId" in props.match.params)
                    ? <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()

                        const game = {
                            id: parseInt(props.match.params.gameId),
                            title: currentGame.title,
                            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                            skillLevel: parseInt(currentGame.skillLevel),
                            gameTypeId: parseInt(currentGame.gameTypeId),
                            gamer: localStorage.getItem("user_id")
                        }

                        // Send POST request to your API
                        updateGame(game).then(props.history.push("/"))
                    }}
                    className="btn-2 btn-primary">Edit</button>
                    : <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()

                        const game = {
                            title: currentGame.title,
                            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                            skillLevel: parseInt(currentGame.skillLevel),
                            gameTypeId: parseInt(currentGame.gameTypeId),
                            gamer: localStorage.getItem("user_id")
                        }

                        // Send POST request to your API
                        createGame(game)
                    }}
                    className="btn-2 btn-primary">Create</button>
            }
        </form>
    )
}