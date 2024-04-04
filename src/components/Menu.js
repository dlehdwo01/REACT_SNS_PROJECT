// icons ~
import home from './icons/home.png';
import search from './icons/search.png';
import heart from './icons/heart.png';
import plus from './icons/plus.png';
import logo from './icons/logo.png';
import more from './icons/more.png';
import close from './icons/close.png';
// ~ icons

// components ~
import Search from './Search'
import Alert from './Alert'
// ~components

import React, { useEffect, useState } from 'react';
import './Menu.css';
const Menu = () => {
    // 더보기 클릭시
    let [moreMenuFlg, setMoreMenuFlg] = useState(false);
    // 더보기 클릭 이후 다른 곳 클릭시
    useEffect(() => {
        if (moreMenuFlg) {
            const handleOutsideClick = (event) => {
                if (!event.target.closest('.moreMenuCont')) {
                    setMoreMenuFlg(false);
                    console.log(moreMenuFlg)
                }
            };
            document.addEventListener("mousedown", handleOutsideClick);
            return () => {
                document.removeEventListener('mousedown', handleOutsideClick);
            };
        }

    }, [moreMenuFlg])


    // 메뉴 클릭시
    let [searchFlg, setSearchFlg] = useState(false);
    let [alertFlg, setAlertFlg] = useState(false);
    const menuClick = (flg) => {
        setSearchFlg(false);
        setAlertFlg(false);
        flg(true);
    };



    return (
        <div>
            <div className='menuCont'>
                <div className='menuSort'>
                    <div className='logoBox'>
                        {(searchFlg || alertFlg) && <img className='menuImg' src={close} onClick={() => {
                            setSearchFlg(false);
                            setAlertFlg(false);
                        }}></img>}
                        {!(searchFlg || alertFlg) && <img className='logoImg' src={logo}></img>}
                    </div>


                    <div>
                        <img className='menuImg' src={home}></img>
                        홈</div>


                    <div onClick={() => {
                        menuClick(setSearchFlg);
                    }}>
                        <img className='menuImg' src={search}></img>
                        검색</div>


                    <div style={{ position: "relative" }} onClick={() => {
                        menuClick(setAlertFlg);
                    }}>
                        <div className='alertPoint'></div>
                        <img className='menuImg' src={heart}></img>
                        알림</div>


                    <div>
                        <img className='menuImg' src={plus}></img>
                        만들기</div>


                    <div>
                        <img className='profileImg'></img>
                        프로필</div>


                </div>

                <div className='menuSort' onClick={() => {
                    setMoreMenuFlg(true);
                }}>
                    <div>
                        <img className='menuImg' src={more}></img>
                        더보기</div>
                </div>


                {/* 메뉴 클릭시 */}
                {(searchFlg || alertFlg) && <div className='clickMenu'>
                    {searchFlg && <Search></Search>}
                    {alertFlg && <Alert></Alert>}
                </div>}

                {/* 만들기 클릭시 */}
                {false && <div className='modalBg'>
                    <div className='modalSection'>
                        <div className='sort-column gap-10'>
                            <h4>사진 등록</h4>
                            <div className='addBoardImg'>
                                <img></img>
                            </div>
                            <div><input type="file"></input></div>
                            <div></div>
                        </div>

                    </div>
                </div>}

                {/* 더보기 클릭시 */}
                {/* {moreMenuFlg &&  */}
                {moreMenuFlg && <div className='moreMenuCont'>
                    <div className='moreMenu'>로그아웃</div>
                </div>}



            </div>


        </div>
    );
}
export default Menu;