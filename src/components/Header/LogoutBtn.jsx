import { useDispatch } from "react-redux"              //used to send info(state update) to store whether user is loged in or not
import auth from "../../appwrite/auth"
import { logout } from "../../featuresSlice/authSlice";


const LogoutBtn = () => {
    const dispatch = useDispatch();

    const logoutHandler = ()=>{
        auth.logout()              //it is the logout method insider auth.js
          .then(()=>{
            dispatch(logout())     //it is the logout action inside the authSlice.js
          })
          .catch((error)=>{
              console.log("LogoutBtn :: Error ::", error)
          })
    }

  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default LogoutBtn
