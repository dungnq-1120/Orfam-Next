import { PropsIcon } from "../interfaceIcon";

export const Payment: React.FC<PropsIcon> = ({ className }) => {
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
      <svg width="256px" height="256px" viewBox="0 0 2048 2048" fill="currentColor" x="128" y="128" role="img" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor">
          <path
            fill="currentColor"
            d="M1888 256q33 0 62 12t51 35t34 51t13 62v1088q0 33-12 62t-35 51t-51 34t-62 13H160q-33 0-62-12t-51-35t-34-51t-13-62V416q0-33 12-62t35-51t51-34t62-13h1728zM160 384q-14 0-23 9t-9 23v224h1792V416q0-14-9-23t-23-9H160zm1728 1152q14 0 23-9t9-23V768H128v736q0 14 9 23t23 9h1728zm-480-384h256v128h-256v-128z"
          />
        </g>
      </svg>
    </svg>
  );
};
