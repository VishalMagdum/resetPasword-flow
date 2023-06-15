import React, { useEffect } from 'react'
import welcome from '../images/welcom.png'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function LoginSuccess() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut = () => {
        dispatch(logout())

    }
    const { user, isAuthenticated, error } = useSelector(state => state.user)

    useEffect(() => {
        console.log(isAuthenticated)
        if (!isAuthenticated) {
            toast.success("LogOut Successfully")
            navigate('/')
        }
        if (error) {
            toast.error(error)
            clearErrors()
        }
    }, [dispatch, isAuthenticated, error])

    return (
        <div className="flex min-h-full h-[90vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center">

            <div className='flex justify-center -mt-20'>
                <h2 className='font-mono text-lg font-bold' style={{ color: "green" }}>Login Successful</h2>
            </div>
            <div className='flex justify-center py-10'>
                <img className='max-w-md' src={welcome} />
            </div>
            <div className='flex justify-center'>
                <h1 style={{ color: "orangered" }}>{user && user.name}</h1>

            </div>
            <div className='border-blue-800 py-5'>
                <button onClick={() => logOut()} className='border-blue-800 rounded bg-sky-400 p-2 text-[white] '>Log Out <i class="fa-solid fa-right-from-bracket px-1"></i></button>

            </div>
        </div>
    )
}

export default LoginSuccess