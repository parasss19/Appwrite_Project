import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {login as authLogin} from '../featuresSlice/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from "react-redux"
import auth from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() { 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");

    const login = async(data) => {
        setError('')   //clean all errors

        try {
            const session = await auth.login(data)

            //if session exist then user loged in , else user is not loged in
            if(session){
              const userData = await auth.getCurrentUser();

              if(userData) dispatch(authLogin(userData));

              //now user is logged in so navigate user to home page
              navigate('/')      
            }
        } catch (error) {
            setError(error.message)
        }
    }


  return (
    <div className='flex items-center justify-center w-full'>
      <div className= {`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        
        {/* Logo */}
        <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        
        {/* if dont have acc then redirect to signup */}
        <p className="mt-2 text-center text-base text-black/60"> 
           Don&apos;t have any account?&nbsp;
           <Link className="font-medium text-primary transition-all duration-200 hover:underline" to= '/signup'> Sign Up</Link>
        </p>

        {/* error */}
        {error && <p className="text-red-600 mt-8 text-center"> {error} </p> }

        {/* Form */}
        <form onSubmit = {handleSubmit(login)} className="mt-8" >
            <div className="space-y-5">
                <Input
                  label = 'Email' 
                  type = 'email'
                  placeholder = 'Enter your email...'

                  { ...register('email', {
                     required : true,
                     validate : {
                        matchPattern : (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||  "Email address must be a valid address",   //to get this regx pattern : resource = Regexr.com
                     }
                    })
                  }
                />

                <Input 
                  label = "Password"
                  type = 'password'
                  placeholder = "Enter your Password"

                  {...register ('password', {
                      required : true,
                    })
                  }
                />

                <Button 
                    type="submit" 
                    className="w-full bg-teal-700 text-white hover:bg-teal-600 active:bg-green-600"
                >
                    Sign in
                </Button>

           
            </div>
        </form>


      </div>
    </div>
  )
}

export default Login
