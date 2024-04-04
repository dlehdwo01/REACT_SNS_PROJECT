import { Link } from 'react-router-dom';

import './Menu.css';

const Alert = () => {
    return (
        <div>
            <div className='clickMenuCont'>
                <div className='sort-column'>
                    <h4>알림</h4>
                </div>

                <div className='sort-column gap-10'>
                    <div className='alertList'>
                        <img className='userImg'></img>
                        <div className='alertText'>게시asdasdadasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasd물 좋아좋아<span className='alertTime'>언제</span></div>
                    </div>
                    <div className='alertList'>
                        <img className='userImg'></img>
                        <div className='alertText'>게시asdasdadasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasd물 좋아좋아<span className='alertTime'>언제</span></div>
                        <button className='followBtn'>팔로우</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Alert;
