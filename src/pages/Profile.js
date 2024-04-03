import Menu from '../components/Menu';
import { useEffect, useState } from 'react';

const Profile = () => {
    const list = [
        { id: 1, title: '첫 번째 게시물', content: '첫 번째 게시물입니다.' },
        { id: 2, title: '두 번째 게시물', content: '두 번째 게시물입니다.' },
        { id: 3, title: '세 번째 게시물', content: '세 번째 게시물입니다.' },
        { id: 4, title: '네 번째 게시물', content: '네 번째 게시물입니다.' },
        { id: 5, title: '다섯 번째 게시물', content: '다섯 번째 게시물입니다.' },
    ];
    let [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        const snsUser = async () => {
            try {
                const response = await fetch(`http://localhost:4000/snsUser.dox`);
                const jsonData = await response.json();
                setUserInfo(jsonData[0]);
            } catch (error) {
                console.error("에러!");
            }
        }
        snsUser();
    }, [])


    return (
        <div style={{ padding: '0px 70px' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
                <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
                    <div style={{ border: '1px solid #ccc', minWidth: '125px', maxWidth: '125px', height: '125px', borderRadius: '50%', overflow: 'hidden' }}>
                        <img src="https://img.khan.co.kr/news/2023/01/02/news-p.v1.20230102.1f95577a65fc42a79ae7f990b39e7c21_P1.webp" width='100%'></img>
                    </div>
                    <div>
                        <div><h2>{userInfo.username}</h2></div>
                        <div>{userInfo.profile}</div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '75px' }}>
                                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>20</div>
                                <div >게시물</div>
                            </div>
                            <div style={{ width: '75px' }}>
                                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{userInfo.follower}</div>
                                <div>팔로워</div>
                            </div>
                            <div style={{ width: '75px' }}>
                                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{userInfo.following}</div>
                                <div>팔로잉</div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2>내가 작성한 게시글</h2>
                <div className="row">
                    {list.map(item => (
                        <div key={item.id} className="col-sm-6 col-md-4">
                            <Menu title={item.title} content={item.content} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Profile;