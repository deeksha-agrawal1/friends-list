import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import Header from './components/Header';

import favouriteIcon from './favourite.png';
import starIcon from './star.png';
import deleteIcon from './delete.png';
import {Pagination} from "./components/Pagination";

let PageSize = 4;

const App = () => {
  const [friends, setFriends] = useState([
    { friendName: 'item 1', isSelected: false },
    { friendName: 'item 2', isSelected: true },
    { friendName: 'item 3', isSelected: false },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [totalItemCount, setTotalItemCount] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSort, isSetSort] = useState(false);
  const [inputText, setInputText] = useState("");

  const searchHandler = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const sortList = () => {
    const sortedList = friends.sort((a, b) => (a.isSelected > b.isSelected) ? -1 : 1);
    return sortedList;
  }

  const filteredData = () => {
    const list = friends.filter((el) => {
      return el.friendName.toLowerCase().includes(inputText);
    });
    return list;
  }

  const currentFriendsList = useMemo( () => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const searchedList = inputText !== '' ? filteredData() : [...friends] ;
    if(!searchedList || searchedList.length == 0){
      return [];
    }
    const newSortedList = (isSort) ? sortList() : [...searchedList];
    return newSortedList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, friends, isSort, inputText]);

  const addFriend = () => {
    const newItem = {
      friendName: inputValue,
      isSelected: false,
    };

    const newItems = [...friends, newItem];

    setFriends(newItems);
    setInputValue('');
  };

  useEffect( () => {
    setTotalItemCount(friends.length);
  },[friends.length]);

  const favouriteFriend = (item: any) => {
    const newList = [...friends];
    const index = newList.findIndex((row) => row == item);
    newList[index].isSelected = !newList[index].isSelected;

    setFriends(newList);
  };

  const removeFriend = (friend: any) => {
    const newList = friends.filter((row) => row !== friend);
    setFriends(newList);
  };

  return (
    <div className="App">
      <div className='app-background'>
        <div className='main-container'>
          <Header/>
          <div className='add-item-box'>
            <input value={inputValue}
                   onChange={(event) => setInputValue(event.target.value)}
                   onKeyPress={(e) => {
                     if (e.key === "Enter") {
                       addFriend()
                     }
                   }}
                   className='add-item-input' placeholder="Enter your friend's name" />
          </div>
          <div className="search">
            <input
                style={{fontSize: "24px"}}
                onChange={searchHandler}
                placeholder="Search Friend"
            />
          <button style={{color: isSort ? "green" : "white"}} onClick={() => isSetSort(!isSort)}>
            Sort by Favourite
          </button>
          </div>
          <div className='item-list'>
            {currentFriendsList.map((friendRow, index) => (
                <div className='item-container' key={index} >
                  <div>
                    <div className='item-name'>
                      {friendRow.friendName}
                    </div>
                    <div style={{fontSize: "14px"}}>
                      is your friend
                    </div>
                  </div>
                  <div className='quantity'>
                    <button onClick={() => favouriteFriend(friendRow)}>
                      <img src={friendRow.isSelected ? favouriteIcon : starIcon} />
                    </button>
                    <button onClick={() => removeFriend(friendRow)}>
                      <img src={deleteIcon} />
                    </button>
                  </div>
                </div>
            ))}
          </div>
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
