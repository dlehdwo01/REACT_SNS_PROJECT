
import '../App.css';
import logo from '../components/icons/logo.png';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const onClickNav = () => {
        navigate(`/home`);
    };

    return (
        <div style={{ minHeight: '100vh' }} className=' d-flex align-items-center'>
            <div className='loginCont'>
                <div className='loginBox'>
                    <div><img className='logoImg' src={logo}></img></div>
                    <div><input className='loginInput' placeholder='아이디'></input></div>
                    <div><input className='loginInput' placeholder='비밀번호'></input></div>
                    <div><button className='loginBtn' onClick={onClickNav}>로그인</button></div>
                    <div style={{ color: '#5f5f5f' }}>―――――― <span style={{margin: '0px 10px'}}>또는</span> ――――――</div>
                    <div></div>
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