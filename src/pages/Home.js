import Menu from '../components/Menu'
import Board from '../components/Board'
import '../App.css';

const Home = () => {


    return (
        <div>
            <div className='homeCont'>
                <Menu></Menu>
                <Board></Board>
            </div>
        </div>
    );
};
export default Home;