// icons ~
import heart from './icons/heart.png';
import redheart from './icons/redheart.png';
import comment from './icons/comment.png';
// ~ icons
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import './Board.css';
import 'swiper/css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BoardDetail = () => {

    const { boardNo } = useParams(); // 게시글 번호 받기
    const [boardInfo, setBoardInfo] = useState({}); // 게시글 정보 받아오기
    const [boardImg, setBoardImg] = useState([]); // 게시글 파일들 받아오기
    const [boardImgView, setBoardImgView] = useState([]); // 게시글 파일 출력



    // 유저정보
    const [profileImg, setProfileImg] = useState();



    useEffect(() => {
        // 게시글 정보 불러오기
        const getBoard = async () => {
            try {
                const response = await fetch(`http://localhost:4000/boardInfo.dox`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ boardNo: boardNo })
                });
                const jsonData = await response.json();
                console.log(jsonData);
                setBoardInfo(jsonData);

                setProfileImg(`http://localhost:4000/${jsonData.FILEPATH}${jsonData.FILENAME}`);
            } catch (error) {
                console.error("에러!");
            }
        };

        // 게시글 파일들 불러오기
        const getBoardFiles = async () => {
            try {
                const response = await fetch(`http://localhost:4000/boardFiles.dox`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ boardNo: boardNo })
                });
                const jsonData = await response.json();
                console.log(jsonData);
                setBoardImg(jsonData);
            } catch (error) {
                console.error("에러!");
            }
        };
        getBoard();
        getBoardFiles();

    }, [])
    useEffect(() => {
        let list = [];
        for (let i = 0; i < boardImg.length; i++) {
            let path = `http://localhost:4000/${boardImg[i].FILEPATH}${boardImg[i].FILENAME}`;
            list.push(
                <SwiperSlide key={boardImg[i].FILENO}>
                    <img src={path} style={{ objectFit: 'scale-down', width: '100%', height: '100%' }}></img>
                </SwiperSlide>
            )
        }
        setBoardImgView(list);

    }, [boardImg])

    return (
        <div className='boardCont'>
            <div className='boardSort'>
                {/* 게시물 */}
                <div className='board' style={{ borderBottom: 'none' }}>

                    <div className='user'>
                        <img src={profileImg}></img>
                        <div>{boardInfo.NICKNAME}</div>
                        <div>{boardInfo.DATETIME}</div>
                    </div>

                    <div className='boardImg'>
                        <Swiper
                            // install Swiper modules
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={10}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                        >
                            {boardImgView}
                        </Swiper>
                    </div>
                    <div className='boardFunction'>
                        <div className='boardFunction'>
                            <img src={heart}></img>
                            <img src={redheart}></img>
                            <img src={comment}></img>
                        </div>
                    </div>
                    <div className='boardLike'></div>
                    <div className='d-flex flex-column gap-10'>
                        <div className='contentsUser fw-bold'>{boardInfo.NICKNAME}</div>
                        <div className='contents' style={{ overflow: 'none' }}>{boardInfo.CONTENTS}asdasd
                            asdasda
                            setBoardImgsdasdasdasdasd
                            asdasdasd
                            asdadasdasd
                            adasdasd</div>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default BoardDetail;
