import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import auth from "./appwrite/auth"
import { login, logout } from "./featuresSlice/authSlice" 

import { Header, Footer } from "./components"
import { Outlet } from "react-router-dom"

const App = () => {

  //loading
  const [loading, setLoading] = useState(true)  //initially loading icon will show as data will be fetched

  //use useDispatch to get the info 
  const dispatch = useDispatch()

  //useEffect
  useEffect(()=>{
    auth.getCurrentUser() 
      .then((data)=> {
         if(data){
          dispatch(login({data}))
         }
         else{
          dispatch(logout())
         }
       })

      //it will run always
      .finally(()=> setLoading(false))

  }, [])
   
  return loading 
          ? null        //if loading is true it show nothing 

          : (
            <div className="min-h-screen flex flex-wrap content-between justify-center bg-gray-400">
                <div className=" ">
                  <Header/>

                  <main>
                  TODO  <Outlet/>
                  </main>

                  <Footer/>
                </div>
            </div>
          )
}

export default App
