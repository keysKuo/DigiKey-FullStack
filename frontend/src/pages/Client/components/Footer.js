import clsx from 'clsx';

import styles from './Footer.module.scss';
import { FaYoutube, FaFacebook, FaInstagram, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { paymentIcons } from '../../../assets/img';
function Footer(props) {
    return (
        <footer>
            <div className="w-full flex justify-center items-center bg-white">
                <div className="w-layout flex justify-start items-center xl:w-layout lg:w-full md:w-full sm:w-full 2sm:w-full">
                    <img src={paymentIcons.momo} alt="momo" className="m-[12.5px] cursor-pointer w-[35px] h-[24px] " />
                    <img src={paymentIcons.vnpay} alt="vnpay" className="m-[12.5px] cursor-pointer w-[80px] h-[24px]" />
                    <div className="cursor-pointer text-[31px] m-[12.5px]">
                        <FaCcVisa />
                    </div>
                    <div className="cursor-pointer text-[31px] m-[12.5px]">
                        <FaCcMastercard />
                    </div>
                    <span className="text-[12px] sm:hidden 2sm:hidden">và nhiều hình thức thanh toán khác</span>
                </div>
            </div>
            <div className="w-full flex justify-center items-center bg-gray-100 ">
                <div className="w-layout flex-col justify-start xl:w-layout lg:w-full md:w-full sm:w-full 2sm:w-full">
                    <div className="flex border-b border-gray-200 ">
                        <div className={clsx(styles.icon)}>
                            <FaFacebook />
                        </div>
                        <div className={clsx(styles.icon)}>
                            <FaYoutube />
                        </div>
                        <div className={clsx(styles.icon)}>
                            <FaInstagram />
                        </div>
                    </div>
                    <div className="flex justify-start flex-wrap">
                        <div className="min-w-[18rem] p-[7px] text-[14px]">
                            <p className="font-semibold text-[18px] mb-4">Giới thiệu</p>
                            <p className="cursor-pointer">Game bản quyền là gì</p>
                            <p className="cursor-pointer">Giới thiệu Divide Shop</p>
                            <p className="cursor-pointer">Điều khoản dịch vụ</p>
                            <p className="cursor-pointer">Chính sách bảo mật</p>
                        </div>
                        <div className="min-w-[18rem] p-[7px] text-[14px]">
                            <p className="font-semibold text-[18px] mb-4">Tài khoản</p>
                            <p className="cursor-pointer">Đăng Nhập</p>
                            <p className="cursor-pointer">Đăng ký</p>
                        </div>
                        <div className="min-w-[18rem] p-[7px] text-[14px]">
                            <p className="font-semibold text-[18px] mb-4">Liên hệ</p>
                            <p className="cursor-pointer">
                                Hotline tự động <span className="text-red-300 font-semibold">0123456789</span>
                            </p>
                            <p className="cursor-pointer">Liên hệ hỗ trợ</p>
                            <p className="cursor-pointer">Chat với CSKH</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export {Footer as ClientFooter};
