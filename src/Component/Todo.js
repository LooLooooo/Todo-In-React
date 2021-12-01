import React, { useContext, useEffect, useReducer } from "react";
import useInput from '../Hook/useInput';
import produce from 'immer';

function TodoPaint({TodoList}){

    const dispatch = useContext(UserDispath)

    useEffect( () => {
        localStorage.setItem("TodoList",JSON.stringify(TodoList))
    }, [TodoList])

    const fontChange = (e) => {

        const span = e.target
        const id = e.target.parentElement.children[0].value
        const complete = e.target.parentElement.children[1]
        
        if(span.style.color === ""){
            span.style.color = "darkgray"
            complete.value = true
        }else{
            span.style.color = ""
            complete.value = false
        }
        
        dispatch({
            type : 'complete',
            id
        })

    }
    
    const deleteTodo = (e) => {
        const id = e.target.parentElement.children[0].value
        dispatch({
            type : 'delete',
            id
        })
    }
    
    return (
        <div>
            {TodoList.map( (todos) => ( 
            <div>
                <input type="hidden" value={todos.id} />
                <input type="hidden" value={todos.complete} />
                <span onClick={fontChange}>{todos.text}</span>
                <button onClick={deleteTodo}>삭제</button>
            </div>  
            ))}
        </div>
    )
}

function Todo(){

    const localData = localStorage.getItem('TodoList') ?  
        JSON.parse(localStorage.getItem('TodoList')) : []

    const [TodoList, dispatch, handleToDoSubmit] = useInput(localData)

    const TodoInputStyle = {
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        backgroundColor: "unset",
        width: "500px",
        height: "60px"
    }
    
    useEffect( () => {
        localStorage.setItem("TodoList",JSON.stringify(TodoList))
    }, [TodoList])
    
    return(
        <UserDispath.Provider value={dispatch}>        
        <div style={{textAlign : "center"}}>
            <form onSubmit={handleToDoSubmit}>
                <input
                 type="text"
                 style={TodoInputStyle} 
                 placeholder="Write a To Do and Press Enter" />
            </form>
            <TodoPaint TodoList={TodoList} key={TodoList.id} />
        </div>
    </UserDispath.Provider>
    )
}

export const UserDispath = React.createContext(null)
export default Todo