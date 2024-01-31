import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'    //as we are building RTE in separate compoent and we use it in other compoents, so we use Controller for reference (we can also use forwardRef hook)

function RTE({ name, control, label, defaultValue=""}) {
  return (
    <div className='w-full'>
    
    {label && (<label className='inline-block mb-1 pl-1'>{label}</label>) }
     
    <Controller 
      name= {name || 'content'}      //if parent component provide name when using "RTE comp" then use that name else name will be conent
      control={control}              //for passing RTE comp control to parent comp
      
      render={ ({ field : {onChange} }) => (
       
        <Editor  
          initialValue= {defaultValue} 
          init={
            {
              initialValue : 'defaultValue',
              menubar : true,
              height: 500,
               
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],

              toolbar : "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }
          }

          onEditorChange={onChange}  
        />
        
      )}
    />
      
    </div>
  )
}

export default RTE


// Note = Syntax of controller
// <Controller 
//   name= {name || 'content'}     
//   control={control}              
//   render={ ({ field : {onChange} }) => (
//     <Editor />
//   )}
// />
  
