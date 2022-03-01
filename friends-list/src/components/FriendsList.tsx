import React from 'react';

import '../App.css';
import favouriteIcon from "../favourite.png";
import starIcon from "../star.png";
import deleteIcon from "../delete.png";
import {FriendsList} from "./FriendsList.schema";

interface FriendsListCompProps {
    currentFriendsList: FriendsList[];
    favouriteFriend: (friend: FriendsList) => void;
    removeFriend: (friend: FriendsList) => void;
}

export const FriendsListComp: React.FC<FriendsListCompProps> = ({
                                                                    currentFriendsList,
                                                                    favouriteFriend,
                                                                    removeFriend,
                                                                }) => {


    return (
        <div className='friendsList'>
            {currentFriendsList.map((friendRow, index) => (
                <div className='friendsListContainer' key={index}>
                    <div>
                        <div>
                            {friendRow.friendName}
                        </div>
                        <div style={{fontSize: "14px"}}>
                            is your friend
                        </div>
                    </div>
                    <div className='actionButtons'>
                        <button onClick={() => favouriteFriend(friendRow)}>
                            <img src={friendRow.isSelected ? favouriteIcon : starIcon}/>
                        </button>
                        <button onClick={() => removeFriend(friendRow)}>
                            <img src={deleteIcon}/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
