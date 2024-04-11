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
import './Board.css';
import 'swiper/css';

const BoardDetail2 = (props) => {
    const sessionId = sessionStorage.getItem("sessionId");
    const [board, setBoard] = useState(props.board);
    const [boardFile, setBoardFile] = useState(props.boardFile);
    const [boardImgView, setBoardImgView] = useState([]);
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [commentView, setCommentView] = useState([]);

    // 코멘트 가져오기
    const getComment = async () => {
        try {
            const response = await fetch(`http://localhost:4000/getComment.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ boardNo: board.BOARDNO })
            });
            const jsonData = await response.json();
            console.log(jsonData);
            setCommentList(jsonData);
        } catch (error) {
            console.error("에러!");
        }
    };

    useEffect(() => {
        let list = [];
        for (let i = 0; i < boardFile.length; i++) {
            list.push(
                <SwiperSlide key={boardFile[i].FILENO}>
                    <img src={`http://localhost:4000/${boardFile[i].FILEPATH}${boardFile[i].FILENAME}`} alt="file" style={{ objectFit: 'scale-down', width: '100%', height: '100%' }}></img>
                </SwiperSlide>
            )
        }
        setBoardImgView(list);
        getComment();
    }, [])

    const addComment = async () => {
        try {
            const response = await fetch(`http://localhost:4000/addComment.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ boardNo: board.BOARDNO, userId: sessionId, comment: comment })
            });
            const jsonData = await response.json();
            getComment();
            document.querySelector("#comment").value = "";
            setComment("");

        } catch (error) {
            console.error("에러!");
        }
    };

    useEffect(() => {
        let list = [];
        for (let i = 0; i < commentList.length; i++) {
            list.push(
                <div>
                    <div className='d-flex gap-10' style={{ overflow: 'hidden', marginBottom: '10px' }} key={commentList[i].COMMENTNO}>
                        <div className='user' style={{ width: '100%' }}>
                            <div className="d-flex profileConta">
                                <img className="profileImg" src={`http://localhost:4000/${commentList[i].FILEPATH}${commentList[i].FILENAME}`}></img>
                            </div>
                            <div>
                                <div style={{ wordBreak: 'break-all' }}>
                                    <span style={{ fontWeight: 'bold' }}>{commentList[i].NICKNAME}</span> {commentList[i].CONTENTS}
                                </div>
                                <div style={{ fontSize: '12px', color: 'dimgray' }}>{commentList[i].TIMESTAMP}</div>
                            </div>

                        </div>

                    </div>

                </div>
            )
            setCommentView(list);
        }
    }, [commentList])
    return (
        <div>
            <div className='boardModalBg'>
                {/* 나가기 */}
                <div className='exitBtn' onClick={() => {
                    props.fnExit();
                    document.body.style.overflow = "auto";
                }}>
                    <img src={exit}></img>
                </div>


                <div className='boardModalSection'>
                    <div className='d-flex w-100 h-100'>
                        <div className='boardModalLeft'>
                            <div className='boardModalImg'>
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
                        </div>
                        <div className='boardModalRight w-50'>
                            <div className='user' style={{ borderBottom: '1px solid #ccc', padding: '15px' }}>
                                <Link to={`/home/`} className='linkNickName'>
                                    <img src={`http://localhost:4000/${board.FILEPATH}${board.FILENAME}`}></img>
                                    <div style={{ fontWeight: 'bold' }}>
                                        {board.NICKNAME}
                                    </div>
                                </Link>
                                <span className='moreText' style={{ fontWeight: 'bold' }}> · 팔로우</span>
                            </div>

                            <div className='boardModalContents'>
                                <div className='boardModalContentsText'>{board.CONTENTS}</div>
                                <div className='boardModalContentsComment'>
                                    {commentView}
                                </div>
                                <div className='boardModalContentsCommentWrite'>
                                    <textarea placeholder='댓글을 입력하세요' onChange={(e) => {
                                        setComment(e.target.value)
                                    }} id="comment"></textarea>
                                    <button onClick={addComment}>등록하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BoardDetail2;
