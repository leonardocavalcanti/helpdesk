import React, { useReducer, createContext, useContext, useMemo } from 'react'

const ActionsContext = createContext()
const StoreContext = createContext()

export const useActions = () => useContext(ActionsContext)
export const useStore = () => useContext(StoreContext)

export const StoreProvider = props => {
    const initialState = props.rootReducer(props.initialValue, { type: '__INIT__' })
    const [state, dispatch] = useReducer(props.rootReducer, initialState)
    const actions = useMemo(() => props.rootActions(dispatch), [props])
    const value = { state, dispatch }

    return (
        <StoreContext.Provider value={value}>
            <ActionsContext.Provider value={actions}>
                {props.children}
            </ActionsContext.Provider>
        </StoreContext.Provider>
    )
}