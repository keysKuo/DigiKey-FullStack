import { Link } from 'react-router-dom';
import { useState } from 'react';

import { logos } from '../../../assets/img';

import { SidebarItems } from '../../../constants/adminSidebarItems';

function Sidebar(props) {
    const { location } = props;
    const [openDropdown, setOpenDropdown] = useState(-1);
    const handleOnClickDropdownBtn = (index) => {
        if (index === openDropdown) {
            setOpenDropdown(-1);
        } else {
            setOpenDropdown(index);
        }
    };
    return (
        <div className="sticky top-0 z-50">
            <div className="flex items-center">
                <img src={logos[0]} alt="logo" className="w-[50px]" />
                <p className="text-[20px] font-bold text-orange-200 mt-2 whitespace-nowrap">DigiKey</p>
            </div>
            <div className="flex flex-col gap-5 p-3 overflow-y-scroll max-h-[90vh] hideScrollbar">
                {SidebarItems.map((item, index) => {
                    let Icon = item.icon;
                    let isActive = location.pathname.includes(item.title.toLowerCase());
                    return item.child.length === 0 ? (
                        <Link
                            to={item.url}
                            key={index}
                            className={`flex gap-3 justify-start items-center ${
                                isActive ? 'bg-orange-200' : ''
                            } rounded-xl py-3 px-1 hover:bg-orange-200`}
                            onClick={() => handleOnClickDropdownBtn(index)}
                        >
                            <Icon className="text-[30px]" />
                            <p className="">{item.title}</p>
                        </Link>
                    ) : (
                        <div key={index}>
                            <div
                                className="flex gap-3 justify-start items-center rounded-xl py-3 px-1 hover:bg-orange-200"
                                onClick={() => handleOnClickDropdownBtn(index)}
                            >
                                <Icon className="text-[30px]" />
                                <div className="cursor-pointer">{item.title}</div>
                            </div>
                            <div className={`flex-col gap-3 ${index === openDropdown || isActive ? 'flex' : 'hidden'}`}>
                                {item.child.map((child, index) => {
                                    return (
                                        <Link
                                            to={child.url}
                                            key={index}
                                            className={`py-3 pl-[40px] hover:bg-orange-200 rounded-xl ${
                                                location.pathname.toLowerCase().includes(child.url.toLowerCase())
                                                    ? 'bg-orange-200'
                                                    : ''
                                            }`}
                                        >
                                            {child.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div></div>
        </div>
    );
}

export { Sidebar as AdminSidebar };
