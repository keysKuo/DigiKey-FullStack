import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './ProductCard.module.scss';
import { formatCash } from '../../../utils/helpers';

function ProductCard(props) {
    const { name, price, discount, img, link = '/search/featured', status } = props;
    return (
        <Link to={link} className="rounded-xl relative py-2">
            <img
                src={img}
                alt="productImg"
                className={`w-full rounded-xl ${status === 'unavailable' ? 'opacity-50' : null}`}
            />
            {status === 'unavailable' && (
                <div className="bg-black text-white text-[12.25px] text-center w-[30%] font-semibold p-[2.25px] absolute top-3 left-3 rounded-lg">
                    Hết Hàng
                </div>
            )}
            <div className="py-3 text-[14px]">
                <p className={clsx(styles.name)}>{name}</p>
                <div className="flex gap-[5px] flex-wrap items-center">
                    <p className="font-bold">{formatCash(price - (price * discount) / 100)}</p>
                    <p className="line-through text-gray-300">{formatCash(price)}</p>
                    <div className="bg-red-300 text-white text-[12.25px] font-semibold p-[3.25px] rounded-lg">{`-${discount}%`}</div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
