// import { Routes, Route, Link } from 'react-router-dom';
import { useRef } from 'react';
// import List from './pages/list/list1';
// import List2 from './pages/list2';
import Login from 'src/pages/login';
// import { test } from './tools/test';
import 'src/assets/style.scss';
// import SetInterval from './pages/setInterval';

const testSvg = require('src/assets/images/test.svg');
// import testSvg from 'src/assets/images/test.svg';

function App() {
    // console.log(test('123'));
    // const listRef = useRef(null);
    // listRef.current.resetHeight();
    return (
        <div>
            <Login />
            {/* <SetInterval /> */}
            {/* <List /> */}
            {/* <List2 ref={listRef} /> */}
            {/* <img src={testSvg} alt="" /> */}
            {/* <img src={require('src/assets/images/test.svg')} alt="" /> */}
        </div>
    );
}

export default App;
