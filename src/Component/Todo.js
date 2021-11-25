import React, { useState } from "react";


function TodoPaint(){

    const savedToDos = localStorage.getItem("todolist")
    const parsedToDos = JSON.parse(savedToDos)

    return (
        <div>
            {parsedToDos.map(todos => (
            <div>
                <span>{todos.text}</span>
                <button>삭제</button>
            </div>  
            ))}
        </div>
    )
}


function Todo(){

    const [TodoList, SetTodoList] = useState([{
        text : '',
        id : '',
        result : ''
    }])

    const InputStyle = {
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        backgroundColor: "unset",
        width: "500px",
        height: "60px"
    }

    function handleToDoSubmit(e){
        e.preventDefault();
        const taget = e.target.children[0]
        
        const todo = {
            text : taget.value,
            id : Date.now(),
            result : "false"
        }

        SetTodoList([...TodoList, todo])

        console.log(TodoList)

        saveTodoList()

        taget.value = ''

    }

    function saveTodoList(){
        localStorage.setItem('todolist', JSON.stringify(TodoList))
    }

    return(
        <div style={{textAlign : "center"}}>
            <form onSubmit={handleToDoSubmit}>
                <input type="text" style={InputStyle} placeholder="Write a To Do and Press Enter" />
            </form>
            <TodoPaint/>
        </div>
    )
}

export default Todo