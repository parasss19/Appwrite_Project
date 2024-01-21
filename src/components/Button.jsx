import React from 'react'

function Button({
    // this all are default values which can be overide
    children,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'white',
    className = '',
    ...props   //it spread other properties(attributes)  
   }) {
    return ( 
        <button  className= {`px-4 py-2 rounded-lg  ${type} ${bgColor} ${textColor} `} {...props} >
         {children}
        </button>
    )
}

export default Button
