import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

export const fadeUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(6px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
`;

export const fadeLeft = keyframes`
    0% {
        opacity: 0;
        transform: translateX(6px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
`;
