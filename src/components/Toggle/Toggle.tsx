import React from 'react'

const Toggle = ({label, target, setTarget, disabled}) => {
    const handle = () => {
        if (disabled) return;
        setTarget(!target)
    };
    
    return (
        <>
            <div className="flex justify-between items-center">
                <span>{label}: </span>
                <div className="flex">
                    <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={target}
                            readOnly
                        />
                        <div
                            onClick={() => handle()}
                            className="w-16 h-8 bg-gray-200 rounded-full peer  peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.2rem] after:left-[0.5rem] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"
                        ></div>
                    </label>
                </div>
            </div>
        </>
    )
}

export default Toggle;
