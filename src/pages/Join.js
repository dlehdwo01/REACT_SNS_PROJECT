import logo from '../components/icons/logo.png';
import cancel from '../components/icons/cancel.png';
import check from '../components/icons/check.png';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import { useNavigate, Link, json } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: "",
        name: "",
        nickName: "",
        pwd: "",
        pwdCheck: ""
    });

    const [idFlg, setIdFlg] = useState(null);
    const [nameFlg, setNameFlg] = useState(null);
    const [nickNameFlg, setNickNameFlg] = useState(null);
    const [pwdFlg, setPwdFlg] = useState(null);
    const [pwdCheckFlg, setPwdCheckFlg] = useState(null);

    const inputBlur = (e) => {
        const { id, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [id]: value
        }));
    };

    // 아이디 체크
    useEffect(() => {
        if (user.id == "") {
            return;
        }
        const idCheck = async () => {
            try {
                const response = await fetch(`http://localhost:4000/idCheck.dox`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
                const jsonData = await response.json();
                if (jsonData.result == 'success') {
                    setIdFlg(true);
                } else {
                    setIdFlg(false);
                }
            } catch (error) {
                console.error("에러!");
            }
        }
        idCheck();
    }, [user.id])

    // 이름
    useEffect(() => {
        if (user.name == "") {
            return;
        }
        setNameFlg(true);
    }, [user.name])

    // 닉네임
    useEffect(() => {
        if (user.nickName == "") {
            return;
        }
        setNickNameFlg(true);
    }, [user.nickName])

    // 비밀번호
    useEffect(() => {
        if (user.pwd == "") {
            return;
        }
        setPwdFlg(true);
    }, [user.pwd])

    // 비밀번호 확인
    useEffect(() => {
        if (user.pwdCheck == "") {
            return;
        }
        if (user.pwd == user.pwdCheck) {
            setPwdCheckFlg(true);
        } else {
            setPwdCheckFlg(false);
        }
    }, [user.pwdCheck])

    const join = () => {
        if (idFlg && nameFlg && nickNameFlg && pwdFlg && pwdCheckFlg) {
            const join = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/join.dox`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    });
                    const jsonData = await response.json();
                    if (jsonData.result == 'success') {
                        alert("회원가입 완료. 로그인을 진행해주세요");
                        navigate('/')
                    } else {
                        alert("회원가입 실패");
                    }
                } catch (error) {
                    console.error("에러!");
                }
            }
            join();
        } else{
            alert('정보 입력을 완료 후 다시 시도해주세요.')
        }
    }


    return (
        <div style={{ height: '100vh' }} className=' d-flex align-items-center'>
            <div className='loginCont'>
                <div className='loginBox' style={{ paddingBottom: '30px' }}>
                    <div className='position-relative'><img className='logoImg' src={logo}></img></div>
                    <div className='joinInfo'>친구들의 소식을 온라인으로 빠르고 쉽게 주고 받으세요.</div>
                    <div className='position-relative'><input className='loginInput' placeholder='아이디' id="id" onBlur={inputBlur}></input>
                        <div className='result'>
                            {(idFlg && idFlg != null) && <img src={check} className='resultImg'></img>}
                            {(!idFlg && idFlg != null) && <img src={cancel} className='resultImg'></img>}
                        </div>
                    </div>
                    <div className='position-relative'><input className='loginInput' placeholder='이름' id="name" onBlur={inputBlur}></input>
                        <div className='result'>
                            {(nameFlg && nameFlg != null) && <img src={check} className='resultImg'></img>}
                            {(!nameFlg && nameFlg != null) && <img src={cancel} className='resultImg'></img>}
                        </div>
                    </div>
                    <div className='position-relative'><input className='loginInput' placeholder='닉네임' id="nickName" onBlur={inputBlur}></input>
                        <div className='result'>
                            {(nickNameFlg && nickNameFlg != null) && <img src={check} className='resultImg'></img>}
                            {(!nickNameFlg && nickNameFlg != null) && <img src={cancel} className='resultImg'></img>}
                        </div>
                    </div>
                    <div className='position-relative'><input type='password' className='loginInput' placeholder='비밀번호' id="pwd" onBlur={inputBlur}></input>
                        <div className='result'>
                            {(pwdFlg && pwdFlg != null) && <img src={check} className='resultImg'></img>}
                            {(!pwdFlg && pwdFlg != null) && <img src={cancel} className='resultImg'></img>}
                        </div>
                    </div>
                    <div className='position-relative'><input type='password' className='loginInput' placeholder='비밀번호확인' id="pwdCheck" onBlur={inputBlur}></input>
                        <div className='result'>
                            {(pwdCheckFlg && pwdCheckFlg != null) && <img src={check} className='resultImg'></img>}
                            {(!pwdCheckFlg && pwdCheckFlg != null) && <img src={cancel} className='resultImg'></img>}
                        </div>
                    </div>
                    <div>
                        <button className='loginBtn' onClick={join}>가입</button>
                    </div>
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