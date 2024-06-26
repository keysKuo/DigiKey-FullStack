import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import styles from './Slide.module.scss';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';

function SlideScrollable(props) {
    const {
        slideShowItemLength = 0,
        settingSlideLayout = '',
        translatePercent = 100,
        forceTranslateTo = -1,
        autoTranslate = true,
        scrollable = false,
        showBtn = true,
        updateThumbnailIndex = null,
        children,
    } = props;

    const [slideIndex, setSlideIndex] = useState(0);
    const timeOutRef = useRef(null);
    const slideShowRef = useRef();

    function resetTimeOut() {
        if (timeOutRef) {
            clearTimeout(timeOutRef.current);
        }
    }

    useEffect(() => {
        if (autoTranslate) {
            resetTimeOut();
            timeOutRef.current = setTimeout(() => {
                setSlideIndex((prevIndex) => (prevIndex === slideShowItemLength ? 0 : prevIndex + 1));
            }, 3000);
            return () => {
                resetTimeOut();
            };
        }
    }, [slideIndex, slideShowItemLength, autoTranslate]);

    useEffect(() => {
        slideShowRef.current.scroll({
            left: `${(slideIndex * slideShowRef.current.clientWidth * translatePercent) / 100}`,
            behavior: 'smooth',
        });
        if (updateThumbnailIndex !== null) {
            updateThumbnailIndex(slideIndex);
        }
    }, [slideIndex, translatePercent]);

    useEffect(() => {
        if (forceTranslateTo !== -1) {
            setSlideIndex(forceTranslateTo);
        }
    }, [forceTranslateTo]);

    const handleNextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === slideShowItemLength ? 0 : prevIndex + 1));
    };

    const handlePrevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === 0 ? slideShowItemLength : prevIndex - 1));
    };

    return (
        <>
            <div className={clsx(styles.container, { [styles.activeHover]: showBtn })}>
                <div className={clsx(styles.slideShow, { [styles.scrollable]: scrollable })} ref={slideShowRef}>
                    <div
                        className={clsx(styles.slides)}
                        style={{
                            ...settingSlideLayout,
                        }}
                    >
                        {children}
                    </div>
                </div>

                <div className={clsx(styles.nextButton)} onClick={handleNextSlide}>
                    <MdOutlineKeyboardArrowRight className={clsx(styles.btnIcon)} />
                </div>
                <div className={clsx(styles.prevButton)} onClick={handlePrevSlide}>
                    <MdOutlineKeyboardArrowLeft className={clsx(styles.btnIcon)} />
                </div>
            </div>
        </>
    );
}

export default SlideScrollable;
