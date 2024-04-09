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
import './Board.css';
import 'swiper/css';

const Board = () => {
    const [page, setPage] = useState(0);
    const [boardNoList, setBoardNoList] = useState([]);
    const [boardList, setBoardList] = useState([]);
    const [boardFileList, setBoardFileList] = useState([]);
    const [boardViewList, setBoardViewList] = useState([]);

    const [ref, inView] = useInView({
        /* 옵션 설정 가능 */
        threshold: 1,
    });
    useEffect(() => {
        console.log(page);
        if (inView) {
            setPage(page + 1);
        }
    }, [inView])

    // 페이지 증가시
    useEffect(() => {
        return;
        const changedPage = async () => {
            try {
                const response = await fetch(`http://localhost:4000/getBoardList.dox`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ page: page })
                });
                const jsonData = await response.json();
                setBoardList(jsonData);
                const boardNoList = await jsonData.map(item => item.BOARDNO);
                setBoardNoList(boardNoList);
            } catch (error) {
                console.error("에러!");
            }
        }
        changedPage();
    }, [page])

    // 게시물 리스트 가져오기
    useEffect(() => {
        // 게시물 리스트 가져오기
        const getBoardList = async () => {
            try {
                const response = await fetch(`http://localhost:4000/getBoardList.dox`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ page: page })
                });
                const jsonData = await response.json();
                setBoardList(jsonData);
                const boardNoList = await jsonData.map(item => item.BOARDNO);
                setBoardNoList(boardNoList);

            } catch (error) {
                console.error("에러!");
            }
        }

        getBoardList();
    }, [page])

    useEffect(() => {
        // 게시물 첨부파일 가져오기
        const getBoardFileList = async () => {
            try {
                const response = await fetch(`http://localhost:4000/getBoardFileList.dox`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ list: boardNoList })
                });
                const jsonData = await response.json();
                console.log(jsonData)
                setBoardFileList(jsonData);
            } catch (error) {
                console.error("에러!");
            }
        }
        getBoardFileList();
    }, [boardNoList])

    // 좋아요 클릭시
    const setHeart = async (boardNo) => {
        try {
            const response = await fetch(`http://localhost:4000/setHeart.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ boardNo: boardNo })
            });
            const jsonData = await response.json();
            console.log(jsonData)
        } catch (error) {
            console.error("에러!");
        }
    }


    // 게시물 리스트 출력
    useEffect(() => {
        let list = [];
        for (let i = 0; i < boardList.length; i++) {
            let path = `http://localhost:4000/${boardList[i].FILEPATH}${boardList[i].FILENAME}`;
            list.push(
                <div className='board' key={boardList[i].BOARDNO}>

                    <div className='user'>

                        <img src={path}></img>
                        <Link to={`/home/${boardList[i].USERID}`}>
                            <div>
                                {boardList[i].NICKNAME}
                            </div>
                        </Link>
                        <div>{boardList[i].DATEFORM}</div>
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
                        // onSwiper={(swiper) => console.log(swiper)}
                        // onSlideChange={() => console.log('slide change')}
                        >
                            {boardFileList.map(file => (
                                file.BOARDNO === boardList[i].BOARDNO && (
                                    <SwiperSlide key={file.FILENO}>
                                        <img src={`http://localhost:4000/${file.FILEPATH}${file.FILENAME}`} alt="file" style={{ objectFit: 'scale-down', width: '100%', height: '100%' }}></img>
                                    </SwiperSlide>
                                )
                            ))}
                        </Swiper>
                    </div>
                    <div className='boardFunction'>
                        <div className='boardFunction'>
                            <img src={heart} onClick={() => { }}></img>
                            <img src={redheart}></img>
                            <img src={comment}></img>
                        </div>
                    </div>
                    <div className='boardLike'></div>
                    <div className='boardContents'>
                        <div className='contentsUser'>{boardList[i].NICKNAME}</div>
                        <div className='contents'>{boardList[i].CONTENTS}</div>
                    </div>
                    <div>더보기</div>
                    <div>댓글보기</div>
                </div >
            )
        }
        setBoardViewList([...boardViewList, ...list]);
        console.log(boardViewList);
        // setBoardViewList(list);
    }, [boardFileList])


    return (
        <div className='boardCont' id='board'>
            <div className='boardSort'>
                {/* 게시물 */}
                {boardViewList}


                {/* 더보기 */}
                {boardViewList.length == 10 && <div style={{ marginBottom: '20px' }} ref={ref}>
                    더보기
                </div>}

            </div>

        </div>
    );
};
export default Board;
