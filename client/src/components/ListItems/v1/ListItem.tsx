import { Checkbox } from "@mui/material";
import listStyles from "./ListItem.module.css";
import moment from "moment";

const ListItem = ({
  name,
  onClick,
  toggleEditMode,
  status = false,
  description = "",
  created = 0,
  completeBy = 0,
}: {
  name: string;
  description: string;
  onClick: () => void;
  toggleEditMode: () => void;
  status: boolean;
  created: number;
  completeBy: number;
}) => {
  return (
    <div className={listStyles.wrapper} onClick={() => toggleEditMode()}>
      <div className={listStyles.created}>
        {created ? (
          <>
            <p>
              {moment(created) .fromNow().replace("year", "yr")
              .replace("minutes", "mins").replace('seconds', 'secs')}
            </p>
            <img src="/icons/clock.svg" width={"35px"} />
          </>
        ) : (
          ""
        )}
      </div>
      <div className={listStyles.title__wrapper}>
        <h3 title={name} className={listStyles.title}>
          {name}
        </h3>
        <p title={description} className={listStyles.description}>
          {description}
        </p>
        {completeBy ? (
          <span className={listStyles.completesby__wrapper}>
            <img src="/icons/sand-clock.svg" width={"35px"} />
            <p title={completeBy.toString()} className={listStyles.completesby}>
             Complete {moment(completeBy).fromNow().replace("year", "yr")}
            </p>
          </span>
        ) : (
          ""
        )}
      </div>
      <div className={listStyles.checkbox__wrapper}>
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
