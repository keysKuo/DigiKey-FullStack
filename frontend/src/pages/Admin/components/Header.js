import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import { SlEnvolopeLetter, SlBell, SlMenu } from 'react-icons/sl';
import { BsListTask } from 'react-icons/bs';

import { AdminSidebar } from './Sidebar';
import Breadcrumb from './Breadcrumb';
import Overlay from '../../../components/Overlay';

function Header(props) {
    const { children } = props;
    const location = useLocation();
    const [openSidebar, setOpenSidebar] = useState(true);
    return (
        <div className="w-full flex relative h-full min-h-screen">
            {openSidebar ? (
                <div className={`w-[15%] md:w-[20%] sm:w-[25%] 2sm:hidden`}>
                    <AdminSidebar location={location} />
                </div>
            ) : null}
            <div className="w-[85%] flex-grow bg-gray-100 md:w-[80%] sm:w-[75%]">
                <header className="w-full bg-white text-[16px] sticky top-0 z-50">
                    <nav className="flex justify-between items-center p-5">
                        <div className="flex gap-5 items-center">
                            <SlMenu className="cursor-pointer" onClick={() => setOpenSidebar(!openSidebar)} />
                            <Link to="/admin" className="2sm:hidden">
                                Dashboard{' '}
                            </Link>
                            <Link to="/admin/account" className="2sm:hidden">
                                User{' '}
                            </Link>
                            <Link to="/admin/setting/website" className="2sm:hidden">
                                Settings{' '}
                            </Link>
                        </div>
                        <div className="flex gap-5 text-[20px]">
                            <Link>
                                <SlBell />
                            </Link>
                            <Link>
                                <SlEnvolopeLetter />
                            </Link>
                            <Link>
                                <BsListTask />
                            </Link>
                        </div>
                    </nav>
                    <hr className="h-px w-full my-4 bg-gray-200 border-0"></hr>
                    <Breadcrumb location={location} />
                    <hr className="h-px w-full my-4 bg-gray-200 border-0"></hr>
                </header>
                {children}
            </div>
            {openSidebar ? (
                <Overlay
                    customClass={`xl:hidden lg:hidden md:hidden sm:hidden`}
                    onClick={() => setOpenSidebar(!openSidebar)}
                >
                    <div
                        className={`xl:hidden lg:hidden md:hidden sm:hidden w-[230px] h-full bg-white`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <AdminSidebar location={location} />
                    </div>
                </Overlay>
            ) : null}
        </div>
    );
}

export { Header as AdminHeader };
