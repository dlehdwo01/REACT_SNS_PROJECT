import Menu from '../components/Menu'
import BoardDetail from '../components/BoardDetail'
import '../App.css';

const Home = () => {


    return (
        <div>
            <div className='homeCont'>
                <Menu></Menu>
                <BoardDetail></BoardDetail>
            </div>
        </div>
    );
};
export default Home;