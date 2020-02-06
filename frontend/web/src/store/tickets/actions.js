export const TICKETS_SET = 'TICKETS_SET'
export const TICKETS_SELECT = 'TICKETS_SELECT'

export const set = (data) => {
    return {
        type: TICKETS_SET,
        payload: data
    };
}

export const select = (ticket) => {
    return {
        type: TICKETS_SELECT,
        payload: ticket
    };
}