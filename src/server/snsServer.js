const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
app.use(express.json());

const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString('hex');

const maxTime = 1000 * 60 * 10;

const sessionObj = {
    secret: secret,
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({ checkPeriod: maxTime }),
    cookie: {
        maxAge: maxTime,
        secure: true
    },
};
app.use(cookieParser());
app.use(session(sessionObj));

app.set('trust proxy', 1) // trust first proxy


//ejs 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '.')); // .은 경로(같은 디렉토리 내 존재시), 폴더 분리시 /server 등 이런식으로 기재함

app.use('/profileFile', express.static(path.join(__dirname, './profileFile')));
app.use('/boardFile', express.static(path.join(__dirname, './boardFile')));

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test1234',
    database: 'sns'
});

connection.connect();

// 프로필 파일 저장 디렉토리
const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'profileFile/') // uploads 폴더에 저장
    },
    filename: function (req, file, cb) {
        const lastModified = file.lastModified || Date.now(); // 파일의 lastModified 값 가져오기
        const extension = path.extname(file.originalname); // 파일의 확장자 가져오기
        const fileName = `${lastModified}${extension}`; // 파일명을 lastModified 값으로 설정하여 저장
        cb(null, fileName);
    }
});

// 프로필 파일 업로드를 처리할 미들웨어 생성
const profileFileUpload = multer({
    storage: profileStorage,
    fileFilter: function (req, file, cb) {
        if (file) {
            // 파일의 lastModified 정보 가져오기
            const lastModified = file.lastModified || new Date().getTime(); // 파일의 lastModified가 없을 경우 현재 시간 사용
            req.lastModified = lastModified; // req 객체에 lastModified 정보 저장
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}).single('file');;

// 프로필 수정
app.post('/editProfile', (req, res) => {
    profileFileUpload(req, res, (err) => {
        if (err) {
            // 파일 업로드 중 오류 처리
            console.error('Error uploading file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log(req.body);
        const map = req.body;
        const { file, lastModified } = req; // 업로드된 파일 정보와 lastModified 정보 가져오기
        // 파일 있을시 진행
        if (file) {
            const extension = file.filename.split('.').pop();

            // MySQL에 파일 정보 및 lastModified 정보 저장
            const query = `UPDATE TBL_USER SET NICKNAME=?,INTRODUCE=?,FILEPATH=?,FILENAME=?,FILEORGNAME=?,FILESIZE=?,FILEETC=? WHERE USERID=?`;
            connection.query(query, [map.NICKNAME, map.INTRODUCE, 'profileFile/', lastModified + '.' + extension, file.originalname, file.size, extension, map.USERID], (error, results) => {
                if (error) {
                    console.error('Error saving file info to database:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                } else {
                    return res.json({ message: 'File uploaded successfully', result: 'success' });
                }
            });
        } else {
            // 파일 없을시 진행
            const query = `UPDATE TBL_USER SET NICKNAME=?,INTRODUCE=? WHERE USERID=?`;
            connection.query(query, [map.NICKNAME, map.INTRODUCE, map.USERID], (error, results) => {
                if (error) {
                    console.error('Error saving file info to database:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                } else {
                    return res.json({ message: 'File uploaded successfully', result: 'success' });
                }
            });
        }

    });
});

// 게시물 파일 저장 디렉토리
const boardFileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'boardFile/') // uploads 폴더에 저장
    },
    filename: function (req, file, cb) {
        const lastModified = file.lastModified || Date.now(); // 파일의 lastModified 값 가져오기
        const extension = path.extname(file.originalname); // 파일의 확장자 가져오기
        const fileName = `${lastModified}${extension}`; // 파일명을 lastModified 값으로 설정하여 저장
        cb(null, fileName);
    }
});

// 게시물 파일 업로드를 처리할 미들웨어 생성
const boardFileUpload = multer({
    storage: boardFileStorage,
    fileFilter: function (req, file, cb) {
        if (file) {
            // 파일의 lastModified 정보 가져오기
            const lastModified = file.lastModified || new Date().getTime(); // 파일의 lastModified가 없을 경우 현재 시간 사용
            req.lastModified = lastModified; // req 객체에 lastModified 정보 저장
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    }
}).array('files', 10);


// 게시글 작성 및 파일 업로드 처리
app.post('/uploadBoardFile', (req, res) => {
    boardFileUpload(req, res, (err) => {
        if (err) {
            // 파일 업로드 중 오류 처리
            console.error('Error uploading file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const map = req.body;
        var boardNo = "";

        // 게시글 정보 저장
        connection.query(`INSERT INTO TBL_BOARD VALUES(null, ?, ?, now())`, [map.id, map.boardContents], (error, results) => {
            if (error) {
                console.error('Error saving board info to database:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            boardNo = results.insertId; // 삽입된 게시글의 ID 가져오기

            // 파일 정보 저장을 위한 배열 생성
            const fileInsertPromises = [];

            // 각 파일에 대한 정보를 저장하기 위한 반복문
            req.files.forEach((file) => {
                const extension = file.filename.split('.').pop();

                // 파일 정보를 저장하는 쿼리를 Promise로 생성하여 배열에 추가
                const fileInsertPromise = new Promise((resolve, reject) => {
                    const query = `INSERT INTO TBL_BOARD_FILE (FILENO, BOARDNO, FILEPATH, FILENAME, FILEORGNAME, FILESIZE, FILEETC) VALUES (null, ?, ?, ?, ?, ?, ? )`;
                    connection.query(query, [boardNo, 'boardFile/', file.filename, file.originalname, file.size, extension], (error, results) => {
                        if (error) {
                            console.error('Error saving file info to database:', error);
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                });

                fileInsertPromises.push(fileInsertPromise); // 생성한 Promise를 배열에 추가
            });

            // 모든 파일 정보 저장이 완료되면 응답 전송
            Promise.all(fileInsertPromises)
                .then(() => {
                    return res.json({ message: 'File uploaded successfully' });
                })
                .catch((error) => {
                    return res.status(500).json({ error: 'Internal server error' });
                });
        });
    });
});


// 해당 유저 게시글 목록 불러오기
app.post('/getUserBoardList.dox', function (req, res) {
    var map = req.body;
    console.log(map);
    connection.query("SELECT * FROM tbl_board b left JOIN tbl_board_file f ON b.BOARDNO=f.BOARDNO WHERE userid=? GROUP BY b.boardno", [map.id], function (error, results, fields) {
        if (error) {
            console.error('Error inserting user into database: ' + error.stack);
            res.status(500).send('Error inserting user into database');
            throw error;
        };
        res.send({ list: results });
    });
})

// 중복체크
app.post('/idCheck.dox', function (req, res) {
    var map = req.body;
    connection.query("SELECT * FROM tbl_user WHERE USERID=?", [map.id], function (error, results, fields) {
        if (error) {
            console.error('Error inserting user into database: ' + error.stack);
            res.status(500).send('Error inserting user into database');
            throw error;
        };
        if (results.length == 0) {
            res.send({ result: 'success' });
        } else {
            res.send({ result: 'failed' });
        }
    });
})

// 회원가입
app.post('/join.dox', function (req, res) {
    var map = req.body;
    connection.query("INSERT INTO TBL_USER (USERID,PWD,NAME,NICKNAME,CDATETIME) VALUES(?,?,?,?,now())", [map.id, map.pwd, map.name, map.nickName], function (error, results, fields) {
        if (error) {
            console.error('Error inserting user into database: ' + error.stack);
            res.status(500).send('Error inserting user into database');
            throw error;
        };
        res.send({ result: 'success' });
    });
})

// 로그인
app.post('/login.dox', function (req, res) {
    var map = req.body;

    connection.query("SELECT * FROM TBL_USER WHERE USERID=? AND PWD=?", [map.id, map.pwd], function (error, results, fields) {
        if (error) {
            console.error('Error inserting user into database: ' + error.stack);
            res.status(500).send('Error inserting user into database');
            throw error;
        };
        if (results.length === 0) {
            res.send({ result: "failed" })
        } else {
            req.session.userId = results[0].USERID
            req.session.save();
            console.log(req.session);
            res.send({ result: "success" })
        }
    });
})

// 해당 유저 정보 불러오기
app.post('/getUser.dox', function (req, res) {
    console.log(req.session.userId);
    var map = req.body;


    connection.query("SELECT * FROM TBL_USER WHERE USERID=?", [map.id], function (error, results, fields) {
        if (error) {
            console.error('Error inserting user into database: ' + error.stack);
            res.status(500).send('Error inserting user into database');
            throw error;
        };
        res.send(results[0]);

    });
})

// 해당 게시글 불러오기
app.post('/boardInfo.dox', function (req, res) {
    var map = req.body;
    const query = "SELECT *,DATE_FORMAT(b.cdatetime,'%y년 %m월 %d일') AS DATETIME FROM tbl_board b INNER JOIN tbl_user u ON b.USERID=u.USERID WHERE BOARDNO=?"
    connection.query(query, [map.boardNo], function (error, results, fields) {
        if (error) {
            console.error('Error inserting user into database: ' + error.stack);
            res.status(500).send('Error inserting user into database');
            throw error;
        };
        res.send(results[0]);
        console.log(results);

    });
})

// 해당 게시글의 파일들 불러오기
app.post('/boardFiles.dox', function (req, res) {
    var map = req.body;
    const query = "SELECT * FROM tbl_board_file WHERE BOARDNO=?"
    connection.query(query, [map.boardNo], function (error, results, fields) {
        if (error) {
            console.error('Error inserting user into database: ' + error.stack);
            res.status(500).send('Error inserting user into database');
            throw error;
        };
        res.send(results);
    });
})

// 전체 게시물 불러오기
app.post('/getBoardList.dox', function (req, res) {
    const map = req.body;
    console.log(map);
    connection.query("SELECT *,DATE_FORMAT(B.CDATETIME,'%y년 %m월 %d일 %h시%i분') AS DATEFORM  FROM tbl_board B INNER JOIN tbl_user U ON B.USERID = U.USERID ORDER BY B.CDATETIME DESC LIMIT ?,10", [map.page], function (error, results, fields) {
        if (error) {
            console.error('Error inserting user into database: ' + error.stack);
            res.status(500).send('Error inserting user into database');
            throw error;
        };
        res.send(results);
    });
})

// 전체 게시물 파일 불러오기
app.post('/getBoardFileList.dox', function (req, res) {
    const map = req.body;
    console.log(map);
    connection.query("SELECT * FROM TBL_BOARD_FILE WHERE BOARDNO IN (?)", [map], function (error, results, fields) {
        if (error) {
            console.error('Error inserting user into database: ' + error.stack);
            res.status(500).send('Error inserting user into database');
            throw error;
        };
        res.send(results);
    });
})


app.get('/sessionCheck.dox', function (req, res) {
    var map = req.query;
})


app.listen(4000);