import { TICKETS_SET, TICKETS_SELECT } from './actions'

const initialState = {
    items: [],
    item: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TICKETS_SET:
            return { ...state, ...{ items: action.payload } }
        case TICKETS_SELECT:
            return { ...state, ...{ item: action.payload } }
        default:
            return state
    }
}