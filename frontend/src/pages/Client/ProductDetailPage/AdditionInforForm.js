import { useState } from 'react';
import { Link } from 'react-router-dom';

import { BsCartPlus, BsFillCreditCard2FrontFill } from 'react-icons/bs';

import Input from '../../../components/Form/Input';

function AdditionInforForm(props) {
    const [spotifyInforForm, setSpotifyInforForm] = useState({
        email: '',
        password: '',
    });
    const handleOnEmailChange = (data) => {
        setSpotifyInforForm({ ...spotifyInforForm, ...data });
    };

    const handleOnPasswordChange = (data) => {
        setSpotifyInforForm({ ...spotifyInforForm, ...data });
    };

    return (
        <form className="flex flex-col gap-10 mt-8">
            <Input
                type={'text'}
                id={'email'}
                value={spotifyInforForm.email}
                label={'Email tài khoản Spotify'}
                placeHolder={'Email tài khoản Spotify'}
                onChange={handleOnEmailChange}
            />
            <Input
                type={'text'}
                id={'password'}
                value={spotifyInforForm.password}
                label={'Mật khẩu Spotify'}
                placeHolder={'Mật khẩu Spotify'}
                onChange={handleOnPasswordChange}
            />
            <div className="flex gap-3 items-center text-[14px] sm:flex-wrap 2sm:flex-wrap">
                <Link className="flex items-center justify-center gap-3 w-[49%] px-[14px] py-3 text-center text-white border rounded-lg border-orange-500 bg-orange-500 sm:w-full 2sm:w-full">
                    <BsFillCreditCard2FrontFill className="w-[17.5px] h-[17.5px]" /> Mua Ngay
                </Link>
                <Link className="flex items-center justify-center gap-3 w-[49%] px-[14px] py-3 text-center text-orange-500 border-2 rounded-lg border-gray-300 hover:border-orange-500 sm:w-full 2sm:w-full">
                    <BsCartPlus className="w-[17.5px] h-[17.5px]" /> Thêm vào giỏ hàng
                </Link>
            </div>
        </form>
    );
}

export default AdditionInforForm;
