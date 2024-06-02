import React from 'react';

const Button = ({ classNames, text, icon, action, disable }) => {
    return (
        <button type="button" className={classNames} onClick={action} disabled={disable}>
            <span style={{ marginRight: '0.5rem' }}>{icon}</span>
            {text}
        </button>
    );
};

export default Button;
