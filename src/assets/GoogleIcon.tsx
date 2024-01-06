import React from "react";

function GoogleIcon(props: React.SVGProps<SVGElement>) {
    return (
        <svg width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                        <a href={`${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL}/login/google`}>
                        <g clip-path="url(#clip1)">
                            <rect x="0" y="0" width="29.325" height="30" fill="transparent"></rect>
                            <path d="M29.6425 15.2806C29.6425 14.0515 29.5428 13.1546 29.327 12.2245H15.292V17.772H23.5302C23.3642 19.1506 22.4673 21.2268 20.4741 22.6219L20.4462 22.8076L24.8837 26.2454L25.1912 26.2761C28.0147 23.6683 29.6425 19.8315 29.6425 15.2806Z" fill="#4285F4"></path>
                            <path d="M15.292 29.8969C19.328 29.8969 22.7163 28.5681 25.1912 26.2761L20.4741 22.6219C19.2118 23.5022 17.5176 24.1167 15.292 24.1167C11.339 24.1167 7.9839 21.5091 6.78791 17.9049L6.61261 17.9198L1.99833 21.4908L1.93799 21.6586C4.39616 26.5417 9.44543 29.8969 15.292 29.8969Z" fill="#34A853"></path>
                            <path d="M6.78765 17.905C6.47208 16.9749 6.28945 15.9782 6.28945 14.9485C6.28945 13.9187 6.47208 12.9221 6.77105 11.992L6.76269 11.7939L2.09059 8.16553L1.93773 8.23824C0.924598 10.2646 0.343262 12.5401 0.343262 14.9485C0.343262 17.3569 0.924598 19.6323 1.93773 21.6587L6.78765 17.905Z" fill="#FBBC05"></path>
                            <path d="M15.292 5.78004C18.0989 5.78004 19.9924 6.99252 21.072 8.00576L25.2908 3.8866C22.6998 1.47824 19.328 0 15.292 0C9.44543 0 4.39616 3.35508 1.93799 8.23821L6.77131 11.992C7.9839 8.38775 11.339 5.78004 15.292 5.78004Z" fill="#EB4335"></path>
                        </g>
                        </a>
                        
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="169.325" height="30" fill="white" transform="translate(0.337402)"></rect>
                        </clipPath>
                        <clipPath id="clip1">
                            <rect width="29.325" height="30" fill="white" transform="translate(0.337402)"></rect>
                        </clipPath>
                        <clipPath id="clip2">
                            <rect width="30" height="30" fill="white" transform="translate(69.6626)"></rect>
                        </clipPath>
                        <clipPath id="clip3">
                            <rect width="30" height="30" fill="white" transform="translate(139.663)"></rect>
                        </clipPath>
                    </defs>
                </svg>
    );
}

export default GoogleIcon;
