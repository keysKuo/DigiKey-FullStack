import clsx from 'clsx';

import styles from './Overlay.module.scss';

function Overlay({ children, onClick, customClass = null }) {;
    return (
        <div className={clsx(styles.overlay, customClass)} onClick={onClick}>
            {children}
        </div>
    );
}

export default Overlay;
