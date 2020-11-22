import React from "react"
import { Route } from "react-router-dom"
import { EventForm } from "./event/EventForm"
import { EventList } from "./event/EventList"
import { EventProvider } from "./event/EventProvider"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import { GameProvider } from "./game/GameProvider"
import { Profile } from "./profiles/ProfileList"
import { ProfileProvider } from "./profiles/ProfileProvider"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
            <EventProvider>
            <ProfileProvider>
                <Route exact path="/" render = {props => <GameList {...props}/>} />
                <Route exact path="/games/new" render={props => <GameForm {...props} />} />
                <Route exact path="/events/new" render={props => <EventForm {...props} />} />
                <Route exact path="/events" render={props =><EventList {...props}/>}/>
                <Route exact path="/profile" render={props => <Profile {...props} />} />
            </ProfileProvider>
            </EventProvider>
            </GameProvider>
        </main>
    </>
}
