import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatCash } from '../../../utils/helpers';
import { GET_productTypeDetail, GET_relevantProductTypes } from '../../../services/products';
import useFetch from '../../../hooks/useFetch';
import classNames from 'classnames';

import { BsBoxSeam, BsTag } from 'react-icons/bs';
import { BsCartPlus, BsFillCreditCard2FrontFill } from 'react-icons/bs';
import { VscKey } from 'react-icons/vsc';
import { useCartContext } from '../../../contexts/CartProvider';
import { toast } from 'react-toastify';

function ProductDetailPage(props) {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [relevantProducts, setRelevantProducts] = useState([]);
    const { fetch, error, loading } = useFetch();
    const navigate = useNavigate();

    const { cartItems, addToCart } = useCartContext();

    useEffect(() => {
        async function loadProductType() {
            const result = await fetch(GET_productTypeDetail(slug));
            setProduct(result?.[0]);
            // console.log(product)
        }

        loadProductType();
    }, [slug]);

    useEffect(() => {
        async function loadRelevantTypes(categoryId) {
            setRelevantProducts(await fetch(GET_relevantProductTypes(categoryId)));
        }

        if (product) {
            loadRelevantTypes(product.category.data.id);
        }
    }, [product]);  

    const onAddToCart = () => {
        addToCart(product)
        toast('✔️ Đã thêm sản phẩm vào giỏ hàng');
    }

    const onBuyInstantly = () => {
        addToCart(product);
        navigate("/cart");
    }

    return (
        <>
            {product && (
                <>
                    <div className="w-full flex justify-center p-7 mt-10">
                        <div className="xl:w-layout lg:w-full md:w-full sm:w-full 2sm:w-full">
                            <div className="flex gap-10 sm:flex-wrap 2sm:flex-wrap">
                                <div>
                                    <div className="sm:w-full 2sm:w-full">
                                        <img
                                            src={`${process.env.REACT_APP_BACKEND_URL}${product?.image?.data?.attributes?.url}`}
                                            alt="productImg"
                                            className="rounded-xl w-full"
                                        />
                                    </div>
                                    <div className="flex gap-3 items-center justify-between text-[14px] w-full mt-[10px] sm:flex-wrap 2sm:flex-wrap">
                                        <button onClick={onBuyInstantly} className="flex items-center justify-center gap-3 w-[49%] px-[14px] py-3 text-center text-white border rounded-lg border-[#864AF9] bg-[#864AF9] hover:opacity-80 sm:w-full 2sm:w-full">
                                            <BsFillCreditCard2FrontFill className="w-[17.5px] h-[17.5px]" /> Mua Ngay
                                        </button>
                                        <button onClick={onAddToCart} className="flex items-center justify-center gap-3 w-[49%] px-[14px] py-3 text-center text-[#864AF9] border-2 rounded-xl border-gray-200 hover:border-[#864AF9] sm:w-full 2sm:w-full">
                                            <BsCartPlus className="w-[17.5px] h-[17.5px]" /> Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </div>
                                <div className="w-[50%] sm:w-full 2sm:w-full flex flex-col">
                                    <div className="gap-5 pb-8 flex flex-col border-b border-gray-200">
                                        {/* Tên sản phẩm */}
                                        <div className="text-[25px] font-semibold">{product?.typeName}</div>

                                        <div className="flex gap-3 items-center">
                                            <VscKey className="w-[17.5px] h-[17.5px]" />
                                            <p>
                                                Mã sản phẩm: <strong>{product?.typeId}</strong>
                                            </p>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <BsBoxSeam className="w-[17.5px] h-[17.5px]" />
                                            <p>
                                                Tình trạng:
                                                <span
                                                    className={`${
                                                        product?.status === 'available'
                                                            ? 'text-emerald-400'
                                                            : 'text-red-300'
                                                    } px-3`}
                                                >
                                                    {product?.status === 'available' ? 'Còn hàng' : 'Hết hàng'}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <BsTag className="w-[17.5px] h-[17.5px]" />
                                            <p>
                                                Thể loại:
                                                <span className="px-3 text-[#3B3486]">
                                                    {product?.category?.data?.attributes?.categoryName}
                                                </span>
                                            </p>
                                        </div>

                                        <div className=" flex gap-3 items-center ">
                                            <p className="text-[2.5rem] font-bold flex gap-2 items-center text-red-600">
                                                {formatCash(product?.sellPrice)}
                                            </p>
                                            -
                                            <p className="text-[2.5rem] line-through font-bold text-[#ccc]">
                                                {formatCash(product?.originalPrice)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="py-8">
                                        <p className="font-bold text-[1.5rem]"> Các sản phẩm tương tự</p>
                                        {relevantProducts.length !== 0 &&
                                            relevantProducts.map((prod, idx) => {
                                                return (
                                                    <Link
                                                        key={idx}
                                                        to={`/san-pham/${prod.slug}`}
                                                        className={classNames({
                                                            'border border-[#ccc] inline-block mr-5 mt-3 px-6 py-2 rounded-lg text-[1.3rem]': true,
                                                            'cursor-pointer hover:bg-[#864AF9] hover:text-white hover:opacity-80': true,
                                                            'text-[#864AF9] ': prod.typeId !== product.typeId,
                                                            'bg-[#864AF9] text-white': prod.typeId === product.typeId,
                                                        })}
                                                    >
                                                        {prod.typeId}
                                                    </Link>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default ProductDetailPage;
