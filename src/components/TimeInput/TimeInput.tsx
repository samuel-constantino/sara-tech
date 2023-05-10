import React from 'react';

type Props = {
    setTime: Function,
    defaultValue: string,
}

function TimeInput(props: Props) {
    const {setTime, defaultValue} = props;
    return (
        <div>
            <label htmlFor="time-input"></label>
            <input
                type="time"
                id="time-input"
                name="time-input"
                defaultValue={defaultValue}
                onChange={(e) => setTime(e.target.value)}
                className='w-20'
            />
        </div>
    );
}

export default TimeInput;