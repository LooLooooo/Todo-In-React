import React, { useState } from 'react';


function Clock(){
    
    const [tick, setTick] = useState('')

    function CurrnetClock() {
        const date = new Date()

        const hours = String(date.getHours()).padStart(2,"0")
        const minutes = String(date.getMinutes()).padStart(2,"0")
        const sec = String(date.getSeconds()).padStart(2,"0")

        const currentClock = `${hours} : ${minutes} : ${sec}`

        setTick(currentClock)

    }

    setInterval(CurrnetClock, 1000)

    const ClockStyle = {
        fontSize : "150px",
        textAlign : "center"
    }

    return(
        <div style={ClockStyle}>
            {tick}
        </div>
    )
}

export default Clock