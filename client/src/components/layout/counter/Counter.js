import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import './styles.css'

const usePercentageEffect = maxValue => {
    const [counter, setCounter] = useState(undefined);

    useEffect(() => {
        const interval = setInterval(() => {
        if (counter < maxValue) setCounter(counter + Math.floor(Math.random() * 10));
        }, Math.floor(Math.random() * 1000));

        return () => {
        clearInterval(interval);
        };
        //eslint-disable-next-line
    }, [counter]);

    return [counter, setCounter];

    };

    const Counter = () => {
    const [counter, setCounter] = usePercentageEffect(111111);

    return (
        <div className="counter">
            <Fade onReveal={() => setCounter(56142)}>
                <h1 className="large">Join The Community<span class="dot">.</span></h1>
                <h2 className="x-large counter-main">{counter}</h2>
                <h2>Active Users</h2>
            </Fade>
        
        </div>
    );
};

export default Counter;
