import React, {useState} from 'react';

import '../App.css';

interface AddSearchFriendProps {
    addFriend: (inputValue: string) => void;
    searchHandler: (event: any) => void;
    isSort: boolean;
    setSort: () => void;
}

export const AddSearchFriend: React.FC<AddSearchFriendProps> = ({
                                                                    addFriend,
                                                                    searchHandler,
                                                                    isSort,
                                                                    setSort,
                                                                }) => {

    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <div className='addFriend'>
                <input value={inputValue}
                       onChange={(event) => setInputValue(event.target.value)}
                       onKeyPress={(e) => {
                           if (e.key === "Enter") {
                               addFriend(inputValue);
                               setInputValue('');
                           }
                       }}
                       className='addFriendInput' placeholder="Enter your friend's name"/>
            </div>
            <div className="search">
                <input
                    style={{fontSize: "24px"}}
                    onChange={searchHandler}
                    placeholder="Search Friend"
                />
                <button style={{color: isSort ? "green" : "white"}} onClick={setSort}>
                    Sort by Favourite
                </button>
            </div>
        </div>
    );
};
