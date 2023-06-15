import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../actions/userActions';
import axios from 'axios';
import { toast } from 'react-toastify';
import pikachu from '../images/pikachu.gif'
function ForgotPassword() {
    const [email, setEmail] = useState()
    const dispatch = useDispatch()
    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
    );
    const submitForm = async (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("email", email);
        dispatch(forgotPassword(myForm));

    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());

        }

        if (message) {
            toast.success(message);
            dispatch(clearErrors())
        }
    }, [dispatch, error, toast, message]);

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Forgot Password
                    </h2>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <p className="mt-10  text-2xl  leading-9 tracking-tight text-gray-900">
                        Please enter your email address register with your account. You will receive a link to create a new password via email.
                    </p>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>




                        <div className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                            <button
                                type="submit"
                                className=""
                            >
                                {loading && loading ? "Sending..." : "Send"}
                            </button>
                            {loading && loading ? (<img className='max-w-[40px] px-2' src={pikachu} />) : ""}
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default ForgotPassword