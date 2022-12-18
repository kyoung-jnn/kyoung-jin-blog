import { keyframes } from 'styled-components';

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
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
`;

export const fadeLeft = keyframes`
    0% {
        opacity: 0;
        transform: translateX(20px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
`;

export const waving = keyframes`
    0% {
        transform: rotate(0deg);
    }
    10% {
        transform: rotate(20deg);
    }
    20% {
        transform: rotate(-8deg);
    }
    30% {
        transform: rotate(20deg);
    }
    40% {
        transform: rotate(-4deg);
    }
    50% {
        transform: rotate(10deg);
    }
    60% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;
