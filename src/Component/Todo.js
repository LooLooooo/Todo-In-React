import React, { useEffect, useState } from "react";


function TodoPaint({TodoList, SetTodoList}){

    useEffect( () => {
        localStorage.setItem("TodoList",JSON.stringify(TodoList))
    }, [TodoList])

    const fontChange = (e) => {

        const span = e.target
        const id = e.target.parentElement.children[0]
        const complete = e.target.parentElement.children[1]
        
        if(span.style.color === ""){
            span.style.color = "darkgray"
            complete.value = true
        }else{
            span.style.color = ""
            complete.value = false
        }
        
        SetTodoList(TodoList.map( (todo) =>
            todo.id === parseInt(id.value) ? { ...todo, complete : complete.value } : todo
            )
        );

    }

    const deleteTodo = (e) => {
        const id = e.target.parentElement.children[0]
        SetTodoList(TodoList.filter(todo => todo.id !== parseInt(id.value)))
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

    const [TodoList, SetTodoList] = useState(() => {
        const localData = localStorage.getItem('TodoList')
        return localData ? JSON.parse(localData) : []
    })

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
        
        const taget = e.target.children[0]
        
        const todo = {
            text : taget.value,
            id : Date.now(),
            complete : false
        }
        
        SetTodoList([...TodoList, todo])
        
        taget.value = ''
        
    }

    return(
        <div style={{textAlign : "center"}}>
            <form onSubmit={handleToDoSubmit}>
                <input
                 type="text"
                 style={InputStyle} 
                 placeholder="Write a To Do and Press Enter" />
            </form>
            <TodoPaint TodoList={TodoList} SetTodoList={SetTodoList}/>
        </div>
    )
}

export default Todo