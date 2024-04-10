/* eslint-disable react/prop-types */
import { useState } from "react";
import Popover from "@mui/material/Popover";

export default function ProfilePopover({ userData }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      {!isProfilePage && (
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div className="m-4">{userData.NAME || "username"}</div>
        </Popover>
      )}
    </div>
  );
}
