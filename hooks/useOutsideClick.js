import { useEffect, useRef } from 'react';

const useOutsideClick = (isElementShown, callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        isElementShown
      ) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, isElementShown]);

  return ref;
};

export default useOutsideClick;
