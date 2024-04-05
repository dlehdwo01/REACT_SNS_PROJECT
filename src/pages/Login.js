
import '../App.css';
import logo from '../components/icons/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: "",
        pwd: ""
    });

    const fnChangeValue = (e) => {
        const { id, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [id]: value }));
    };

    const [errorText, setErrorText] = useState("");

    const login = async () => {
        try {
            const response = await fetch(`http://localhost:4000/login.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const jsonData = await response.json();
            if (jsonData.result == "success") {
                navigate(`/home`);
            } else {
                setErrorText("아이디와 비밀번호를 다시 확인해주세요.")
            }
        } catch (error) {
            console.error("에러!");
        }
    };

    return (
        <div style={{ minHeight: '100vh' }} className=' d-flex align-items-center'>
            <div className='loginCont'>
                <div className='loginBox'>
                    <div><img className='logoImg' src={logo}></img></div>
                    <div><input className='loginInput' placeholder='아이디' onChange={fnChangeValue} id='id'></input></div>
                    <div><input className='loginInput' placeholder='비밀번호' type='password' onChange={fnChangeValue} id='pwd'></input></div>
                    <div><button className='loginBtn' onClick={login}>로그인</button></div>
                    <div style={{ color: '#5f5f5f' }}>―――――― <span style={{ margin: '0px 10px' }}>또는</span> ――――――</div>
                    <div className='error'>{errorText}</div>
                    {/* <div>비밀번호를 잊으셨나요?</div> */}
                </div>
                <div className='loginBox'>
                    <div>
                        계정이 없으신가요?
                        <Link to="/join" className='LinkText'>가입하기</Link>
                    </div>
                </div>
            </div>


        </div>
    );
};
export default Login;