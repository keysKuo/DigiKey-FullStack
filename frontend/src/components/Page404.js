import { Link, useLocation } from 'react-router-dom';

function Page404(props) {
    const location = useLocation();
    return (
        <div className="w-full h-[80vh] bg-gray-100 flex items-center justify-center md:h-[90vh] sm:h-[90vh] 2sm:h-[90vh]">
            <div className="max-w-[75%] relative flex flex-col items-center gap-1 bg-white shadow-2xl rounded-xl pb-7 md:w-[85%] sm:w-[90%] 2sm:max-w-full">
                <p className="text-[186px] font-extralight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent 2sm:text-[100px]">
                    404
                </p>
                <span className="text-[33px] font-extralight tracking-[3px] text-gray-400 absolute top-[52%] 2sm:top-[38%] 2sm:text-[25px]">
                    Page Not found
                </span>
                <p className="text-[16px] font-extralight w-[40%] text-center mb-5 md:w-[50%] sm:w-[60%] 2sm:w-[80%]">
                    The page you are looking for was moved, removed, renamed or might never existed
                </p>
                <Link
                    to={location.pathname.includes('admin') ? '/admin' : '/'}
                    className="text-[16px] text-white font-extralight bg-gradient-to-r from-orange-500 to-red-500 rounded-xl px-5 py-3"
                >
                    RETURN HOME
                </Link>
            </div>
        </div>
    );
}

export default Page404;
