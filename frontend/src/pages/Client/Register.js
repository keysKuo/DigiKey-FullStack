import Input from '../Admin/components/Form/Input';
import { logos } from '../../assets/img';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    const [registerForm, setRegisterForm] = useState({
        fullname: '',
        phone: '',
        email: '',
        password: '',
    });
    const handleOnChange = (key, data) => {
        setRegisterForm({ ...registerForm, [key]: data });
    };
    console.log(registerForm);
    return (
        <div className="bg-gray-100 w-full h-screen flex items-center justify-center">
            <form
                action=""
                method="post"
                className="bg-white shadow-2xl px-10 pb-10 rounded-xl flex flex-col gap-10 min-w-[40%]"
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
                    <label htmlFor="fullname">Full Name: </label>
                    <Input
                        id={'fullname'}
                        placeholder={'Full Name'}
                        onChange={(event) => handleOnChange(event.target.id, event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number: </label>
                    <Input
                        id={'phone'}
                        placeholder={'Phone Number'}
                        onChange={(event) => handleOnChange(event.target.id, event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <Input
                        id={'email'}
                        type={'email'}
                        placeholder={'Email'}
                        onChange={(event) => handleOnChange(event.target.id, event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <Input
                        id={'password'}
                        type={'password'}
                        placeholder={'Password'}
                        onChange={(event) => handleOnChange(event.target.id, event.target.value)}
                    />
                </div>
                <div className="flex gap-4 w-full">
                    <Link
                        to={'/'}
                        className="bg-blue-600 py-3 px-8 text-center rounded-xl flex-grow text-white 2sm:px-12"
                    >
                        Back
                    </Link>
                    <div className="bg-green-500 py-3 px-8 text-center rounded-xl flex-grow text-white 2sm:px-12">
                        Register
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;
