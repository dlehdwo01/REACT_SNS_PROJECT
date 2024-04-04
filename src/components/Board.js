// icons ~
import heart from './icons/heart.png';
import redheart from './icons/redheart.png';
import comment from './icons/comment.png';
// ~ icons
import { Link } from 'react-router-dom';
import './Board.css';

const Board = () => {
    return (
        <div className='boardCont'>
            <div className='boardSort'>

                {/* 게시물 */}
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
                <div  style={{ marginBottom: '20px' }}>
                    더보기
                </div>

            </div>

        </div>
    );
};
export default Board;
