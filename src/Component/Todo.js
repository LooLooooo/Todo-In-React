import React, { useEffect, useReducer, useState } from "react";


function TodoPaint({TodoList, dispatch}){

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


function reducer(state, action){
    switch(action.type){
        case 'add' :
            return [...state, action.TodoList]
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

function Todo(){

    const localData = localStorage.getItem('TodoList') ?  
        JSON.parse(localStorage.getItem('TodoList')) : []

    const [TodoList, dispatch] = useReducer(reducer, localData)

    const InputStyle = {
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

    
    function saveTodoList(){
        localStorage.setItem('todolist', JSON.stringify(TodoList))
    }
    
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


    return(
        <div style={{textAlign : "center"}}>
            <form onSubmit={handleToDoSubmit}>
                <input
                 type="text"
                 style={InputStyle} 
                 placeholder="Write a To Do and Press Enter" />
            </form>
            <TodoPaint TodoList={TodoList} key={TodoList.id} dispatch={dispatch}/>
        </div>
    )
}

export default Todo