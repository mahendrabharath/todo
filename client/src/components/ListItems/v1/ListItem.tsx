import { Checkbox } from "@mui/material";
import listStyles from "./ListItem.module.css";

const ListItem = ({
  name,
  onClick,
  status = false,
  description = "",
}: {
  name: string;
  description: string;
  onClick: () => void;
  status: boolean;
}) => {
  return (
    <div className={listStyles.wrapper}>
      <div>
        <h3 className={listStyles.title}>{name}</h3>
        <p>{description}</p>
      </div>
      <div>
        <Checkbox
          inputProps={{ "aria-label": "Checkbox demo" }}
          // defaultChecked
          value={status}
          checked={status}
          onChange={onClick}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 48 } }}
        />
      </div>
    </div>
  );
};

export default ListItem;
