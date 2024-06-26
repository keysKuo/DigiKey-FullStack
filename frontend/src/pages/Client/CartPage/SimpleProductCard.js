import { Link } from 'react-router-dom';

import { FaTrashAlt } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';

import { formatCash } from '../../../utils/helpers';
import clsx from 'clsx';
import styles from '../../../components/Form/QuantityInput.module.scss';
import { useEffect } from 'react';
import { useCartContext } from '../../../contexts/CartProvider';

function SimpleProductCard({ idx, item, stage }) {
    const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCartContext();

    useEffect(() => {}, [cartItems]);

    return (
        <div className="w-full flex gap-[14px] p-[18px] border border-gray-200 rounded-2xl sm:flex-col 2sm:flex-col">
            <Link to={`/san-pham/${item.slug}`} className="max-w-[30%] rounded-xl sm:max-w-full 2sm:max-w-full">
                <img
                    src={`${process.env.REACT_APP_BACKEND_URL}${item?.image?.data?.attributes?.url}`}
                    alt={item.id}
                    className="w-full rounded-xl"
                />
            </Link>
            <div className="w-full">
                <div className="flex justify-between gap-3 items-start 2sm:flex-col">
                    <div className="w-[45%] 2sm:w-full">
                        <Link to={`/san-pham/${item.slug}`} className="text-[16px] font-semibold mb-2">
                            {item?.typeName}
                        </Link>
                        <p>{item?.category?.data?.attributes.categoryName}</p>
                    </div>
                    <div className={clsx(styles.Input)}>
                        <button
                            disabled={stage !== 1}
                            className={clsx(styles.count, styles.minus)}
                            type="button"
                            onClick={() => {
                                decreaseQty(idx);
                            }}
                        >
                            -
                        </button>
                        <input
                            className={clsx(styles.productQuantity)}
                            type="number"
                            name="productQuantity"
                            value={item?.qty}
                            readOnly
                        />
                        <button
                            disabled={stage !== 1}
                            className={clsx(styles.count, styles.add)}
                            type="button"
                            onClick={() => {
                                increaseQty(idx);
                            }}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex flex-col items-end gap-2 2sm:flex-row">
                        <p className="font-bold">{formatCash(item.sellPrice)}</p>
                        <div className="flex text-[1.5rem] gap-2 items-center">
                            <p className="bg-red-300 text-white text-[1.25rem] font-semibold p-[3.25px] rounded-lg">
                                -{100 - Math.floor((item.sellPrice / item.originalPrice) * 100)}%
                            </p>
                            <p className="line-through text-gray-300 text-[1.5rem]">{formatCash(item.originalPrice)}</p>
                        </div>
                    </div>
                </div>
                <hr className="h-px w-full my-4 bg-gray-200 border-0"></hr>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <BsBoxSeam className="w-[17.5px] h-[17.5px]" />
                        Tình trạng:{' '}
                        <span className="text-green-500">{item.status === 'available' ? 'Còn hàng' : 'Hết hàng'}</span>
                    </div>
                    {stage === 1 && (
                        <FaTrashAlt
                            onClick={() => {
                                removeFromCart(item);
                            }}
                            className="w-[20px] h-[20px] text-red-300 cursor-pointer"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SimpleProductCard;
