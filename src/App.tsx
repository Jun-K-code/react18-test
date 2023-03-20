import '@/assets/style.scss';

const test = require('@/assets/images/test.jpg');

function App() {
    return (
        <div>
            <span>Hello World!</span>
            <img src={test} alt="" />
        </div>
    );
}

export default App;
