import React from 'react'
import { GoPlus } from "react-icons/go";

const CustomAddCard = ({onClick}) => {
  return (
    <div onClick={onClick} className='hover:bg-slate-100' style={{ display:"flex",alignItems:"center", borderRadius:"3px",padding:"6px",cursor:"pointer"}}>
        <GoPlus className='text-xl'/>
        <p style={{fontSize:"1.1rem"}}>Create Tasks</p>
        </div>
  )
}

export default CustomAddCard