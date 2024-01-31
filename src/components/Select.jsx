import {forwardRef, useId } from "react"

//here also we use forwardRef hook (also used in input.jsx) but here we used simple syntax
function Select({
    options = [],
    label,
    className = '',
    ...props
  }, ref) {

    const id = useId();
   return (
      <div className="w-full">
        
       { label && <label htmlFor= {id}></label> }

       <select>
        {...props}
        id = {id}
        ref = {ref}
        className = {`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}

        {/* use map on options array */}
        { options ?.map((eachOption)=> (
            <option key={eachOption} value={eachOption}>
               {" "}
               {eachOption}
            </option>
        )) 
        }
       </select>

      </div>
  )
}

export default forwardRef(Select)

