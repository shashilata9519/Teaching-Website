import React, { ButtonHTMLAttributes } from "react";

function CapsuleButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { className,...rest } = props;
    return (
        <button
            className={`transition-all w-fit duration-400 select-none bg-white text-black text-sm rounded-full border border-cyan-300 px-2 py-1 my-2 ${className}`}
            role="button"
            {...rest}
            
        />
    );
}

export default CapsuleButton;
