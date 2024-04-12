// icons ~
import heart from './icons/heart.png';
import redheart from './icons/redheart.png';
import comment from './icons/comment.png';
import exit from './icons/exit.png';
import threedotted from './icons/threedotted.png';
// ~ icons
import { useInView } from 'react-intersection-observer'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Board.css';
import 'swiper/css';

const BoardDetail = (props) => {
    const sessionId = sessionStorage.getItem("sessionId");
    const boardNo = props.boardNo;
    const [board, setBoard] = useState({}); // 게시물 정보 맵
    const [boardFile, setBoardFile] = useState([]); // 게시물 파일 리스트
    const [boardImgView, setBoardImgView] = useState([]); // 게시물 이미지 출력부분
    const [comment, setComment] = useState(""); // 코멘트 입력값
    const [commentList, setCommentList] = useState([]); // 코멘트 리스트
    const [commentView, setCommentView] = useState([]); // 코멘트 출력부분
    const [moreModalFlg, setMoreModalFlg] = useState(false); // 댓글 더보기 클릭시

    // SECTION 외 다른부분 클릭시 닫힘
    const handleOutsideClick = (event) => {
        if (!event.target.closest('.boardModalSection')) {
            props.fnExit();
            document.body.style.overflow = 'auto';
        }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    // 코멘트 가져오기
    const getComment = async () => {
        try {
            const response = await fetch(`http://localhost:4000/getComment.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ boardNo: boardNo })
            });
            const jsonData = await response.json();
            setCommentList(jsonData);
        } catch (error) {
            console.error("에러!");
        }
    };

    // 게시물 가져오기
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
            setBoard(jsonData);
        } catch (error) {
            console.error("에러!");
        }
    };

    // 게시물 파일들 가져오기
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
            setBoardFile(jsonData);
        } catch (error) {
            console.error("에러!");
        }
    };

    useEffect(() => {
        getBoard();
        getBoardFiles();
        getComment();
    }, [])

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
    }, [boardFile])

    // 코멘트 리스트 가져오기
    const addComment = async () => {
        try {
            const response = await fetch(`http://localhost:4000/addComment.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ boardNo: boardNo, userId: sessionId, comment: comment })
            });
            const jsonData = await response.json();
            getComment();
            document.querySelector("#comment").value = "";
            setComment("");

        } catch (error) {
            console.error("에러!");
        }
    };

    // 코멘트 리스트 출력
    useEffect(() => {
        let list = [];
        for (let i = 0; i < commentList.length; i++) {
            list.push(

                <div className='d-flex gap-10' style={{ overflow: 'hidden', marginBottom: '10px' }} key={commentList[i].COMMENTNO}>
                    <div className='user' style={{ width: '100%' }}>
                        <div className="d-flex profileConta">
                            <img className="profileImg" src={`http://localhost:4000/${commentList[i].FILEPATH}${commentList[i].FILENAME}`}></img>
                        </div>
                        <div>
                            <div style={{ wordBreak: 'break-all' }}>
                                <span style={{ fontWeight: 'bold' }}>{commentList[i].NICKNAME}</span> {commentList[i].CONTENTS}
                            </div>
                            <div style={{ fontSize: '12px', color: 'dimgray', display: 'flex', alignItems: 'center' }}>{commentList[i].TIMESTAMP}
                                <div style={{ position: 'relative' }}>
                                    {commentList[i].USERID == sessionId && <img src={threedotted} style={{ width: '10px', marginLeft: '5px' }} onClick={() => {
                                        moreCommentSet();
                                    }}></img>}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            )
            setCommentView(list);
        }
    }, [commentList])

    // 더보기 클릭시
    const moreCommentSet = () => {
        setMoreModalFlg(true);
        document.removeEventListener("mousedown", handleOutsideClick);
    }

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
                                <span className='moreText' style={{ fontWeight: 'bold' }} onClick={() => {
                                    alert("follow");
                                }}> · 팔로우</span>
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


            {moreModalFlg && <div className='boardModalMoreBg'>
                <div className='boardModalMoreSection'>
                    <div className='d-flex flex-column'>
                        <div className='modalSelect'>삭제</div>
                        <div style={{ padding: '10px', textAlign: 'center' }}>취소</div>
                    </div>
                </div>
            </div>}

        </div>
    );
};
export default BoardDetail;
