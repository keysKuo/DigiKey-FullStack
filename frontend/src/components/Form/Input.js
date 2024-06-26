import clsx from 'clsx';
import { useRef } from 'react';

import useDocumentClick from '../../hooks/useDocumentClick';

import styles from './Input.module.scss';

function Input(props) {
    const { id, type, label, annote = null, placeHolder = null, alertMsg = null, value, onChange, customClass } = props;
    const inputRef = useRef(null);
    const clickedElement = useDocumentClick();

    const handleOnChange = (event) => {
        if (typeof onChange === 'function') {
            if (type === 'checkbox') {
                onChange({ [id]: event.target.checked });
            } else {
                onChange({ [id]: event.target.value });
            }
        }
    };
    return (
        <div className={clsx(styles.wrapper, customClass)}>
            <div className={clsx(styles.container)}>
                <input
                    id={id}
                    className={clsx(styles.inputText, { [styles.notEmpty]: value })}
                    type={type}
                    value={value === 0 ? '' : value}
                    onChange={(event) => handleOnChange(event)}
                    checked={value}
                    ref={inputRef}
                    step={10000}
                    required
                />

                {type === 'checkbox' ? (
                    <label className={clsx({ [styles.label]: type !== 'checkbox' })} htmlFor={id}>
                        {label}
                    </label>
                ) : (
                    <label className={clsx({ [styles.label]: type !== 'checkbox' })} htmlFor={id}>
                        {clickedElement === inputRef.current || value ? label : placeHolder}
                    </label>
                )}
            </div>
            {alertMsg && <p className={clsx(styles.alertMsg, { [styles.active]: alertMsg })}>{alertMsg}</p>}
            {annote && (
                <p className={clsx(styles.annote, styles.active, { [styles.checkbox]: type === 'checkbox' })}>
                    {annote}
                </p>
            )}
        </div>
    );
}

export default Input;
