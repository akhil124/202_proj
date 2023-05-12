import React, { useEffect, useMemo, useRef } from "react";
import { Color } from "react-bootstrap/esm/types";

interface IconProps {
  icon?: string;
  fa?: boolean;
  size?: number;
  type?: "regular" | "solid" | "brands" | "duotone" | "light";
  color?: string;
}

const Icon: React.FC<IconProps> = (props) => {
  const ref = useRef<HTMLObjectElement>(null);
  const { fa, icon, size, type, color } = props;
  const src = fa ? `/assets/icons/svgs/${type}/${icon}.svg` : icon;
  const handler = () => {
    if (ref.current?.contentDocument?.children?.[0]) {
      (ref.current.contentDocument.children[0] as HTMLElement).style.fill =
        color;
    }
  };

  return (
    <>
      {fa ? (
        <object
          ref={ref}
          data={src}
          type="image/svg+xml"
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
          onLoad={handler}
        ></object>
      ) : (
        <img
          src={src}
          alt=""
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      )}
    </>
  );
};

Icon.defaultProps = {
  fa: false,
  icon: "",
  size: 30,
  type: "regular",
  color: "black",
};

export default Icon;
