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

const Upload = (props) => {
    const [fileList, setFileList] = useState([]);
    const [filePreviewList, setFilePreviewList] = useState([]);
    const [fileNo, setFileNo] = useState(0);
    // console.log(props.user);


    const [user, setUser] = useState({
        ...props.user,
        boardContents: ""
    });
    useEffect(() => {
        console.log(user);
    }, [user])

    const [order, setOrder] = useState(1);
    const navigate = useNavigate();
    const [fileInfo, setFileInfo] = useState({});
    const [filePreview, setFilePreview] = useState(null);
    const [isActive, setActive] = useState(false);
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);

    // 미리보기 파일
    const previewFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                setFilePreview(reader.result); // 파일의 데이터 URL을 상태에 설정
                setFileList([...fileList, file]);
                resolve(reader.result);
            };
            reader.readAsDataURL(file); // 파일을 읽어 데이터 URL 생성                
        });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // 파일 드롭으로 추가하기
    const handleDrop = async (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFileInfo(file);
        const filePreview = await previewFile(file);

        setOrder(2);
        setActive(false);
        setFilePreviewList([...filePreviewList,
        <img className='plusImg' src={filePreview}
            onClick={() => {
                setFilePreview(filePreview);
            }} />])
    }


    // 클릭으로 파일 추가하기
    const uploadFile = async () => {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        setFileInfo(file);
        const filePreview = await previewFile(file);
        setOrder(2);
        setFilePreviewList([...filePreviewList,
        <img className='plusImg' src={filePreview}
            onClick={() => {
                setFilePreview(filePreview);
            }} />])
    };

    useEffect(() => {
        console.log(filePreviewList);
        console.log(fileList);
    }, [fileList])

    // 게시글 등록
    const fnUpload = async () => {
        const formData = new FormData();

        fileList.forEach(file => {
            formData.append('files', file);
        });

        for (const [key, value] of Object.entries(user)) {
            formData.append(key, value);
        }
        try {
            const response = await fetch('http://localhost:4000/uploadBoardFile', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data); // 서버에서 받은 응답 확인
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
    const removeItemAtIndex = (indexToRemove) => {
        setFileList(prevList => {
            return prevList.filter((_, index) => index !== indexToRemove);
        });
        setFilePreviewList(prevList => {
            return prevList.filter((_, index) => index !== indexToRemove);
        });
    };

    const fnDelete = () => {
        removeItemAtIndex(fileNo);
    };

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
                                사진 등록
                            </div>
                        </div>
                        <div className='d-flex addImgAfter'>
                            <div className='addBoardImg border'>
                                <img src={filePreview}></img>
                            </div>
                            <div>
                                <div className='d-flex boardAddProfile'>
                                    <div className='profileImgSmall'><img src={props.profilePath}></img></div>
                                    <div>{user.NICKNAME}</div>
                                </div>
                                <textarea className='textBox ' placeholder='내용을 적어주세요' onChange={(e) => {
                                    setUser({ ...user, boardContents: e.target.value });
                                }}></textarea>
                                <div><button onClick={fnUpload}>완료</button></div>
                                <div><button onClick={fnDelete}>삭제</button></div>
                            </div>
                        </div>
                        <div className='d-flex gap-10'>
                            {filePreviewList.map((preview, index) => (
                                <div key={index} onClick={() => {
                                    setFileNo(index);
                                }}>
                                    {preview}
                                </div>
                            ))}
                        </div>
                    </div>}

                {/* 사진등록 */}
                {order == 1 &&
                    <div className='sort-column gap-10'>
                        <div className='modalTitle'>
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
        </div>
    );
}
export default Upload;