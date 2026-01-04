import React from "react";

import EventPage from "../_components/EventPage";
import {fetchUserPointsForEvent} from "../../../../services/user.api";
import {
    fetchCountOfParticipantsForEvent, fetchCountOfQualifiedParticipantsForEvent,
    fetchFollowingEvents,
    fetchLatestEvent
} from "../../../../services/events.api";

export default function Evenements() {

    const [evenements_DATA, setEvenementsData] = React.useState(null);
    const [user_event_DATA, setUserEventData] = React.useState(null);

    React.useEffect(() => {
        fetchLatestEvent().then(setEvenementsData);
        fetchFollowingEvents().then(setUserEventData);
    }, []);

    React.useEffect(() => {
        if (!evenements_DATA?.id) return;

        Promise.all([
            fetchCountOfParticipantsForEvent(evenements_DATA.id),
            fetchCountOfQualifiedParticipantsForEvent(evenements_DATA.id),
            fetchUserPointsForEvent(evenements_DATA.id)
        ]).then(([participants, qualified, collectedPoints]) => {
            setEvenementsData(prev => ({
                ...prev,
                participants,
                qualified,
                collectedPoints
            }));
        });

    }, [evenements_DATA?.id]);

    React.useEffect(() => {
        if (!user_event_DATA?.length) return;

        const hasStats = user_event_DATA.every(
            c => c.participants !== undefined
        );
        if (hasStats) return;

        Promise.all(
            user_event_DATA.map(async (evenement) => {
                const [participants, qualified, collectedPoints] = await Promise.all([
                    fetchCountOfParticipantsForEvent(evenement.id),
                    fetchCountOfQualifiedParticipantsForEvent(evenement.id),
                    fetchUserPointsForEvent(evenement.id)
                ]);

                return {
                    ...evenement,
                    participants,
                    qualified,
                    recompense : null,
                    collectedPoints
                };
            })
        ).then(setUserEventData);

    }, [user_event_DATA]);
    return <EventPage type={"evenements"} event_DATA={evenements_DATA} user_event_DATA={user_event_DATA}/>
};
