import React from "react";

import EventPage from "../_components/EventPage";

import { fetchLatestCompetition, fetchFollowingCompetitions } from "../../../../services/competitions.api"

export default function Concours() {
    const [concours_DATA, setConcoursData] = React.useState(null);
    const [user_event_DATA, setUserEventData] = React.useState(null);

    React.useEffect(() => {
        fetchLatestCompetition().then(setConcoursData); // le concours le plus récent et pas fini, Date_fin > date d'aujourd'hui

        fetchFollowingCompetitions().then(setUserEventData); // Tous les concours où l'utilisateur connecté s'est inscrit -> renvoyer null si pas de concours
    }, []);

    return <EventPage type={"concours"} event_DATA={concours_DATA} user_event_DATA={user_event_DATA}/>
};
