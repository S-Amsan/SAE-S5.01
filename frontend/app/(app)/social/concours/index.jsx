import React from "react";

import EventPage from "../_components/EventPage";

import {
    fetchLatestCompetition,
    fetchFollowingCompetitions,
    fetchCountOfParticipantsForCompetition,
    fetchCountOfQualifiedParticipantsForCompetition,
} from "../../../../services/competitions.api"
import {fetchUserPointsForCompetition} from "../../../../services/user.api";

export default function Concours() {
    const [concours_DATA, setConcoursData] = React.useState(null);
    const [user_event_DATA, setUserEventData] = React.useState(null);

    React.useEffect(() => {
        fetchLatestCompetition().then(setConcoursData);
        fetchFollowingCompetitions().then(setUserEventData);
    }, []);

    React.useEffect(() => {
        if (!concours_DATA?.id) return;

        Promise.all([
            fetchCountOfParticipantsForCompetition(concours_DATA.id),
            fetchCountOfQualifiedParticipantsForCompetition(concours_DATA.id),
            fetchUserPointsForCompetition(concours_DATA.id)
        ]).then(([participants, qualified, collectedPoints]) => {
            setConcoursData(prev => ({
                ...prev,
                participants,
                qualified,
                collectedPoints
            }));
        });

    }, [concours_DATA?.id]);

    React.useEffect(() => {
        if (!user_event_DATA?.length) return;

        const hasStats = user_event_DATA.every(
            c => c.participants !== undefined
        );
        if (hasStats) return;

        Promise.all(
            user_event_DATA.map(async (concours) => {
                const [participants, qualified, collectedPoints] = await Promise.all([
                    fetchCountOfParticipantsForCompetition(concours.id),
                    fetchCountOfQualifiedParticipantsForCompetition(concours.id),
                    fetchUserPointsForCompetition(concours.id)
                ]);

                return {
                    ...concours,
                    participants,
                    qualified,
                    recompense : null,
                    collectedPoints
                };
            })
        ).then(setUserEventData);

    }, [user_event_DATA]);


    return <EventPage type={"concours"} event_DATA={concours_DATA} user_event_DATA={user_event_DATA}/>
};
