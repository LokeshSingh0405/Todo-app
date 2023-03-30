import moment from "moment";
import { useState } from "react";

function Date() {

    const [date , setDate] = useState("Fetching the Date")

    const fetchData = ()=>{
       const date: string =  moment().format('MMMM Do YYYY, h:mm:ss a')
       setDate(date)
    }
   
    setInterval(fetchData , 1000)

  return (
    <h3>
        {date}
    </h3>
  )
}

export default Date