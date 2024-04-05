// icons ~

// ~ icons
import { useEffect, useState } from 'react';
import './Info.css';
import ProfileUpload from './ProfileUpload'
import { Link, useParams } from 'react-router-dom';

const Info = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [editFlg, setEditFlg] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`http://localhost:4000/getUser.dox`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: userId })
                });
                const jsonData = await response.json();
                setUser(jsonData);
            } catch (error) {
                console.error("에러!");
            }
        };
        getUser();
    }, [])
    useEffect(() => {        
        console.log(user)
    }, [user])


    return (
        <div>
            <img src="C:\Users\tj-bu-706-04\Desktop\nodeJs\profileFile\1712308541719.gif"></img>
            <div className='userProfileContainer'>
                <div className='userProfileTop'>
                    <div className='userProfileImg'></div>
                    <div className='userProfile'>
                        <div className='userInfo'>
                            <div className='userNickName'>{user.NICKNAME}</div>
                            <button>팔로잉</button>
                            <button>친구추가</button>
                            <button onClick={() => {
                                setEditFlg(true);
                            }}>프로필 수정</button>
                        </div>
                        <div className='userHistory'>
                            <div>게시물 <span>7</span></div>
                            <div>팔로워 <span>7</span></div>
                            <div>팔로우 <span>7</span></div>
                        </div>
                        <div style={{ fontWeight: 'bold' }}>{user.NAME}</div>
                        <div className='userIntroduce'>{user.INTRODUCE}</div>
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
                {editFlg && <ProfileUpload onCancel={() => {
                    setEditFlg(false);
                }}></ProfileUpload>}

            </div>
        </div>


    );
};
export default Info;
