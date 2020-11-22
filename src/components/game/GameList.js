import React, { useContext, useEffect } from "react"
import { EventContext } from "../event/EventProvider.js"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames, updateGame } = useContext(GameContext)
    const { events, getEvents } = useContext(EventContext)

    useEffect(() => {
        getGames()
        getEvents()
    }, [])

    return (
    <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                props.history.push({ pathname: "/games/new" })
            }}
        >Register New Game</button>

        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <button className="btn btn-3"
                                    onClick={() => props.history.push(`/games/${game.id}/edit`)}
                                    >Edit</button>
                        <div className="game__title">{game.title}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <h4>Upcoming Events:</h4>
                        {
                            events.filter(event => event.game.id === game.id)
                            .map(event => {
                                return <div key={`gameEvent--${event.id}`}>
                                    {event.day} @ {event.time}
                                </div>
                            })
                        }
                    </section>
                })
            }
        </article>
        </>
    )
}