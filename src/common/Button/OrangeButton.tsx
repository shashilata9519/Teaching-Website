import React, { ButtonHTMLAttributes } from "react";

function OrangeButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { className,...rest } = props;
    return (
        <button
            className={`ransition-all duration-400 select-none bg-amber-500 text-white font-bold text-sm rounded-full px-5 py-2 ${className}`}
            role="button"
            {...rest}
            
        />
    );
}

export default OrangeButton;
