/* 强制更新 */
/* https://juejin.cn/post/7101486767336849421#heading-17 */
import { useCallback, useState } from 'react';

const useUpdate = () => {
    const [, setState] = useState({});
    return useCallback(() => setState({}), []);
};
export default useUpdate;

//示例：
// import { Button } from 'antd-mobile';
// import React from 'react';
// import { useUpdate } from '@/components';

// const Index: React.FC<any> = (props) => {
//     const update = useUpdate();

//     return (
//         <div style={{ padding: 50 }}>
//             <div>时间：{Date.now()}</div>
//             <Button color="primary" onClick={update}>
//                 更新时间
//             </Button>
//         </div>
//     );
// };
