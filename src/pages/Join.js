
import '../App.css';
import logo from '../components/icons/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: ""
    });

    const fnId = () => {
        console.log("blur", document.querySelector("#id").value);
        setUser({ ...user, id: document.querySelector("#id").value })

    };
    useEffect(() => {
        console.log("map", user);
        return;
        const idCheck = async () => {
            try {
                const response = await fetch(`http://localhost:4000/idCheck.dox`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify()
                });
                const jsonData = await response.json();
            } catch (error) {
                console.error("에러!");
            }
        }
        idCheck();
    })

    return (
        <div style={{ height: '100vh' }} className=' d-flex align-items-center'>
            <div className='loginCont'>
                <div className='loginBox' style={{ paddingBottom: '30px' }}>
                    <div><img className='logoImg' src={logo}></img></div>
                    <div className='joinInfo'>친구들의 소식을 온라인으로 빠르고 쉽게 주고 받으세요.</div>
                    <div><input className='loginInput' placeholder='아이디' id="id" onBlur={fnId}></input></div>
                    <div><input className='loginInput' placeholder='이름' id="name"></input></div>
                    <div><input className='loginInput' placeholder='닉네임' id="nickName"></input></div>
                    <div><input className='loginInput' placeholder='비밀번호' id="pwd"></input></div>
                    <div><input className='loginInput' placeholder='비밀번호확인' id="pwdCheck"></input></div>
                    <div><button className='loginBtn'>가입</button></div>
                </div>
                <div className='loginBox'>
                    <div>
                        계정이 있으신가요?
                        <Link to="/" className='LinkText'>로그인</Link>
                    </div>
                </div>
            </div>


        </div>
    );
};
export default Login;