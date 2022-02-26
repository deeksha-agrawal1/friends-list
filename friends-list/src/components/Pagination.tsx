import React from 'react';

import '../App.css';

interface PaginationProps {
    currentPage: number;
    onNextClick: () => void;
    onPreviousClick: () => void;
    dataLength?: number;
    currentLength: number;
}

export const Pagination: React.FC<PaginationProps> = ({
                                                                                currentPage,
                                                                                onNextClick,
                                                                                onPreviousClick,
                                                                                dataLength = 0,
                                                                                currentLength = 0,
                                                                            }) => {

    return (
        <section className="footerContainer">
            <div className="footerContent">
                <button
                    style={{color: currentPage <= 1 ? "lightGrey" : "#ec645b"}}
                    onClick={onPreviousClick}
                    disabled={currentPage <= 1}
                >
                    Previous
                </button>
                <button
                    style={{color: (dataLength < 5 || currentLength < 4) ? "lightGrey" : "#ec645b"}}
                    onClick={onNextClick}
                    disabled={dataLength < 5 || currentLength < 4}
                >
                   Next
                </button>
            </div>
        </section>
    );
};
