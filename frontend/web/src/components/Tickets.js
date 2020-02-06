import React, { useEffect, useState } from "react";
import { useActions, useStore } from "../store";
import { useAuth0 } from "../react-auth0-spa";
import * as ticketsService from "../services/TicketsService";

const Tickets = () => {
    const { state } = useStore();
    const { ticketsActions } = useActions();
    const { getTokenSilently } = useAuth0();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getTickets() {
            setLoading(true);

            const token = await getTokenSilently();

            ticketsService.list(token).then(r => {
                ticketsActions.set(r.data);

                setLoading(false);
            });
        }

        getTickets();

    }, []);

    return (
        state.tickets.items && state.tickets.items.map((item, i) => (
            <div>{item.title}</div>
        ))
    );
};

export default Tickets;