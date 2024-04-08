// icons ~
import heart from './icons/heart.png';
import redheart from './icons/redheart.png';
import comment from './icons/comment.png';
// ~ icons
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Board.css';

const Board = () => {
    const [page, setPage] = useState(1);
    const [boardNoList, setBoardNoList] = useState();
    const [boardList, setBoardList] = useState([]);
    const [boardViewList, setBoardViewList] = useState([]);

    // 게시물 리스트 가져오기
    useEffect(() => {
        const getBoardFileList = async () => {
            console.log(boardNoList);
            try {
                const response = await fetch(`http://localhost:4000/getBoardFileList.dox`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(boardNoList)
                });
                const jsonData = await response.json();
                console.log(jsonData);
            } catch (error) {
                console.error("에러!");
            }
        }
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
                const boardNoList = jsonData.map(item => item.BOARDNO);
                setBoardNoList(boardNoList); // 완료시 getBoardFileList() 실행
                console.log(jsonData);
            } catch (error) {
                console.error("에러!");
            }
        }
        getBoardList();
    }, [])
    useEffect(() => {
        // const getBoardFileList = async () => {
        //     console.log(boardNoList);
        //     try {
        //         const response = await fetch(`http://localhost:4000/getBoardFileList.dox`, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(boardNoList)
        //         });
        //         const jsonData = await response.json();
        //         console.log(jsonData);
        //     } catch (error) {
        //         console.error("에러!");
        //     }
        // }
        // getBoardFileList();
    }, [boardNoList])

    // 게시물 리스트 출력
    useEffect(() => {

        let list = [];
        for (let i = 0; i < boardList.length; i++) {
            let path = `http://localhost:4000/${boardList[i].FILEPATH}${boardList[i].FILENAME}`;
            list.push(
                <div className='board' key={boardList[i].BOARDNO}>
                    <div className='user'>
                        <img src={path}></img>
                        <div>{boardList[i].NICKNAME}</div>
                        <div>{boardList[i].DATEFORM}</div>
                    </div>
                    <div className='boardImg'>

                    </div>
                    <div className='boardFunction'>
                        <div className='boardFunction'>
                            <img src={heart}></img>
                            <img src={redheart}></img>
                            <img src={comment}></img>
                        </div>
                    </div>
                    <div className='boardLike'>asd</div>
                    <div className='boardContents'>
                        <div className='contentsUser'>아이디가길어짐녕ㄹ면ㅇ렴ㄴㅇ렴녕려</div>
                        <div className='contents'>게시글 양 많아지면 다다 ㅁㄴㅇaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa내용</div>
                    </div>
                    <div>더보기</div>
                    <div>댓글보기</div>
                </div>
            )
        }
        setBoardViewList(list);
        console.log(list);

    }, [boardList])


    return (
        <div className='boardCont'>
            <div className='boardSort'>
                {/* 게시물 */}
                {boardViewList}
                <div className='board'>
                    <div className='user'>
                        <img></img>
                        <div>아이디</div>
                        <div>시간*일</div>
                    </div>
                    <div className='boardImg'>

                    </div>
                    <div className='boardFunction'>
                        <div className='boardFunction'>
                            <img src={heart}></img>
                            <img src={redheart}></img>
                            <img src={comment}></img>
                        </div>
                    </div>
                    <div className='boardLike'>asd</div>
                    <div className='boardContents'>
                        <div className='contentsUser'>아이디가길어짐녕ㄹ면ㅇ렴ㄴㅇ렴녕려</div>
                        <div className='contents'>게시글 양 많아지면 다다 ㅁㄴㅇaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa내용</div>
                    </div>
                    <div>더보기</div>
                    <div>댓글보기</div>
                </div>
                <div className='board'>
                    <div className='user'>
                        <img></img>
                        <div>아이디</div>
                        <div>시간*일</div>
                    </div>
                    <div className='boardImg'>

                    </div>
                    <div className='boardFunction'>
                        <div className='boardFunction'>
                            <img src={heart}></img>
                            <img src={redheart}></img>
                            <img src={comment}></img>
                        </div>
                    </div>
                    <div className='boardLike'>asd</div>
                    <div className='boardContents'>
                        <div className='contentsUser'>아이디가길어짐녕ㄹ면ㅇ렴ㄴㅇ렴녕려</div>
                        <div className='contents'>게시글 양 많아지면 다다 ㅁㄴㅇaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa내용</div>
                    </div>
                    <div>더보기</div>
                    <div>댓글보기</div>
                </div>

                {/* 더보기 */}
                <div style={{ marginBottom: '20px' }}>
                    더보기
                </div>

            </div>

        </div>
    );
};
export default Board;
