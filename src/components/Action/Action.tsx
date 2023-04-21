import React from 'react'
import Toggle from '../Toggle/Toggle';
import TimeInput from '../TimeInput/TimeInput';

type ActionProp = {
    label: string,
    action: ActionObject,
    setAction: Function,
    onSubmit: Function,
}

type ActionObject = {
    toggle: Boolean,
    time1: string,
    time2: string,
    time3: string,
    interval: string,
}

const Action = (props: ActionProp) => {
    const {
        label,
        action,
        setAction,
    } = props;

    const handleAction = (value: Object) => {
        setAction((prev: ActionObject) => ({
            ...prev,
            ...value
        }));
    }

    return (
        <div className="flex flex-col gap-4 border-4 p-4">
            <div className="flex flex-col gap-4">
                <Toggle
                    label={label}
                    target={action.toggle}
                    setTarget={(value: Boolean) => handleAction({toggle: value})}
                    disabled={false}
                />
                <div className="w-100 flex justify-between gap-2">
                    <TimeInput setTime={(value: string) => handleAction({time1: value})} defaultValue={action.time1 || "00:00"} />
                    <TimeInput setTime={(value: string) => handleAction({time2: value})} defaultValue={action.time2 || "00:00"}/>
                    <TimeInput setTime={(value: string) => handleAction({time3: value})} defaultValue={action.time3 || "00:00"}/>
                </div>
                <div className="w-100 flex justify-between gap-2">
                    <span>Intervalo:</span>
                    <TimeInput setTime={setInterval} defaultValue={action.interval || "00:00"}/>
                </div>
            </div>
        </div>
    )
}

export default Action;
