import React, { useEffect, useState } from "react";



function TodoPaint(){
    
    const savedToDos = localStorage.getItem("todolist")
    const parsedToDos = JSON.parse(savedToDos)
    
    return (
        <div>
            {parsedToDos.map( todos => ( 
                <div>
                <span>{todos.text}</span>
                <button>삭제</button>
            </div>  
            ))}
        </div>
    )
}

function Todo(){
    
    const [input, setInput] = useState({
        text: '',
        complete : ''
    })
    const [TodoList, SetTodoList] = useState([])
    
    const InputStyle = {
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        backgroundColor: "unset",
        width: "500px",
        height: "60px"
    }
    
    useEffect( () => {
        console.log(TodoList)
        localStorage.setItem('todolist', JSON.stringify(TodoList))
    }, [TodoList])


    const handleToDoSubmit = (e) => {
        
        e.preventDefault();
        

        const taget = e.target.children[0]
        
        const {text, complete} = input 

        const todo = {
            text,
            id : Date.now(),
            complete
        }
        
        console.log(todo)

        SetTodoList([...TodoList, todo])

        taget.value = ''

        setInput({
            text : '',
            complete : false
        })

    }

    function saveTodoList(){
        localStorage.setItem('todolist', JSON.stringify(TodoList))
    }

    const handleOnChange = (e) => {
        const input = e.target.value

        setInput({
            text : input,
            complete : false
        })

    }

    return(
        <div style={{textAlign : "center"}}>
            <form onSubmit={handleToDoSubmit}>
                <input
                 onChange={handleOnChange}
                 type="text"
                 style={InputStyle} 
                 placeholder="Write a To Do and Press Enter" />
            </form>
            <TodoPaint/>
        </div>
    )
}

export default Todo