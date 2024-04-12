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

const UserFolowing = (props) => {
    const sessionId = sessionStorage.getItem("sessionId");
    const userId = props.userId;
    const [followingList, setFollowingList] = useState([]);
    const [viewList, setViewList] = useState([]);


    useEffect(() => {
        getFollowingList();
    }, [])

    useEffect(() => {
        let list = [];
        for (let i = 0; i < followingList.length; i++) {
            list.push(
                <div className='d-flex align-items-center gap-10' style={{ padding: '5px', justifyContent: 'space-between' }} key={followingList[i].USERID}>
                    <div className='d-flex gap-10'>

                        <img className='userFollwerProfileImg' src={`http://localhost:4000/${followingList[i].FILEPATH}${followingList[i].FILENAME}`}></img>

                        <div style={{ fontSize: '13px' }}>
                            <div style={{ fontWeight: 'bold' }}>{followingList[i].NICKNAME}
                                <span style={{ color: 'rgb(47, 47, 223)', cursor: 'pointer' }}> · 팔로우</span>
                            </div>
                            <div>{followingList[i].NAME}</div>
                        </div>
                    </div>
                    <div>
                        {sessionId == userId && <button className='followBtn' onClick={() => {
                            removeFollowing(followingList[i].USERID)
                        }}>삭제</button>}
                    </div>
                </div>
            )
        }
        setViewList(list);
    }, [followingList])

    // SECTION 외 다른부분 클릭시 닫힘
    const handleOutsideClick = (event) => {
        if (!event.target.closest('.userModalSection')) {
            props.fnExit();
        }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    //해당 유저의 팔로잉 리스트 가져오기
    const getFollowingList = async () => {
        try {
            const response = await fetch(`http://localhost:4000/getFollowingList.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId })
            });
            const jsonData = await response.json();
            console.log(jsonData);
            setFollowingList(jsonData);
        } catch (error) {
            console.error("에러!");
        }
    }

    // 팔로잉 삭제하기
    const removeFollowing = async (followingId) => {
        try {
            const response = await fetch(`http://localhost:4000/removeFollowing.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ followingId: followingId, sessionId: sessionId })
            });
            const jsonData = await response.json();
            if (jsonData.result == 'success') {
                getFollowingList();
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
export default UserFolowing;
