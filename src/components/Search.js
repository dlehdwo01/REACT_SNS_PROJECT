import { Link } from 'react-router-dom';
import search from './icons/search.png';

import './Menu.css';

const Search = () => {
    return (
        <div>
            <div className='clickMenuCont' style={{ borderBottom: '1px solid #ccc' }}>
                <div className='sort-column'>
                    <h4>검색</h4>
                    <div>
                        <input className='search' placeholder="검색어를 입력해주세요" ></input>
                    </div>

                </div>
            </div>
            <div className='clickMenuCont'>
                <div style={{ fontWeight: '600', marginBottom: '30px' }}>최근 검색 항목</div>
                <div className='sort-column gap-10'>
                    <div>asdf</div>
                    <div>asdf</div>
                    <div>asdf</div>
                    <div>asdf</div>

                </div>

            </div>
        </div>
    );
};
export default Search;
