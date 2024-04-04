// Components ~
import Info from '../components/Info'
import Menu from '../components/Menu'
import Board from '../components/Board'
// ~ Components
import { Link } from 'react-router-dom';
import '../App.css';

const User = () => {
    return (
        <div>
            <div className='homeCont'>
                <Menu></Menu>
                <Info></Info>
            </div>
        </div>
    );
};
export default User;
