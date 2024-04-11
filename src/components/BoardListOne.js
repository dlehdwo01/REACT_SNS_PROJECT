// icons ~
import heart from './icons/heart.png';
import redheart from './icons/redheart.png';
import comment from './icons/comment.png';
// ~ icons
import { useInView } from 'react-intersection-observer'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/bundle';
import './Board.css';
import BoardDetail2 from './BoardDetail2.js'


const BoardListOne = (props) => {
    const sessionId = sessionStorage.getItem('sessionId');
    const [board, setBoard] = useState({});
    const [boardFile, setBoardFile] = useState([]);
    const [boardImgView, setBoardImgView] = useState([]);
    const [likeCnt, setLikeCnt] = useState("");
    const [likeThis, setLikeThis] = useState();
    const [moreContents, setMoreContents] = useState(false); // 더보기
    const [boardDetailFlg, setBoardDetailFlg] = useState(false);

    // 첫 렌더링시
    useEffect(() => {
        // 게시물 정보, 유저 정보 
        const getBoard = async () => {
            try {
                const response = await fetch(`http://localhost:4000/boardInfo.dox`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ boardNo: props.boardNo })
                });
                const jsonData = await response.json();
                // console.log(jsonData);
                setBoard(jsonData);
            } catch (error) {
                console.error("에러!");
            }
        }
        // 게시물 파일 가져오기
        const getBoardFiles = async () => {
            try {
                const response = await fetch(`http://localhost:4000/boardFiles.dox`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ boardNo: props.boardNo })
                });
                const jsonData = await response.json();
                setBoardFile(jsonData);
            } catch (error) {
                console.error("에러!");
            }
        }
        getBoard();
        getBoardFiles();

    }, [])

    // 게시물 모두 불러오면 출력
    useEffect(() => {
        let list = [];
        for (let i = 0; i < boardFile.length; i++) {
            list.push(
                <SwiperSlide key={boardFile[i].FILENO} onClick={() => {
                    setBoardDetailFlg(true);
                    document.body.style.overflow = 'hidden';
                }}>
                    <img src={`http://localhost:4000/${boardFile[i].FILEPATH}${boardFile[i].FILENAME}`} alt="file" style={{ objectFit: 'scale-down', width: '100%', height: '100%' }}></img>
                </SwiperSlide>
            )
        }
        setBoardImgView(list);
        getHeartList();
    }, [boardFile])

    // 좋아요 개수 불러오기
    const getHeartList = async () => {
        try {
            const response = await fetch(`http://localhost:4000/getBoardHeartCnt.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ boardNo: props.boardNo })
            });
            const jsonData = await response.json();
            iLikeThis();
            if (jsonData[0] == null) {
                setLikeCnt(0);
                return;
            }
            setLikeCnt(jsonData[0].LIKECNT);
        } catch (error) {
            console.error("에러!");
        }
    }

    // 이 게시물에 대한 나의 좋아요
    const iLikeThis = async () => {
        try {
            const response = await fetch(`http://localhost:4000/iLikeThis.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ boardNo: props.boardNo, userId: sessionId })
            });
            const jsonData = await response.json();
            setLikeThis(jsonData.result);
        } catch (error) {
            console.error("에러!");
        }
    }


    // 좋아요 누를시
    const setHeart = async () => {

        if (sessionId == null) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:4000/setHeart.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ boardNo: props.boardNo, userId: sessionId })
            });
            const jsonData = await response.json();
            getHeartList();
        } catch (error) {
            console.error("에러!");
        }
    }



    return (
        <div className='board'>

            <div className='user'>
                <Link to={`/home/${board.USERID}`} className='linkNickName'>
                    <img src={`http://localhost:4000/${board.FILEPATH}${board.FILENAME}`}></img>

                    <div style={{ fontWeight: 'bold' }}>
                        {board.NICKNAME}
                    </div>
                </Link>


                <div style={{ color: 'dimgray' }}><span style={{ fontWeight: 'bold', color: 'dimgray' }}>· </span> {board.TIMESTAMP}</div>
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
                >
                    {boardImgView}

                </Swiper>
            </div>
            <div className='boardFunction'>
                <div className='boardFunction'>
                    {likeThis && <img src={redheart} onClick={setHeart} />}
                    {!likeThis && <img src={heart} onClick={setHeart} />}
                </div>
            </div>
            <div className='boardLike'>좋아요 {likeCnt}개</div>
            <div className='boardContents'>
                <Link to={`/home/${board.USERID}`} className='linkNickName'><div className='contentsUser'>{board.NICKNAME}</div></Link>
                {!moreContents && <div className='contents'>{board.CONTENTS}</div>}
            </div>
            {moreContents && <div>{board.CONTENTS}</div>}
            <div onClick={() => {
                setMoreContents(!moreContents);
            }} >
                {!moreContents && <span className='moreText'>더보기</span>}
                {moreContents && <span className='moreText'>간략히</span>}
            </div>
            {/* <div><textarea className='commentBox'></textarea></div> */}
            <div className='moreText' onClick={() => {
                setBoardDetailFlg(true);
            }}>댓글보기</div>
            {boardDetailFlg && <BoardDetail2 board={board} boardFile={boardFile} fnExit={() => {
                setBoardDetailFlg(false);
            }}></BoardDetail2>}
        </div >
    );
};
export default BoardListOne;
