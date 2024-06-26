import { Link } from 'react-router-dom';

function Section(props) {
    const { title, subTitle, hideBtn = false, styles = null, children } = props;
    return (
        <section
            className={`w-full flex justify-center items-center p-7 ${styles ? null : `border-b border-gray-200`} `}
        >
            <div className="xl:w-layout lg:w-full md:w-full sm:w-full 2sm:w-full">
                <div className="flex justify-between items-center">
                    <p className="text-[21px] font-bold">{title}</p>
                    
                    {!hideBtn && (
                        <Link
                            to={'/search/featured'}
                            className="bg-orange-300 text-white px-[14px] rounded-lg font-semibold text-center hover:opacity-80"
                        >
                            Khám phá
                        </Link>
                    )}
                </div>
                <p className="mb-5 text-[1.5rem]">{subTitle}</p>
                <div
                    className={
                        styles
                            ? styles
                            : 'grid grid-cols-4 gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 sm:gap-3 2sm:grid-cols-2 2sm:gap-3'
                    }
                >
                    {children}
                </div>
            </div>
        </section>
    );
}

export default Section;
