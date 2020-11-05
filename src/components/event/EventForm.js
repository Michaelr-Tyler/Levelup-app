import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "../game/GameProvider"
import { EventContext } from "./EventProvider"


export const EventForm = props => {
    const {games, getGames} = useContext(GameContext)
    const {createEvent} = useContext(EventContext)
    const [currentEvent, setEvent] = useState({
        gameId: 0,
        day:"",
        time:"",
        location: ""
    })
    
    useEffect(() => {
        getGames()// Get all existing games from API
    }, [])

    const handleControlledInputChange = (event) => {
        const newEventState = Object.assign({}, currentEvent)
        newEventState[event.target.name] = event.target.value
        setEvent(newEventState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={currentEvent.gameId}
                        onChange={handleControlledInputChange}
                        >
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                            <option value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="day">Date: </label>
                   <input type="date" name="day" required autoFocus className="form-control" 
                   value={currentEvent.day}
                   onChange={handleControlledInputChange}
                   />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="Time">Time: </label>
                   <input type="time" name="time" required autoFocus className="form-control"
                   value={currentEvent.time} 
                   onChange={handleControlledInputChange}
                   />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="location">Location: </label>
                   <input type="text" name="location" required autoFocus className="form-control"
                   value={currentEvent.location} 
                   onChange={handleControlledInputChange}
                   />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    const event = {
                        gameId: parseInt(currentEvent.gameId),
                        day: currentEvent.day,
                        time: currentEvent.time,
                        location: currentEvent.location,
                        gamer: localStorage.getItem("user_id")
                        
                    }
                    createEvent(event)
                }}
                className="btn-2 btn-primary">Create Event</button>
        </form>
    )
}