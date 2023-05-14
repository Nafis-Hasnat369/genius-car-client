import React, { useContext } from 'react';
import login from '../../../assets/images/login/login.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { AiFillApple } from 'react-icons/ai';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.from?.pathname || '/';

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form?.email.value;
        const password = form?.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                const currentUser = { email: user.email };

                // get jwt token
                fetch(`https://genius-car-server-woad-three.vercel.app/jwt`, {
                    method: 'POST', headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('genius-token', data.token);
                        navigate(from, { replace: true });
                    })

                form.reset();
                toast.success('Signed In Successfully!');
            })
            .catch(err => toast.error(err.message));
    }

    const handleGoogleSignIn = _ => {
        googleSignIn()
            .then(result => {
                toast?.success('Signed In Successfully!');
                navigate(from, { replace: true });
            })
            .catch(err => toast?.error(err?.message));
    }

    return (
        <div className="hero w-full my-20">
            <Toaster position="bottom-right" reverseOrder={true} />
            <div className="hero-content flex-col lg:flex-row grid md:grid-cols-2 gap-20">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={login} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 pt-2 pb-5">
                    <h1 className="text-5xl font-bold text-center">Login</h1>
                    <form onSubmit={handleLogin} className="card-body">
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
                            <label className="label">
                                <a href='/' className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-error text-white" type="submit" value="Login" />
                        </div>
                    </form >
                    <div className='text-center'>
                        <p>or continue with </p>
                        <div className='flex justify-center align-middle'>
                            <button><FaFacebook className='text-4xl mx-4 my-3 text-blue-600' /></button>
                            <button><AiFillApple className='text-4xl mx-4 my-3' /></button>
                            <button onClick={handleGoogleSignIn}><FcGoogle className='text-4xl mx-4 my-3' /></button>
                        </div>
                    </div>
                    <p className='text-center'>New to Genius Car? <Link className='text-orange-600 font-bold' to='/register'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;