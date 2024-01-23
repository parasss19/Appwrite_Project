//This component is basically a mechanism to protect pages/routes in our app
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function AuthLayout({children, authentication = true}) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        //Easy way
        // if (authStatus === false) {
        //     navigate('/login')
        // } else if(authStatus === true){
        //     navigate('/')
        // }

        //Good Practice

        //(true && false !== true) => (true && true)
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } 
        //(false && true !== true) => (false && false)
        else if( !authentication && authStatus !== authentication){
            navigate('/')
        }

       setLoader(false)
    }, [authStatus, navigate, authentication]
    )

    return loader ? <h1>Loading...</h1> : <> {children} </>
}

export default AuthLayout
