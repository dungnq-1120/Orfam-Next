import { PropsIcon } from "../interfaceIcon";

export const Curated: React.FC<PropsIcon> = ({ className }) => {
  return (
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect
        width="498"
        height="498"
        x="7"
        y="7"
        rx="20"
        fill="transparent"
        stroke="transparent"
        strokeWidth="14"
        strokeOpacity="94%"
        paintOrder="stroke"
      ></rect>
      <svg width="278px" height="278px" viewBox="0 0 2048 2048" fill="currentColor" x="117" y="117" role="img" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor">
          <path
            fill="currentColor"
            d="m1155 1920l128 128H256V256h512q0-53 20-99t55-82t81-55t100-20q53 0 99 20t82 55t55 81t20 100h512v1027l-128 128V384h-128v256H512V384H384v1536h771zM640 384v128h768V384h-256V256q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50v128H640zm1389 1069l-557 558l-269-270l90-90l179 178l467-466l90 90z"
          />
        </g>
      </svg>
    </svg>
  );
};
