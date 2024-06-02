import React from 'react';

const Button = ({ classNames, text, icon, action }) => {
    return (
        <button type="button" className={classNames} onClick={action}>
            <span style={{ marginRight: '0.5rem' }}>{icon}</span>
            {text}
        </button>
    );
};

export default Button;
