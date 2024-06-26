import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Header.module.scss';
import { logos, headerIcons } from '../../../assets/img';
import { IoIosArrowForward, IoIosArrowBack, IoIosSearch } from 'react-icons/io';
import { FaBook, FaEye, FaFire, FaPercent, FaCreditCard, FaUserAlt } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import { LuBadgePercent, LuShoppingCart, LuMenu, LuX } from 'react-icons/lu';
import { FiPhone } from 'react-icons/fi';
import _ from 'lodash';

import Overlay from '../../../components/Overlay';
import Sidebar from './Sidebar';
import { useCartContext } from '../../../contexts/CartProvider';
import { GET_searchProductTypes } from '../../../services/products';
import useFetch from '../../../hooks/useFetch';
import { formatCash } from '../../../utils/helpers';

function Header(props) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const { fetch, error, loading } = useFetch();
    const { cartItems } = useCartContext();

    useEffect(() => {
        if (searchProducts.length !== 0) {
            setShowSearchResult(true)
        }
    }, [searchResult, setShowSearchResult])

    const searchProducts = async (keyword) => {
        const options = GET_searchProductTypes(keyword);
        setSearchResult(await fetch(options));
    };

    const deboundSearch = useCallback(
        _.debounce((keyword) => {
            if (keyword) {
                searchProducts(keyword);
            } else {
                setSearchResult([]);
            }
        }, 500),
        [],
    );

    const onSearchChange = (e) => {
        setSearchValue(e.target.value);
        deboundSearch(e.target.value);
    };

    const handleOnCloseSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    const handleOnSidebarClick = (e) => {
        e.stopPropagation();
    };
    return (
        <>
            <header className="text-white text-[14px] sticky top-0 z-50">
                <nav className="w-full flex justify-center items-center bg-[#864AF9] xl:flex lg:flex md:hidden sm:hidden 2sm:hidden">
                    <div className={clsx(styles.topHeader, 'flex justify-between px-2 py-5 xl:w-layout lg:w-full')}>
                        <div className="flex gap-2 items-center cursor-pointer">
                            <IoIosArrowBack /> <IoIosArrowForward /> Pad chuột DigiKey
                        </div>
                        <div className="flex justify-between gap-4">
                            <p className="flex gap-2 items-center cursor-pointer">
                                <FaBook />
                                Hướng dẫn mua hàng
                            </p>
                            <p className="flex gap-2 items-center cursor-pointer">
                                <LuBadgePercent />
                                Ưu đãi khách hàng
                            </p>
                            <p className="flex gap-2 items-center cursor-pointer">
                                <FiPhone />
                                Thông tin liên hệ
                            </p>
                        </div>
                    </div>
                </nav>
                <nav className="w-full flex justify-center items-center bg-[#3B3486]">
                    <div
                        className={clsx(styles.mainHeader, 'py-5 xl:w-layout lg:w-full md:w-full sm:w-full 2sm:w-full')}
                    >
                        <div className="flex justify-around items-center">
                            <Link
                                to={'/'}
                                className="flex items-center p-[10.5px] xl:flex lg:flex md:hidden sm:hidden 2sm:hidden "
                            >
                                <img src={logos[2]} alt="logo" width={100} height={100} />
                            </Link>
                            <div
                                className="flex items-center xl:hidden lg:hidden md:block sm:block"
                                onClick={handleOnCloseSidebar}
                            >
                                <div className={clsx(styles.sidebarIcon)}>
                                    <LuMenu />
                                </div>
                            </div>
                            <div className="flex items-center relative p-[10.5px] w-[35%] sm:w-[60%] 2sm:w-[60%]">
                                <input
                                    className={clsx(styles.search)}
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder="Tìm kiếm sản phẩm"
                                    // onBlur={() => { setShowSearchResult(false)}}
                                    // onFocus={() => { setShowSearchResult(true)}}
                                    value={searchValue}
                                    onChange={onSearchChange}
                                />
                                <div onClick={() => {
                                    setSearchValue("");
                                    setShowSearchResult(false);
                                }} className="cursor-pointer w-[4.5rem] h-[4.3rem] flex justify-center items-center bg-[#864AF9]">
                                    {searchValue ? <LuX size={20} /> : <IoIosSearch size={20} />}
                                </div>
                                {showSearchResult && (
                                    <div className={clsx(styles.searchResult)}>
                                        <div className="flex flex-col">
                                            {searchResult?.map((prod, idx) => {
                                                return (
                                                    <Link
                                                        to={`/san-pham/${prod.slug}`}
                                                        onClick={() => { 
                                                            setShowSearchResult(false)
                                                            setSearchValue('');
                                                        }}
                                                        key={idx}
                                                        className="flex items-center justify-between gap-10 hover:bg-[#ddd] px-4 py-2"
                                                    >
                                                        <div className="flex-1">
                                                            <div className="flex flex-col gap-1">
                                                                <p>{prod.typeName}</p>
                                                                <p className="text-[1.4rem] text-red-600">
                                                                    {formatCash(prod.sellPrice)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <img
                                                                width={70}
                                                                src={`${process.env.REACT_APP_BACKEND_URL}${prod?.image?.data?.attributes?.url}`}
                                                            />
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-3 p-[10.5px] sm:hidden 2sm:hidden">
                                <div className={clsx(styles.userIcon, styles.icon)}>
                                    <FaUserAlt />
                                </div>
                                <p>
                                    <Link to={'/login'} className="font-medium cursor-pointer">
                                        Đăng Nhập
                                    </Link>{' '}
                                    /{' '}
                                    <Link to={'/register'} className="font-medium cursor-pointer">
                                        Đăng Ký
                                    </Link>
                                </p>
                            </div>
                            <Link
                                to={'/cart'}
                                className="rounded-md border border-white pr-[12.5px] flex items-center justify-center mr-[10.5px]"
                            >
                                <div className={clsx(styles.icon)}>
                                    <LuShoppingCart />
                                </div>
                                <p className="sm:hidden 2sm:hidden">Giỏ hàng</p>
                                <p className="bg-white rounded-md text-black ml-1 px-2 font-medium">
                                    {cartItems?.length}
                                </p>
                            </Link>
                        </div>
                        <div className="flex justify-between items-center md:hidden sm:hidden 2sm:hidden">
                            <div className="flex gap-2 items-center cursor-pointer px-[10.5px]">
                                <FaEye />
                                <p>Sản phẩm bạn vừa xem</p>
                            </div>
                            <Link to={'/'} className="flex gap-2 items-center px-[10.5px]">
                                <FaFire />
                                <p>Sản phẩm mua nhiều</p>
                            </Link>
                            <Link to={'/'} className="flex gap-2 items-center px-[10.5px]">
                                <FaPercent />
                                <p>Sản phẩm khuyến mãi</p>
                            </Link>
                            <Link to={'/'} className="flex gap-2 items-center px-[10.5px]">
                                <FaMapLocationDot />
                                <p>Đại lý giao dịch</p>
                            </Link>
                            <Link to={'/'} className="flex gap-2 items-center px-[10.5px]">
                                <FaCreditCard />
                                <p>Hình thức thanh toán</p>
                            </Link>
                        </div>
                    </div>
                </nav>
                <nav className="text-black py-[7px] flex justify-center border-b border-gray-200 bg-white items-center w-full md:hidden sm:hidden 2sm:hidden">
                    <div className="flex justify-between items-center xl:w-layout lg:w-full md:w-full sm:w-full ">
                        <div className="flex items-center gap-5">
                            <div className={clsx(styles.icon)}>
                                <LuMenu />
                            </div>
                            Danh mục sản phẩm
                        </div>
                        <div className="flex items-center gap-5 mr-3">
                            <Link to={'/'} className="flex items-center gap-3">
                                <img src={headerIcons[0]} alt="icon" />
                                <p className="font-semibold">Thủ thuật & Tin tức</p>
                            </Link>
                            <Link to={'/'} className="flex items-center gap-3">
                                <img src={headerIcons[1]} alt="icon" />
                                <p className="font-semibold">Giới thiệu bạn bè</p>
                            </Link>
                            <Link to={'/'} className="flex items-center gap-3">
                                <img src={headerIcons[2]} alt="icon" />
                                <p className="font-semibold">Liên hệ hợp tác</p>
                            </Link>
                            <Link to={'/'} className="flex items-center gap-3">
                                <img src={headerIcons[3]} alt="icon" />
                                <p className="font-semibold">Ưu đãi khách hàng VIP</p>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            {showSidebar && (
                <Overlay onClick={handleOnCloseSidebar}>
                    <Sidebar onClick={handleOnSidebarClick} onCloseSidebar={handleOnCloseSidebar} />
                </Overlay>
            )}
        </>
    );
}

export { Header as ClientHeader };
