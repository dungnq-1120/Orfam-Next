import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  style?: React.CSSProperties;
  className?: string;
}

export default function Contact({ className, ...props }: SVGProps) {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      style={{ color: "currentColor", ...props.style }}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
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
      <svg
        width="420px"
        height="420px"
        viewBox="0 0 24 24"
        fill="currentColor"
        x="128"
        y="128"
        role="img"
        style={{ display: "inline-block", verticalAlign: "middle", ...props.style }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <path
            fill="currentColor"
            d="M19 7h5v2h-5V7Zm-2 5h7v2h-7v-2Zm3 5h4v2h-4v-2ZM2 22a8 8 0 1 1 16 0h-2a6 6 0 0 0-12 0H2Zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6Zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4Z"
          />
        </g>
      </svg>
    </svg>
  );
}
