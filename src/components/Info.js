// icons ~

// ~ icons
import { useEffect, useState } from 'react';
import './Info.css';
import ProfileUpdate from './ProfileUpdate'
import { Link, useParams } from 'react-router-dom';


const Info = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [editFlg, setEditFlg] = useState(false);
    const [filePath, setFilePath] = useState("");
    const [boardList, setBoardList] = useState([]);
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
        const getUserBoardList = async () => {
            try {
                const response = await fetch(`http://localhost:4000/getUserBoardList.dox`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: userId })
                });
                const jsonData = await response.json();
                let list = [];

                for (let i = 0; i < jsonData.list.length; i++) {
                    let filePath = `http://localhost:4000/${jsonData.list[i].FILEPATH}${jsonData.list[i].FILENAME}`
                    list.push(
                        <div className='userBoard' key={jsonData.list[i].BOARDNO}>
                            {jsonData.list[i].FILENAME != null && <img src={filePath}></img>}
                            {jsonData.list[i].FILENAME == null && <div>{jsonData.list[i].CONTENTS}</div>}

                            <div className='userBoardInfo'>
                                <div className='userBoardTextBox'>
                                    <div className='userBoardText'>하트 11111</div>
                                    <div className='userBoardText'>댓글 11111</div>
                                </div>

                            </div>
                        </div>
                    )
                }
                setBoardList(list);
                console.log(jsonData);
            } catch (error) {
                console.error("에러!");
            }
        };
        getUserBoardList();
    }, [])
    useEffect(() => {
        // console.log(user)
        setFilePath(`http://localhost:4000/${user.FILEPATH}${user.FILENAME}`);
    }, [user])


    return (

        <div className='userProfileContainer'>
            <div className='userProfileTop'>
                <div className='userProfileImg'>
                    <img src={filePath}></img>
                </div>
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
                {boardList}
            </div>
            {editFlg && <ProfileUpdate user={user} onCancel={() => {
                setEditFlg(false);
            }}></ProfileUpdate>}

        </div>


    );
};
export default Info;
