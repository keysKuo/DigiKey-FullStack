import { Link } from 'react-router-dom';

function ThankYou(props) {
    return (
        <div className="w-full h-[60vh] bg-gray-100 flex items-center justify-center md:h-[90vh] sm:h-[90vh] 2sm:h-[90vh]">
            <div className="w-[75%] relative flex flex-col items-center bg-white shadow-2xl rounded-xl py-7 md:w-[85%] sm:w-[90%] 2sm:max-w-full">
                <p className="text-[100px] text-center font-extralight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent 2sm:text-[50px]">
                    Thank You
                </p>
                <p className="text-[16px] font-extralight text-center mb-5 md:w-[50%] sm:w-[60%] 2sm:w-[80%]">
                    Your order has been placed.
                </p>
                <p className="text-[16px] font-extralight text-center mb-5 md:w-[50%] sm:w-[60%] 2sm:w-[80%]">
                    An email with your order details will be sent you shortly.
                </p>
                <Link
                    to={'/'}
                    className="text-[16px] text-white font-extralight bg-gradient-to-r from-orange-500 to-red-500 rounded-xl px-5 py-3"
                >
                    CONTINUE SHOPPING
                </Link>
            </div>
        </div>
    );
}

export default ThankYou;
