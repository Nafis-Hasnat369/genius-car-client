import React, { useContext } from 'react';
import login from '../../../assets/images/login/login.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { AiFillApple } from 'react-icons/ai';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { Toaster, toast } from 'react-hot-toast';
const Register = () => {

    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.from?.pathname || '/';

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form?.name.value;
        const photoURL = null;
        const email = form?.email.value;
        const password = form?.password.value;

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                handleUpdateUserProfile(name, photoURL);
                toast.success('User Created Successfully!');
                navigate(from, { replace: true });
            })
            .catch(err => toast.error(err.message));
    }

    const handleUpdateUserProfile = (name, photoURL) => {
        updateUserProfile({ displayName: name, photoURL: photoURL })
            .then(_ => { })
            .then(err => toast.error(err.message));
    };
    const handleGoogleSignIn = _ => {
        googleSignIn()
            .then(result => {
                toast.success('Signed In Successfully!');
                navigate(from, { replace: true });
            })
            .catch(err => toast.error(err.message));
    }
    return (
        <div className="hero w-full my-20">
            <Toaster position="bottom-right" reverseOrder={true} />
            <div className="hero-content flex-col lg:flex-row grid md:grid-cols-2 gap-20">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={login} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 pt-2 pb-5">
                    <h1 className="text-5xl font-bold text-center">Sign Up</h1>
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Your name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="Your email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="Your password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-error text-white" type="submit" value="Sign Up" />
                        </div>
                    </form >
                    <div className='text-center'>
                        <p>Or Sign Up With </p>
                        <div className='flex justify-center align-middle'>
                            <button><FaFacebook className='text-4xl mx-4 my-3 text-blue-600' /></button>
                            <button><AiFillApple className='text-4xl mx-4 my-3' /></button>
                            <button onClick={handleGoogleSignIn}><FcGoogle className='text-4xl mx-4 my-3' /></button>
                        </div>
                    </div>
                    <p className='text-center'>Already have an account? <Link className='text-orange-600 font-bold' to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;