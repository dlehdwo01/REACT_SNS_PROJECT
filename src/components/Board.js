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
import BoardListOne from './BoardListOne.js'
import './Board.css';
import 'swiper/css';

const Board = () => {

    const sessionId = sessionStorage.getItem("sessionId");
    const [boardList, setBoardList] = useState([]);
    const [boardViewList, setBoardViewList] = useState([]);
    const [page, setPage] = useState(0);

    // 최하단 스크롤시 page+1
    const [ref, inView] = useInView({        
        threshold: 1,
    });
    useEffect(() => {
        if (inView) {
            setPage(page + 1);
        }
    }, [inView])

    // 게시물 리스트(BOARDNO) 가져오기
    useEffect(() => {
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
            } catch (error) {
                console.error("에러!");
            }
        }
        getBoardList();
    }, [page])

    // 게시물 리스트 출력
    useEffect(() => {
        let list = [];
        for (let i = 0; i < boardList.length; i++) {
            list.push(
                <BoardListOne boardNo={boardList[i].BOARDNO} key={boardList[i].BOARDNO}></BoardListOne>
            )
        }
        setBoardViewList([...boardViewList, ...list]);
    }, [boardList])

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
