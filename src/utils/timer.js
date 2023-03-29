import React, { useState, useEffect } from 'react';

export default function Timer({time}) {
    const [count, setCount] = useState(time);

    useEffect(() => {
        const timer =
            count > 0 && setInterval(() => setCount(count - 1), 1000);
        return () => clearInterval(timer);
    }, [count]);

    return( <>{count}</>);
}
