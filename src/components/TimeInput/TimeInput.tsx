import React from 'react';

type Props = {
    defaultValue: string,
}

function TimeInput(props: Props) {
    const {defaultValue} = props;
    return (
        <div>
            <label htmlFor="time-input">Hora:</label>
            <input type="time" id="time-input" name="time-input" defaultValue={defaultValue}/>
        </div>
    );
}

export default TimeInput;