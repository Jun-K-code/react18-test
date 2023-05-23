/*
思路：
1.通过 useRef 获取元素，缓存变量。
2.useEffect 初始化计算容器的高度。截取初始化列表长度。这里需要 div 占位，撑起滚动条。
3.通过监听滚动容器的 onScroll 事件，根据 scrollTop 来计算渲染区域向上偏移量, 这里需要注意的是，当用户向下滑动的时候，为了渲染区域，能在可视区域内，可视区域要向上滚动；当用户向上滑动的时候，可视区域要向下滚动。
4.通过重新计算 end 和 start 来重新渲染列表。
*/
import { useRef, useState, useEffect } from 'react';

import './index.scss';

export default () => {
    const content = useRef<HTMLDivElement | null>(null);
    const scrollBox = useRef<HTMLDivElement | null>(null);
    const scrollList = useRef<HTMLUListElement | null>(null);
    const [data, setData] = useState<number[]>([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const scrollInfo = useRef({
        itemHeight: 50,
        renderCount: 0,
        bufferSize: 8,
    });

    useEffect(() => {
        // 获取数据
        const res: number[] = new Array(2000).fill(1).map((item, index) => item + index);
        setData(res);
        const boxHeight = document.body.clientHeight;
        // 获取渲染的个数
        const { itemHeight, bufferSize } = scrollInfo.current;
        const renderCount = Math.ceil(boxHeight / itemHeight) + bufferSize;
        scrollInfo.current.renderCount = renderCount;
        // 获取首次渲染时截取数据的索引
        setEnd(renderCount);
    }, []);

    // 处理滚动
    const handleScroll = () => {
        console.log('ddd');
        const { itemHeight, renderCount } = scrollInfo.current;
        // 获取元素中的内容”超出“元素上边界”的高度
        const { scrollTop } = scrollBox.current as HTMLDivElement;
        // 获取开始截取数据的值
        const newStartIndex = Math.floor(scrollTop / itemHeight);
        // 获取结束截取的数据的值
        const newEndIndex = newStartIndex + renderCount;
        // 如果发生变化，那么就重新渲染
        if (newEndIndex !== end || newStartIndex !== start) {
            setStart(newStartIndex);
            setEnd(newEndIndex);
        }
        const currentOffset = scrollTop - (scrollTop % itemHeight);
        if (scrollList) {
            scrollList.current!.style.transform = `translate3d(0, ${currentOffset}px, 0)`; /* 偏移，造成下滑效果 */
        }
    };
    // 对数据进行截取进行渲染
    const renderList = data.slice(start, end);
    const { itemHeight } = scrollInfo.current;
    return (
        <div ref={content}>
            <div ref={scrollBox} className="scroll_box" onScroll={handleScroll}>
                {/* 撑开div 让其滚动 */}
                <div
                    className="scroll_hold"
                    style={{ height: `${data.length * itemHeight}px` }}
                ></div>
                <ul className="list" ref={scrollList}>
                    {renderList.map((item) => (
                        <li key={item} style={{ height: '50px' }}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
