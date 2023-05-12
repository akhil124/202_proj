import React from "react";

import Avatar from "@atlaskit/avatar";

const AvatarCircle = ({ src = "" }) => {
  return (
    <Avatar appearance="circle" src={src} size="large" name="Scott Farquhar" />
  );
};

export default AvatarCircle;
