import React from "react";

const linkStyle = {
    textDecoration: "none",
    color:'black'
  };
function Navbar(){

    return(
        <div className='d-flex justify-content-center py-2 shadow-sm fs-5 fw-bold'>
        <img src='/logo.png'  width="45" height="35" className="d-inline-block align-text-top p-1" alt=""/>
        <a href="/" style={linkStyle}>Group 5: GNU Image Online Extension Repository</a>
        </div>     
        
    )
}
export default Navbar;