import Input from '../Admin/components/Form/Input';
import { logos } from '../../assets/img';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Login(props) {
    const location = useLocation();
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });
    const handleOnChange = (key, data) => {
        setLoginForm({ ...loginForm, [key]: data });
    };
    return (
        <div className="bg-gray-100 w-full h-screen flex items-center justify-center">
            <form
                action=""
                method="post"
                className="bg-white shadow-2xl px-10 pb-10 rounded-xl flex flex-col gap-10 min-w-[30%]"
            >
                <div className="text-center relative">
                    <a href="/#" className="mx-auto max-w-[160px] inline-block">
                        <img src={logos[0]} alt="logo" />
                        <div className="absolute font-bold bottom-0 left-[50%] translate-x-[-50%] text-[36px] bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            DigiKey
                        </div>
                    </a>
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <Input
                        id={'email'}
                        placeholder={'Email'}
                        onChange={(event) => handleOnChange(event.target.id, event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <Input
                        id={'password'}
                        placeholder={'Password'}
                        onChange={(event) => handleOnChange(event.target.id, event.target.value)}
                    />
                </div>
                <div className="flex gap-4 w-full">
                    <Link
                        to={location.pathname.includes('admin') ? '/admin' : '/'}
                        className="bg-blue-600 py-3 px-8 text-center rounded-xl flex-grow text-white 2sm:px-12"
                    >
                        Back
                    </Link>
                    <div className="bg-green-500 py-3 px-8 text-center rounded-xl flex-grow text-white 2sm:px-12">
                        Login
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
