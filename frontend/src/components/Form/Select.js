import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import styles from './Select.module.scss';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import useDocumentClick from '../../hooks/useDocumentClick';

function Select(props) {
    const { id, label, placeHolder, selectValues, value, onSelect, customClass } = props;
    const inputRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(value);
    const clickedElement = useDocumentClick();

    const handleOnSelectItem = (item) => {
        setSelectedItem(item);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        onSelect({ [id]: selectedItem });
    }, [selectedItem]);

    return (
        <div className={clsx(styles.wrapper, customClass)}>
            <div className={clsx(styles.formField)}>
                <input
                    id={id}
                    type="text"
                    className={clsx(styles.inputText, {
                        [styles.notEmpty]: value,
                    })}
                    value={value}
                    ref={inputRef}
                    required
                    readOnly
                />
                <label className={clsx(styles.label)} htmlFor={id}>
                    {clickedElement === inputRef.current || value ? label : placeHolder}
                </label>
                {clickedElement === inputRef.current ? (
                    <IoIosArrowDown className={clsx(styles.icon)} />
                ) : (
                    <IoIosArrowUp className={clsx(styles.icon)} />
                )}
            </div>
            <ul
                className={clsx(styles.dropDownList, {
                    [styles.active]: clickedElement === inputRef.current && clickedElement !== null,
                })}
            >
                {selectValues.map((item, index) => {
                    return (
                        <li key={index} onClick={() => handleOnSelectItem(item)}>
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Select;
