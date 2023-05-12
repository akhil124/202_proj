import React from "react";

import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400, R400 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";

import Flag from "@atlaskit/flag";

const FlagAlert = ({ success = true, message = "Success" }) => {
  return (
    <Flag
      appearance={success ? "success" : "error"}
      icon={
        <SuccessIcon
          label={success ? "Success" : "Error"}
          secondaryColor={
            success
              ? token("color.background.success.bold", G400)
              : token("color.background.danger.bold", R400)
          }
        />
      }
      id={success ? "success" : "error"}
      key={success ? "success" : "error"}
      title={message}
      description="You’re now part of Coffee Club."
      actions={[{ content: "Join the conversation" }]}
    />
  );
};

export default FlagAlert;
