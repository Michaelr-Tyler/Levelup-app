import React, { useState } from "react"

export const EventContext = React.createContext()

export const EventProvider = (props) => {
    const [ events, setEvents ] = useState([])

    const getEvents = () => {
        return fetch("http://localhost:8000/events", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setEvents)
    }

    const createEvent = (event) => {
        return fetch("", {
            method:'POST',
            headers: {
                "Content-type": "application/Json",
                "Autherization" : `Token ${localStorage.getItem('lu_token')}`
            },
            body: JSON.stringify(event)

         })
         .then(res => res.json())
         .then(getEvents)
    }
    

    return (
        <EventContext.Provider value={{ events, getEvents, createEvent }} >
            { props.children }
        </EventContext.Provider>
    )
}