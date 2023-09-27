import React, { useState,useEffect } from 'react'
import "./Nav.css";

const Navbar = () => {
    const [show,handleShow] = useState(false)

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY>100){
                handleShow(true)
            }else{handleShow(false)}
        });
        return ()=>{
            window.removeEventListener("scroll",null);
        }

    },[])
  return (
    <div className={`nav ${show && "nav_black"}`}>
        <img className='nav_logo' src="netflix.png" alt="logo" />      
    </div>  
  )
}

export default Navbar
