import { useState, useEffect, useCallback } from 'react';

/* tslint:disable:no-empty */
export default (callback = () => { }, ms = 300) => {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timer: number | null = null;
    if (startLongPress) {
      timer = setTimeout(callback, ms);
    } else {
      if (timer) {
        clearTimeout(timer);
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [startLongPress, callback, ms]);

  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);
  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
    onTouchCancel: stop,
  };
};
