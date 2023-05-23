import { useEffect, useState, useRef } from 'react';

interface UseCountDownOptions {
    /* 单位：秒 默认60s */
    initValue?: number;
}

export const useCountDown = (options: UseCountDownOptions) => {
    const { initValue = 60 } = options ?? {};
    const [countValue, setCountValue] = useState(initValue);
    const [isCounting, setIsCounting] = useState(false);
    const timeRef = useRef<number | undefined>();

    useEffect(() => {
        return () => {
            console.log('测试定时器销毁');
            clearInterval(timeRef.current);
        };
    }, []);

    const stop = (homing?: boolean) => {
        clearInterval(timeRef.current);
        setIsCounting(false);
        if (homing) {
            setCountValue(initValue);
        }
    };

    const start = () => {
        setIsCounting(true);
        timeRef.current = window.setInterval(() => {
            setCountValue((prev) => {
                if (prev <= 0) {
                    stop();
                    return initValue;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return {
        countValue,
        isCounting,
        start,
        stop,
    };
};

interface UseCountDownButtonOptions extends UseCountDownOptions {
    stopValue: string;
    countingValue?: (count: number) => string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const useCountDownButton = (options: UseCountDownButtonOptions) => {
    const { stopValue, countingValue = (count) => `${count}s后重试`, initValue } = options;
    const { countValue: _countValue, isCounting, start, stop } = useCountDown({ initValue });
    console.log('测试countValue', _countValue);
    const countValue = isCounting ? countingValue(_countValue) : stopValue;

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (isCounting) return;
        start();
        options.onClick?.(e);
    };

    return {
        countValue,
        isCounting,
        start,
        stop,
        handleClick,
        disabled: isCounting,
    };
};
