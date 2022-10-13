import React from 'react';

import "./styles.scss";

export const View = ({ children, className, style, onScroll }) => {
    return(
        <>
            {/* APP */}
            <div className={`view ${ className }`} style={style} onScroll={onScroll}>
                { children }
            </div>
        </>
    )
}