import clsx from 'clsx';

import styles from './QuantityInput.module.scss';
import { useEffect, useState } from 'react';

function QuantityInput(props) {
    const { id, productQuantity, onChange } = props;
    const [quantity, setQuantity] = useState(productQuantity);
    const handleIncrease = () => {
        setQuantity((prev) => (prev += 1));
    };
    const handleDecrease = () => {
        setQuantity((prev) => (prev === 1 ? (prev = 1) : (prev -= 1)));
    };

    useEffect(() => {
        onChange(id, quantity);
        // eslint-disable-next-line
    }, [quantity]);
    return (
        <div className={clsx(styles.Input)}>
            <button className={clsx(styles.count, styles.minus)} type="button" onClick={handleDecrease}>
                -
            </button>
            <input
                className={clsx(styles.productQuantity)}
                type="number"
                name="productQuantity"
                value={quantity}
                readOnly
            />
            <button className={clsx(styles.count, styles.add)} type="button" onClick={handleIncrease}>
                +
            </button>
        </div>
    );
}

export default QuantityInput;
