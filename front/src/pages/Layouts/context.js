import React from 'react'

const defaultStates = {
    curKind: '',

}

function reducer(state,action){
    switch(action.type){
        case "SET_KINDNAME":
            return {...state,curKind:action.value};
    }
}
const Context = React.createContext(null)
export {reducer,defaultStates,Context}