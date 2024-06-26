import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Banner.module.scss';
// import styles from './Sidebar.module.scss';
import {
    FaSteam,
    FaGraduationCap,
    FaWindows,
    FaGoogleDrive,
    FaGooglePlay,
} from 'react-icons/fa';
import { GiConsoleController, GiSuitcase } from 'react-icons/gi';
import { Md4GPlusMobiledata, MdAccountBalanceWallet, MdOutlineGames } from 'react-icons/md';

import SlideScrollable from '../../../components/SlideScrollable';

function Banner(props) {
    const { banners, sliders } = props;
    const [slideIndex, setSlideIndex] = useState(0);

    const handleOnUpdateSlideIndex = (index) => {
        setSlideIndex(index);
    };

    return (
        <div className="w-full flex justify-center items-center p-7">
            <div className="xl:w-layout lg:w-full md:w-full sm:w-full 2sm:w-full">
                <div className="grid grid-cols-4 gap-[20px] sm:gap-3 2sm:gap-3">
                    <div className="rounded-lg bg-white row-start-1 row-end-3 md:hidden sm:hidden 2sm:hidden">
                        <div className={`text-black  py-[10px]`}>
                            <Link
                                to={'/'}
                                className={`flex items-center justify-left gap-3 hover:bg-orange-400 py-[3px] px-[10px] `}
                            >
                                <GiConsoleController className="text-[21px]" />
                                <p>Giải trí</p>
                            </Link>
                            <Link
                                to={'/'}
                                className={`flex items-center justify-left gap-3 hover:bg-orange-400 py-[3px] px-[10px] `}
                            >
                                <GiSuitcase className="text-[21px]" />
                                <p>Làm việc</p>
                            </Link>
                            <Link
                                to={'/'}
                                className={`flex items-center justify-left gap-3 hover:bg-orange-400 py-[3px] px-[10px] `}
                            >
                                <FaGraduationCap className="text-[21px]" />
                                <p>Học Tập</p>
                            </Link>
                            <Link
                                to={'/'}
                                className={`flex items-center justify-left gap-3 hover:bg-orange-400 py-[3px] px-[10px] `}
                            >
                                <FaSteam className="text-[21px]" />
                                <p>Game Steam </p>
                            </Link>
                            <Link
                                to={'/'}
                                className={`flex items-center justify-left gap-3 hover:bg-orange-400 py-[3px] px-[10px] `}
                            >
                                <MdOutlineGames className="text-[21px]" />
                                <p>EA Games</p>
                            </Link>
                            <Link
                                to={'/'}
                                className={`flex items-center justify-left gap-3 hover:bg-orange-400 py-[3px] px-[10px] `}
                            >
                                <FaWindows className="text-[21px]" />
                                <p>Window Office</p>
                            </Link>
                            <Link
                                to={'/'}
                                className={`flex items-center justify-left gap-3 hover:bg-orange-400 py-[3px] px-[10px] `}
                            >
                                <FaGoogleDrive className="text-[21px]" />
                                <p>Google Drive</p>
                            </Link>
                            <Link
                                to={'/'}
                                className={`flex items-center justify-left gap-3 hover:bg-orange-400 py-[3px] px-[10px] `}
                            >
                                <MdAccountBalanceWallet className="text-[21px]" />
                                <p>Steam Wallet</p>
                            </Link>
                            <Link
                                to={'/'}
                                className={`flex items-center justify-left gap-3 hover:bg-orange-400 py-[3px] px-[10px] `}
                            >
                                <Md4GPlusMobiledata className="text-[21px]" />
                                <p>Gói Data Mobile</p>
                            </Link>
                            <Link
                                to={'/'}
                                className={`flex items-center justify-left gap-3 hover:bg-orange-400 py-[3px] px-[10px] `}
                            >
                                <FaGooglePlay className="text-[21px]" />
                                <p>Goole Plays, iTunes</p>
                            </Link>
                        </div>
                    </div>
                    <div className="rounded-lg col-span-2 row-span-2 md:col-span-full md:row-span-2 sm:col-span-full sm:row-span-2 2sm:col-span-full 2sm:row-span-2">
                        <SlideScrollable
                            slideShowItemLength={sliders.length - 1}
                            translatePercent={100}
                            forceTranslateTo={slideIndex}
                            updateThumbnailIndex={handleOnUpdateSlideIndex}
                            settingSlideLayout={{
                                display: 'flex',
                                height: '100%',
                                borderRadius: '0.5rem',
                            }}
                        >
                            {sliders.map((slide, index) => {
                                return (
                                    <Link to={'/'} className="min-w-full min-h-full" key={index}>
                                        <img
                                            src={slide}
                                            alt="slideImage"
                                            className="xl:h-[316px] lg:min-h-full rounded-lg w-full"
                                        />
                                    </Link>
                                );
                            })}
                        </SlideScrollable>

                        <SlideScrollable
                            slideShowItemLength={sliders.length - 1}
                            translatePercent={0}
                            autoTranslate={false}
                            showBtn={false}
                            settingSlideLayout={{
                                display: 'flex',
                                position: 'absolute',
                                bottom: '10px',
                                right: '50%',
                                transform: 'translateX(50%)',
                            }}
                        >
                            <div className={clsx(styles.slideshowDots, 'sm:w-full 2sm:hidden sm:hidden')}>
                                {sliders.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={clsx(styles.slideshowDot, 'sm:h-[6px] sm:w-[6px]', {
                                            [styles.active]: slideIndex === idx,
                                        })}
                                        onClick={() => handleOnUpdateSlideIndex(idx)}
                                    ></div>
                                ))}
                            </div>
                        </SlideScrollable>
                    </div>

                    {banners.map((banner, index) => {
                        if (index === 0 || index === 1) {
                            return (
                                <Link
                                    key={index}
                                    to={'/search/featured'}
                                    className="rounded-lg md:col-span-2 md:row-span-1 sm:row-span-1 sm:col-span-2 2sm:row-span-1 2sm:col-span-2"
                                >
                                    <img src={banner} alt="imgBanner" className="rounded-lg" />
                                </Link>
                            );
                        } else {
                            return (
                                <Link
                                    key={index}
                                    to={'/search/featured'}
                                    className="rounded-lg sm:row-span-1 sm:col-span-2 2sm:row-span-1 2sm:col-span-2"
                                >
                                    <img src={banner} alt="imgBanner" className="rounded-lg" />
                                </Link>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default Banner;
