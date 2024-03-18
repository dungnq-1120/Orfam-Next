import { PropsIcon } from "../interfaceIcon";

export const Email: React.FC<PropsIcon> = ({ className }) => {
  return (
    <>
      <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect
          width="512"
          height="512"
          x="0"
          y="0"
          rx="48"
          fill="transparent"
          stroke="transparent"
          strokeWidth="0"
          strokeOpacity="100%"
          paintOrder="stroke"
        ></rect>
        <svg width="256px" height="256px" viewBox="0 0 24 24" fill="currentColor" x="128" y="128" role="img" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor">
            <g id="evaEmailOutline0">
              <g id="evaEmailOutline1">
                <path
                  id="evaEmailOutline2"
                  fill="currentColor"
                  d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-.67 2L12 10.75L5.67 6ZM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2a1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1Z"
                />
              </g>
            </g>
          </g>
        </svg>
      </svg>
    </>
  );
};
