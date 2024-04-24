import { PropsIcon } from "../interfaceIcon";

export const Categories: React.FC<PropsIcon> = ({ className }) => {
  return (
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect
        width="512"
        height="512"
        x="0"
        y="0"
        rx="30"
        fill="transparent"
        stroke="transparent"
       strokeWidth="0"
        strokeOpacity="100%"
        paintOrder="stroke"
      ></rect>
      <svg width="400px" height="400px" viewBox="0 0 24 24" fill="currentColor" x="128" y="128" role="img" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor">
          <g fill="none" stroke="currentColor" strokeLinecap="round"strokeWidth="2">
            <path
              strokeLinejoin="round"
              d="M15.244 21.366a2.164 2.164 0 0 1-3.061 0l-8.549-8.549A2.164 2.164 0 0 1 3 11.287V5.163C3 3.97 3.97 3 5.164 3h6.123c.573 0 1.124.228 1.53.634l8.549 8.549a2.164 2.164 0 0 1 0 3.061l-6.122 6.122Z"
            />
            <path d="M6.5 6.5L7 7" />
          </g>
        </g>
      </svg>
    </svg>
  );
};
