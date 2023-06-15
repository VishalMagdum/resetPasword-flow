import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import pikachu from '../images/pikachu.gif'
function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );
    const submitForm = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            toast.success("Login Successful")
            navigate('/login-success')
        }


    }, [dispatch, error, toast, isAuthenticated, navigate]);
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={submitForm} >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                placeholder='Enter Your Email'
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                                className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                placeholder='Enter Your Password'
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className='flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        <button
                            type="submit"
                            className=""
                        >
                            Sign in {loading && loading ? "..." : ""}
                        </button>
                        {loading && loading ? (<img className='max-w-[40px]' src={pikachu} />) : ""}
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have account
                    <a href="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-2">
                        Create New Account
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login




