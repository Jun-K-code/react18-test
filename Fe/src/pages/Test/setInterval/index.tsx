import { FC } from 'react';
import { useCountDownButton } from './useCountDown';

interface AppProps {}

export default (props: AppProps) => {
    const { start, countValue, disabled } = useCountDownButton({
        stopValue: '发送验证码',
        onClick() {
            console.log('request / sms');
        },
    });
    return (
        <div>
            <button onClick={() => start()} disabled={disabled}>
                {countValue}
            </button>
        </div>
    );
};
