import { useEffect, useState } from 'react';
import { FaCircle, FaCreditCard, FaPaypal, FaStripeS } from 'react-icons/fa';
import { cartIcons } from '../../../assets/img';
import { formatCash } from '../../../utils/helpers';
import SimpleProductCard from './SimpleProductCard';
import { useCartContext } from '../../../contexts/CartProvider';
import { GET_checkTransaction, POST_createTransaction } from '../../../services/transactions';
import { POST_createPayment } from '../../../services/payments';
import useFetch from '../../../hooks/useFetch';
import { toast } from 'react-toastify';
import axios from 'axios';
import { TextInput } from 'flowbite-react';
import { GET_remainInStorage } from '../../../services/products';
import { LuArrowLeft } from 'react-icons/lu';

function CartPage(props) {
    const { cartItems, setCartItems, clearCart } = useCartContext();
    const { fetch, error } = useFetch();
    const [stage, setStage] = useState(1);
    const [loading, setLoading] = useState(false);

    // FormData { transactionId, email, paymentType, total }
    const [transactionId, setTransactionId] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [totalProductPrice, setTotalProductPrice] = useState(0);

    useEffect(() => {
        if (cartItems.length > 0) {
            setTotalProductPrice(0);
            cartItems.map((item) => {
                return setTotalProductPrice((prev) => (prev += item.sellPrice * item.qty));
            });
        }

        // console.log(cartItems)
    }, [cartItems]);

    const onSelectPayment = (paymentType) => {
        if (!customerEmail || !customerEmail.includes('@')) {
            toast('❌ Vui lòng điền email mua hàng');
            return;
        }

        const checkStorage = async (productId, qty) => {
            const options = GET_remainInStorage(productId, qty);
            const result = await fetch(options);
            return result.length == qty ? result.map(r => r.id) : []
        }
  
        const updatedCartItems = JSON.parse(JSON.stringify(cartItems));
        cartItems.forEach(async (item, index) => {
            const remains = await checkStorage(item.id, item.qty);
            updatedCartItems[index]['remains'] = remains;
            await setCartItems(updatedCartItems);
        })

        setPaymentType(paymentType);
        setStage(2);
    };

    const onCheckout = () => {
        const createTransaction = async (transactionId, paymentId, paymentUrl) => {
            const data = {
                data: {
                    transactionId: transactionId,
                    email: customerEmail,
                    total: totalProductPrice,
                    paymentType: paymentType,
                    paymentId: paymentId,
                    status: 'pending',
                    products: cartItems.map((item) => {
                        return { name: item.typeName, items: item.remains, qty: item.qty };
                    }),
                },
            };

            const options = POST_createTransaction(data);
            await fetch(options);
            if (!error) {
                toast('🚀 Tạo giao dịch mới thành công');
                window.open(paymentUrl);
            }
        };

        const createPayment = async () => {
            setLoading(true);

            const newTransactionId = 'TS' + Math.floor(Math.random() * 9999999);
            setTransactionId(newTransactionId);

            const options = POST_createPayment(paymentType, cartItems, totalProductPrice, newTransactionId);
            setStage(3);
            await axios
                .request(options)
                .then((response) => response.data)
                .then((result) => {
                    if (result.success) {
                        const { paymentId, url } = result.payment;
                        createTransaction(newTransactionId, paymentId, url);
                    }
                })
                .catch((err) => {
                    toast(`❌ ${err?.response?.message || 'Đã có lỗi xãy ra'}`);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        if(cartItems.find(item => item.remains.length == 0)) {
            toast("❌ Một số sản phẩm hết hàng")
            return;
        }

        createPayment();
    };

    const onCheckPayment = () => {
        const checkTransaction = async () => {
            const options = GET_checkTransaction(transactionId);
            const result = await fetch(options);
            if (result[0]?.status === 'completed') {
                toast('🚀 Đơn hàng đã được thanh toán');
                setStage(1);
                clearCart();
            }
        };

        checkTransaction();
    };

    useEffect(() => {
        if (stage === 3) {
            const intervalId = setInterval(onCheckPayment, 10000);
            // Cleanup the interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [stage]);

    return (
        <>
            <div className="w-full bg-gray-100 flex justify-center items-center p-7 2sm:p-0">
                <div className="xl:w-layout lg:w-full md:w-full sm:w-full ">
                    <section className="flex justify-between w-full">
                        <div
                            className={`flex items-center gap-3 mx-3 ${
                                stage >= 1 ? 'text-emerald-400' : 'text-gray-300'
                            } `}
                        >
                            <FaCircle />
                            <p>Giỏ hàng</p>
                        </div>
                        <hr
                            className={`h-px flex-1 my-8 border-0 ${stage >= 2 ? 'bg-emerald-400' : 'bg-gray-200'}`}
                        ></hr>
                        <div
                            className={`flex items-center gap-3 mx-3 ${
                                stage >= 2 ? 'text-emerald-400' : 'text-gray-300'
                            } `}
                        >
                            <FaCircle />
                            Xác nhận
                        </div>
                        <hr
                            className={`h-px flex-1 my-8 border-0 ${stage >= 3 ? 'bg-emerald-400' : 'bg-gray-200'}`}
                        ></hr>
                        <div
                            className={`flex items-center gap-3 mx-3 ${
                                stage >= 3 ? 'text-emerald-400' : 'text-gray-300'
                            } `}
                        >
                            <FaCircle />
                            Thanh toán
                        </div>
                    </section>
                    <section className="flex justify-center gap-10 w-full bg-white border rounded-xl p-[35px]  mt-[21px] md:flex-col sm:flex-col 2sm:flex-col 2sm:p-5">
                        {cartItems.length > 0 ? (
                            <div className="w-[75%] md:w-full sm:w-full 2sm:w-full">
                                <p className="text-[27px] font-bold">
                                    Giỏ hàng{' '}
                                    <span className="text-[14px] font-light">( {cartItems.length} sản phẩm )</span>
                                </p>
                                <div className="w-full flex flex-col gap-5">
                                    {cartItems?.map((item, index) => {
                                        return <SimpleProductCard key={index} item={item} idx={index} stage={stage} />;
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="w-[75%] md:w-full sm:w-full 2sm:w-full">
                                <div className="flex items-center flex-col">
                                    <p className="text-[25px] font-bold">Giỏ hàng trống!</p>
                                    <p>Thêm sản phẩm vào giỏ và quay lại trang này để thanh toán nha bạn</p>
                                    <img src={cartIcons.emptyCart} alt="Empty Cart" />
                                </div>
                            </div>
                        )}
                        <div className="w-[25%] md:w-full sm:w-full 2sm:w-full flex flex-col gap-5">
                            <div className="text-[27px] font-bold">Thanh toán</div>
                            <div className="flex justify-between text-[14px]">
                                <p>Tổng giá trị sản phẩm:</p>
                                <p className="font-bold">{formatCash(totalProductPrice)}</p>
                            </div>
                            <hr className="h-px w-full my-4 bg-gray-200 border-0"></hr>
                            <div className="flex justify-between text-[14px]">
                                <p>Tổng giá trị thanh toán:</p>
                                <p className="font-bold">{formatCash(totalProductPrice)}</p>
                            </div>
                            <div className="flex justify-between text-[14px]">
                                <p>Số dư hiện tại:</p>
                                <p className="font-bold">{formatCash(0)}</p>
                            </div>
                            <div className="flex justify-between text-[14px]">
                                <p>Số tiền cần nạp thêm:</p>
                                <p className="font-bold text-red-600">{formatCash(totalProductPrice)}</p>
                            </div>
                            {cartItems.length > 0 ? (
                                <div className="flex flex-col gap-6 mt-5 text-[14px] font-semibold">
                                    <TextInput
                                        placeholder="Email mua hàng"
                                        value={customerEmail}
                                        onChange={(e) => {
                                            setCustomerEmail(e.target.value);
                                        }}
                                        sizing="lg"
                                        disabled={stage !== 1}
                                        required
                                        color=""
                                    />

                                    <p className="text-gray-300 text-[12px] text-center font-normal">
                                        <span className="text-red-500">Lưu ý:</span> Hãy nhập chính xác địa chỉ email
                                        của bạn vì email này sẽ được dùng để nhận thông tin đơn hàng khi bạn thanh toán
                                        thành công.
                                    </p>
                                    {stage === 1 ? (
                                        <>
                                            <div
                                                onClick={() => {
                                                    onSelectPayment('paypal');
                                                }}
                                                className="p-4 cursor-pointer text-white bg-blue-700 hover:bg-blue-500 rounded-xl flex items-center justify-center gap-3"
                                            >
                                                <FaPaypal />
                                                <p>Mua siêu tốc qua Paypal</p>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    onSelectPayment('stripe');
                                                }}
                                                className="p-4 cursor-pointer text-white bg-purple-700 hover:bg-purple-500 rounded-xl flex items-center justify-center gap-3"
                                            >
                                                <FaStripeS />
                                                <p>Mua siêu tốc qua Stripe</p>
                                            </div>
                                        </>
                                    ) : stage === 2 ? (
                                        <>
                                            <div
                                                onClick={onCheckout}
                                                className="p-4 cursor-pointer text-white bg-emerald-400 hover:opacity-80 rounded-xl flex items-center justify-center gap-3"
                                            >
                                                <FaCreditCard />
                                                <p>Xác nhận thanh toán</p>
                                            </div>
                                            <div
                                                onClick={() => setStage(1)}
                                                className="p-4 cursor-pointer text-white bg-red-400 hover:opacity-80 rounded-xl flex items-center justify-center gap-3"
                                            >
                                                <p>Trở lại</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                onClick={onCheckPayment}
                                                className="p-4 cursor-pointer text-white bg-emerald-400 hover:opacity-80 rounded-xl flex items-center justify-center gap-3"
                                            >
                                                <FaCreditCard />
                                                {loading ? <p>Đang xử lý...</p> : <p>Kiểm tra thanh toán</p>}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default CartPage;
