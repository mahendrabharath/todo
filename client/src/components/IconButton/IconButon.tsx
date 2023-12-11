import { IconButton as MUIIconButton } from "@mui/material";
import { FC } from "react";

type TIconButton = { onClick: () => void; icon: string; width?: string };

const IconButton: FC<TIconButton> = ({ onClick, icon, width = "35px" }) => {
  return (
    <MUIIconButton onClick={onClick} aria-label="back" color="secondary">
      <img width={width} src={icon} />
    </MUIIconButton>
  );
};

export default IconButton;
