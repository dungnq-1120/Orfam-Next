import { PropsIcon } from "../interfaceIcon";

export const Help: React.FC<PropsIcon> = ({ className }) => {
  return (
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect
        width="498"
        height="498"
        x="7"
        y="7"
        rx="30"
        fill="transparent"
        stroke="transparent"
        strokeWidth="14"
        strokeOpacity="100%"
        paintOrder="stroke"
      ></rect>
      <svg width="346px" height="346px" viewBox="0 0 24 24" fill="currentColor" x="83" y="83" role="img" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor">
          <path
            fill="currentColor"
            d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0-3a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm1.276-3.218a1 1 0 0 1-1.232-1.576l.394-.308a1.5 1.5 0 1 0-1.847-2.364l-.394.308a1 1 0 1 1-1.23-1.576l.393-.308a3.5 3.5 0 1 1 4.31 5.516l-.394.308z"
          />
        </g>
      </svg>
    </svg>
  );
};
