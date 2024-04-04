// icons ~

// ~ icons
import './Info.css';
import { Link } from 'react-router-dom';

const Info = () => {
    return (
        <div>
            <div className='userProfileContainer'>
                <div className='userProfileTop'>
                    <div className='userProfileImg'></div>
                    <div className='userProfile'>
                        <div className='userInfo'>
                            <div className='userNickName'>afsadfsd</div>
                            <button>팔로잉</button>
                            <button>친구추가</button>
                        </div>
                        <div className='userHistory'>
                            <div>게시물 <span>7</span></div>
                            <div>팔로워 <span>7</span></div>
                            <div>팔로우 <span>7</span></div>
                        </div>
                        <div style={{ fontWeight: 'bold' }}>이르음</div>
                        <div className='userIntroduce'>자기소개</div>
                    </div>
                </div>


                <div className='userBoardList'>
                    <div className='userBoard'>
                        사진
                        <div className='userBoardInfo'>
                            <div className='userBoardTextBox'>
                                <div className='userBoardText'>하트 11111</div>
                                <div className='userBoardText'>댓글 11111</div>
                            </div>

                        </div>
                    </div>
                    <div className='userBoard'></div>
                    <div className='userBoard'></div>
                    <div className='userBoard'></div>

                </div>


            </div>
        </div>

    );
};
export default Info;
