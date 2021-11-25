import React from "react";




function Todo(){

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
        const todo = e.target.children[0]
        console.log(todo.value)
    }

    return(
        <div style={{textAlign : "center"}}>
            <form onSubmit={handleToDoSubmit}>
                <input type="text" style={InputStyle} placeholder="Write a To Do and Press Enter" />
            </form>

        </div>
    )
}

export default Todo