import React from "react"
import { Route } from "react-router-dom"
import { EventForm } from "./event/EventForm"
import { EventList } from "./event/EventList"
import { EventProvider } from "./event/EventProvider"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import { GameProvider } from "./game/GameProvider"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
            <EventProvider>
                <Route exact path="/" render = {props => <GameList {...props}/>} />
                <Route exact path="/games/new" render={props => <GameForm {...props} />} />
                <Route exact path="/events/new" render={props => <EventForm {...props} />} />
                <Route exact path="/events" render={props =><EventList {...props}/>}/>
            </EventProvider>
            </GameProvider>
        </main>
    </>
}
