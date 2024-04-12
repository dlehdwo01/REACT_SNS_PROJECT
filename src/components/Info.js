// icons ~
import whiteheart from './icons/whiteheart.png'
import commentIcon from './icons/commentIcon.png'
// ~ icons
import { useEffect, useState } from 'react';
import './Info.css';
import ProfileUpdate from './ProfileUpdate'
import { Link, useParams, useNavigate } from 'react-router-dom';
import BoardDetail from './BoardDetail.js'
import UserFolower from './UserFolower.js'
import UserFolowing from './UserFolowing.js'


const Info = () => {
    const navigate = useNavigate();
    const sessionId = sessionStorage.getItem('sessionId');
    const [boardDetailFlg, setBoardDetailFlg] = useState(false);
    const [detailBoardNo, setDetailBoardNo] = useState("");
    const { userId } = useParams();
    console.log(userId);
    const [user, setUser] = useState({}); //유저정보
    const [userCnt, setUserCnt] = useState({});
    const [editFlg, setEditFlg] = useState(false); //프로필 수정
    const [filePath, setFilePath] = useState("");
    const [boardList, setBoardList] = useState([]);
    const [followingFlg, setFollowingFlg] = useState(false); //현재팔로우여부flg
    const [followListFlg, setFollowListFlg] = useState(false); // 팔로워flg
    const [followingListFlg, setFollowingListFlg] = useState(false); // 팔로잉flg


    // 첫 화면 렌더링시
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
                        <div className='userBoard' key={jsonData.list[i].BOARDNO} onClick={() => {
                            document.body.style.overflow = 'hidden';
                            setDetailBoardNo(jsonData.list[i].BOARDNO);
                            setBoardDetailFlg(true);
                        }}>
                            {jsonData.list[i].FILENAME != null && <img src={filePath}></img>}
                            {jsonData.list[i].FILENAME == null && <div>{jsonData.list[i].CONTENTS}</div>}

                            <div className='userBoardInfo'>
                                <div className='userBoardTextBox'>
                                    <div className='userBoardText'><img src={whiteheart}></img> {jsonData.list[i].LIKECNT}</div>
                                    <div className='userBoardText'><img src={commentIcon}></img> {jsonData.list[i].COMMENTCNT}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
                setBoardList(list);
            } catch (error) {
                console.error("에러!");
            }
        };
        getUserBoardList();
        followingCheck();
        getUserCnt();
    }, [])
    useEffect(() => {
        // console.log(user)
        setFilePath(`http://localhost:4000/${user.FILEPATH}${user.FILENAME}`);
    }, [user])

    // 해당 유저와 팔로우 여부
    const followingCheck = async (type) => {
        try {
            const response = await fetch(`http://localhost:4000/followingCheck.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sessionId: sessionId, targetId: userId })
            });
            const jsonData = await response.json();
            setFollowingFlg(jsonData.result);

        } catch (error) {
            console.error("에러!");
        }
    };

    const getUserCnt = async () => {
        try {
            const response = await fetch(`http://localhost:4000/userCnt.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId })
            });
            const jsonData = await response.json();
            setUserCnt(jsonData);
        } catch (error) {
            console.error("에러!");
        }
    }

    // 해당 유저와의 관계 설정
    const following = async (type) => {
        try {
            const response = await fetch(`http://localhost:4000/following.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sessionId: sessionId, targetId: userId, type: type })
            });
            const jsonData = await response.json();
            followingCheck();
            getUserCnt();

        } catch (error) {
            console.error("에러!");
        }
    };


    return (
        <div className='userProfileContainer'>
            <div className='userProfileTop'>
                <div className='userProfileImg'>
                    <img src={filePath}></img>
                </div>
                <div className='userProfile'>
                    <div className='userInfo'>
                        <div className='userNickName'>{user.NICKNAME}</div>
                        {sessionId != userId && !followingFlg && <button onClick={() => {
                            following("FOLLOW");
                        }}>팔로잉</button>}
                        {sessionId != userId && followingFlg && <button onClick={() => {
                            following("FOLLOW");
                        }}>팔로잉 취소</button>}
                        {sessionId == userId && <button onClick={() => {
                            setEditFlg(true);
                        }}>프로필 수정</button>}
                    </div>
                    <div className='userHistory'>
                        <div>게시물 <span>{userCnt.BOARDCNT}</span></div>
                        <div onClick={() => {
                            setFollowListFlg(true);
                            document.body.style.overflow = 'hidden';
                        }} style={{ cursor: 'pointer' }}>팔로워 <span>{userCnt.FOLLOWERCNT}</span></div>
                        <div onClick={() => {
                            setFollowingListFlg(true);
                            document.body.style.overflow = 'hidden';
                        }} style={{ cursor: 'pointer' }}>팔로우 <span>{userCnt.FOLLOWINGCNT}</span></div>
                    </div>
                    <div style={{ fontWeight: 'bold' }}>{user.NAME}</div>
                    <div className='userIntroduce'>{user.INTRODUCE}</div>
                </div>
            </div>


            {boardList.length != 0 && <div className='userBoardList'>
                {boardList}
            </div>}
            {boardList.length == 0 &&
                <div style={{ margin: '20px auto' }}>등록된 게시물이 없습니다</div>
            }

            {editFlg && <ProfileUpdate user={user} onCancel={() => {
                setEditFlg(false);
            }}></ProfileUpdate>}

            {boardDetailFlg && <BoardDetail boardNo={detailBoardNo} fnExit={() => {
                setBoardDetailFlg(false);
            }}></BoardDetail>}
            {followListFlg && <UserFolower fnExit={() => {
                setFollowListFlg(false);
                document.body.style.overflow = 'auto';
            }} userId={userId}></UserFolower>}

            {followingListFlg && <UserFolowing fnExit={() => {
                setFollowingListFlg(false);
                document.body.style.overflow = 'auto';
            }} userId={userId}></UserFolowing>}
        </div>


    );
};
export default Info;
