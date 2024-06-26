import { useEffect, useState } from 'react';

const useDocumentClick = () => {
    const [clickedElement, setClickedElement] = useState(null);

    useEffect(() => {
        const handleClick = (event) => {
            setClickedElement(event.target);
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return clickedElement;
};

export default useDocumentClick;
