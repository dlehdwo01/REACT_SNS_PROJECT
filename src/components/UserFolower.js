// icons ~
import heart from './icons/heart.png';
import redheart from './icons/redheart.png';
import comment from './icons/comment.png';
import exit from './icons/exit.png';
// ~ icons
import { useInView } from 'react-intersection-observer'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Info.css';
import 'swiper/css';

const UserFolower = (props) => {
    const sessionId = sessionStorage.getItem("sessionId");
    const userId = props.userId;
    const [followerList, setFollowerList] = useState([]);
    const [viewList, setViewList] = useState([]);


    useEffect(() => {
        getFollowerList();
    }, [])

    useEffect(() => {
        let list = [];
        for (let i = 0; i < followerList.length; i++) {
            list.push(
                <div className='d-flex align-items-center gap-10' style={{ padding: '5px', justifyContent: 'space-between' }} key={followerList[i].USERID}>
                    <div className='d-flex gap-10'>

                        <img className='userFollwerProfileImg' src={`http://localhost:4000/${followerList[i].FILEPATH}${followerList[i].FILENAME}`}></img>

                        <div style={{ fontSize: '13px' }}>
                            <div style={{ fontWeight: 'bold' }}>{followerList[i].NICKNAME}
                                <span style={{ color: 'rgb(47, 47, 223)', cursor: 'pointer' }}> · 팔로우</span>
                            </div>
                            <div>{followerList[i].NAME}</div>
                        </div>
                    </div>
                    <div>
                        {sessionId == userId && <button className='followBtn' onClick={() => {
                            removeFollower(followerList[i].USERID)
                        }}>삭제</button>}
                    </div>
                </div>
            )
        }
        setViewList(list);
    }, [followerList])

    // SECTION 외 다른부분 클릭시 닫힘
    const handleOutsideClick = (event) => {
        if (!event.target.closest('.userModalSection')) {
            props.fnExit();
        }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    //해당 유저의 팔로워 리스트 가져오기
    const getFollowerList = async () => {
        try {
            const response = await fetch(`http://localhost:4000/getFollowerList.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId })
            });
            const jsonData = await response.json();
            console.log(jsonData);
            setFollowerList(jsonData);
        } catch (error) {
            console.error("에러!");
        }
    }

    // 팔로워 삭제하기
    const removeFollower = async (followerId) => {
        try {
            const response = await fetch(`http://localhost:4000/removeFollower.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ followerId: followerId, sessionId: sessionId })
            });
            const jsonData = await response.json();
            if (jsonData.result == 'success') {
                getFollowerList();
            }
        } catch (error) {
            console.error("에러!");
        }
    }


    return (
        <div>
            <div className='userModalBg'>

                <div className='userModalSection'>
                    <div className='d-flex flex-column h-100'>
                        <div className='userFollowerTitle'>팔로워</div>
                        <div className="d-flex justify-content-center" style={{}}>
                            <input className='followSearch' placeholder='검색(미구현)'></input>
                        </div>
                        <div className='followList'>
                            {viewList}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserFolower;
