import React from "react";
import "./SlotBooking.scss";
import Icon from "../../common/Icon";

const SlotChip = ({
  time,
  handleClick,
  available = false,
  active=false,
  selected=false
}: {
  time: string;
  handleClick: Function;
  available: boolean;
  active: boolean;
  selected: boolean;
}) => {
  return (
    <div
      className={`chip-container ${available ? "" : "disabled"} ${active ? "active" : ""} ${selected ? "selected" : ""}`}
      onClick={() => handleClick()}
    >
      <div className="d-flex justify-content-between align-items-center">
        <p className="my-2">
          {time.slice(0, 2)} : {time.slice(2)}
        </p>
        <Icon
          size={30}
          icon="https://fitso-images.curefit.co/uploads/Group22726-.png"
        />
      </div>
    </div>
  );
};

export default SlotChip;
