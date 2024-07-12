import React from 'react'
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Protected({children,authentication = true}) {

    const navigate = useNavigate()
    const authstatus = useSelector(state => state.auth.status)
    const [loader, setLoader] = React.useState(true)

    React.useEffect(()=>{

        if(authentication && authstatus !== authentication){
            navigate("/login")
        }else if (!authentication && authstatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    },[navigate, authentication, authstatus])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

