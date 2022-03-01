import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import Header from './components/Header';

import {Pagination} from "./components/Pagination";
import {AddSearchFriend} from "./components/AddSearchFriend";
import {FriendsList} from "./components/FriendsList.schema";
import {FriendsListComp} from "./components/FriendsList";

let PageSize = 4;

const App = () => {
    const [friends, setFriends] = useState<FriendsList[]>([
        {friendName: 'item 1', isSelected: false},
        {friendName: 'item 2', isSelected: true},
        {friendName: 'item 3', isSelected: false},
    ]);

    const [totalItemCount, setTotalItemCount] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSort, isSetSort] = useState(false);
    const [inputText, setInputText] = useState("");

    //handler for searching the searched friend in the list
    const searchHandler = (e: any) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    //function for sorting the friends list
    const sortList = (friendsList: FriendsList[]) => {
        const sortedList = friendsList.sort((a, b) => (a.isSelected > b.isSelected) ? -1 : 1);
        return sortedList;
    }

    //function for searching the searched friend in the list
    const filteredData = () => {
        const list = friends.filter((el) => {
            return el.friendName.toLowerCase().includes(inputText);
        });
        return list;
    }

    const currentFriendsList = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        const searchedList = inputText !== '' ? filteredData() : [...friends];
        if (!searchedList || searchedList.length == 0) {
            return [];
        }
        const newSortedList = (isSort) ? sortList(searchedList) : [...searchedList];
        return newSortedList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, friends, isSort, inputText]);

    const addFriend = (inputValue: string) => {
        const newItem = {
            friendName: inputValue,
            isSelected: false,
        };

        const newItems = [...friends, newItem];

        setFriends(newItems);
    };

    useEffect(() => {
        setTotalItemCount(friends.length);
    }, [friends.length]);

    const favouriteFriend = (item: FriendsList) => {
        const newList = [...friends];
        const index = newList.findIndex((row) => row == item);
        newList[index].isSelected = !newList[index].isSelected;

        setFriends(newList);
    };

    const removeFriend = (friend: FriendsList) => {
        const newList = friends.filter((row) => row !== friend);
        setFriends(newList);
    };

    return (
        <div className="App">
            <div className='app-background'>
                <div className='main-container'>
                    <Header/>
                    <AddSearchFriend
                        addFriend={(inputValue) => addFriend(inputValue)}
                        searchHandler={(e) => searchHandler(e)}
                        isSort={isSort}
                        setSort={() => isSetSort(!isSort)}
                    />
                    <FriendsListComp
                        currentFriendsList={currentFriendsList}
                        favouriteFriend={(friendRow) => favouriteFriend(friendRow)}
                        removeFriend={(friendRow) => removeFriend(friendRow)}
                    />
                    <Pagination
                        currentPage={currentPage}
                        onPreviousClick={() => setCurrentPage(currentPage - 1)}
                        onNextClick={() => setCurrentPage(currentPage + 1)}
                        dataLength={totalItemCount}
                        currentLength={currentFriendsList.length}
                    />
                    <div className='total'>Total: {totalItemCount}</div>
                </div>
            </div>
        </div>
    );
}

export default App;
