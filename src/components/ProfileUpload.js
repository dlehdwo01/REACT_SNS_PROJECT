// icons ~
import left from './icons/left.png';
import upload from './icons/upload.png';
import exit from './icons/exit.png';
// ~ icons

// components ~

// ~components

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import { useSelector } from 'react-redux';

const ProfileUploadUpload = (props) => {
    const [user, setUser] = useState({
        id: "test",
        profileImg: "",
        introduce: ""
    });
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
        setOrder(2);
        setActive(false);
    }

    // 클릭으로 파일 추가하기
    const uploadFile = () => {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        setFileInfo(file);
        previewFile(file);
        setOrder(2);
    };

    const fnUpdate = async () => {
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
            console.log(data); // 서버에서 받은 응답 확인
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

                {/* 사진등록 후 */}
                {order == 2 &&
                    <div className='sort-column gap-10'>
                        <div className='modalTitle text-center'>

                            <span className='float-start d-absolute' onClick={() => { setOrder(1) }} style={{ cursor: 'pointer' }}><img src={left} className='prev-btn'></img></span>
                            <div className='fs-5 fw-bold d-flex justify-content-center align-items-center h-100' style={{ width: '87%' }}>
                                프로필 사진 변경
                            </div>
                        </div>
                        <div className='d-flex flex-column addImgAfter align-items-center gap-10'>
                            <div className='border rounded-circle one'>
                                <img src={filePreview}></img>
                            </div>
                            <div className='d-flex flex-column align-items-center gap-10'>
                                <span className='fs-5 fw-bold'>소개</span>
                                <textarea className='introduceInputText ' placeholder='내용을 적어주세요' onChange={(e) => {
                                    setUser({ ...user, introduce: e.target.value });                                    
                                }} ></textarea>
                                <div><button onClick={fnUpdate}>완료</button></div>
                            </div>
                        </div>
                    </div>}

                {/* 사진등록 */}
                {order == 1 &&
                    <div className='sort-column gap-10'>
                        <div className='modalTitle'>
                            <div className='fs-5 fw-bold d-flex justify-content-center align-items-center h-100' >
                                프로필 사진 변경
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
        </div>
    );
}
export default ProfileUploadUpload;