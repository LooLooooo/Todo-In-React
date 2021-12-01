import React, { useReducer } from "react";
import produce from 'immer';


function reducer(state, action){
    switch(action.type){
        case 'add' :
            return produce(state, draft => {
               draft.push(action.TodoList)
            })
        case 'complete' :   
            return state.map( todo => 
                todo.id === parseInt(action.id) ? { ...todo, complete : !todo.complete } : todo 
            )
        case 'delete' :
            return state.filter( todo => todo.id !== parseInt(action.id))
        default : 
            return state
    }
}

function useInput(initial){

    const [TodoList, dispatch] = useReducer(reducer, initial)

    const handleToDoSubmit = (e) => {
        
        e.preventDefault();
        
        const target = e.target.children[0]
        
        dispatch({
            type : 'add',
            TodoList : {
                text : target.value,
                id : Date.now(),
                complete : false
            }    
        },[TodoList])

        target.value = ''
        
    }

    return [TodoList, dispatch, handleToDoSubmit]
}

export default useInput