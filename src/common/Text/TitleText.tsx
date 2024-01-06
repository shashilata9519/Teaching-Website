import React from "react";

function TitleText(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >
) {
    return (
        <div className={"text-[26px] font-dm font-semibold"}>{props.children}</div>
    );
}

export default TitleText;
