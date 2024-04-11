// icons ~
import left from './icons/left.png';
import upload from './icons/upload.png';
import exit from './icons/exit.png';
import pencil from './icons/pencil.png';
// ~ icons

// components ~

// ~components

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import { useSelector } from 'react-redux';

const ProfileUpdate = (props) => {

    const [user, setUser] = useState(props.user);
    const [filePath, setFilePath] = useState("");
    useEffect(() => {
        console.log(user);
        setFilePath(`http://localhost:4000/${user.FILEPATH}${user.FILENAME}`);

    }, [user])

    const [nickNameFlg, setNickNameFlg] = useState(false);

    const [order, setOrder] = useState(1);
    const navigate = useNavigate();
    const [fileInfo, setFileInfo] = useState({});
    const [filePreview, setFilePreview] = useState(null);
    const [isActive, setActive] = useState(false);
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);

    // 미리보기 파일
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setFilePreview(reader.result); // 파일의 데이터 URL을 상태에 설정
        };
        reader.readAsDataURL(file); // 파일을 읽어 데이터 URL 생성
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // 파일 드롭으로 추가하기
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFileInfo(file);
        previewFile(file);
        setOrder(1);
        setActive(false);
    }

    // 클릭으로 파일 추가하기
    const uploadFile = () => {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        setFileInfo(file);
        previewFile(file);
        setOrder(1);
    };

    // 완료처리
    const fnUpload = async () => {
        const formData = new FormData();

        formData.append('file', fileInfo);
        for (const [key, value] of Object.entries(user)) {
            formData.append(key, value);
        }
        try {
            const response = await fetch('http://localhost:4000/editProfile', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.result == "success") {
                alert("수정완료");
                window.location.reload();
            } else {
                alert("실패");
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    return (
        <div className='modalBg'>
            {/* 나가기 */}
            <div className='exitBtn' onClick={() => {
                props.onCancel();
            }}>
                <img src={exit}></img>
            </div>

            {/* 만들기 클릭시 */}
            <div className='modalSection'>

                {/* 첫번째 화면 */}
                {order == 1 &&
                    <div className='sort-column gap-10'>
                        <div className='modalTitle text-center'>

                            {/* <span className='float-start d-absolute' onClick={() => { setOrder(1) }} style={{ cursor: 'pointer' }}><img src={left} className='prev-btn'></img></span> */}
                            <div className='fs-5 fw-bold d-flex justify-content-center align-items-center h-100' >
                                프로필 수정
                            </div>
                        </div>
                        <div className='d-flex addImgAfter flex-column align-items-center gap-10'>
                            <div style={{ cursor: 'pointer' }} className='rounded-circle one ' onClick={() => {
                                setOrder(2);
                            }}>
                                {!filePreview && <img src={filePath}></img>}
                                {filePreview && <img src={filePreview}></img>}
                            </div>
                            <div>
                                {nickNameFlg && <input value={user.NICKNAME} className='profileNickName' onChange={(e) => {
                                    setUser({ ...user, NICKNAME: e.target.value })
                                }}></input>}

                                {!nickNameFlg && <span>{user.NICKNAME}</span>}
                                <img src={pencil} style={{ width: '12px', cursor: 'pointer', marginLeft: '3px' }} onClick={() => { setNickNameFlg(!nickNameFlg); }}></img>
                            </div>
                            

                            <div>
                                <textarea className='introduceInputText borderGray' placeholder='당신을 소개해보세요' onChange={(e) => {
                                    setUser({ ...user, INTRODUCE: e.target.value });

                                }} value={user.INTRODUCE}></textarea>
                            </div>
                            <div style={{marginBottom:'10px'}}>
                                <button onClick={fnUpload} className='completeBtn'>완료</button>
                            </div>

                        </div>
                    </div>}

                {/* 사진등록 */}
                {order == 2 &&
                    <div className='sort-column gap-10'>
                        <div className='modalTitle'>
                            <span className='float-start d-absolute' onClick={() => { setOrder(1) }} style={{ cursor: 'pointer' }}><img src={left} className='prev-btn'></img></span>
                            <div className='fs-5 fw-bold d-flex justify-content-center align-items-center h-100' >
                                사진 등록
                            </div>
                        </div>
                        <div className='addBoardImg'>
                            <label
                                className={`imgDropBox${isActive ? ' active' : ''}`}
                                onDragEnter={handleDragStart}  // dragstart 핸들러 추가
                                onDragLeave={handleDragEnd}  // dragend 핸들러 추가                            
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <div className='imgDropBoxBox'>
                                    <input id="fileInput" type="file" hidden={true} className='file' onChange={uploadFile}></input>
                                    <div ><img src={upload}></img></div>
                                    <div className='fs-4'> 클릭 혹은 파일을 이곳에 드롭하세요</div>
                                </div>
                            </label>
                        </div>
                    </div>}

            </div>
        </div >
    );
}
export default ProfileUpdate;