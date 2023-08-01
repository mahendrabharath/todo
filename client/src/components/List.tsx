import React from "react";
import listStyles from "./List.module.css";
const Button = ({
  icon,
  text,
  onClick,
  subtext,
}: {
  icon: string;
  text: string;
  subtext: string;
  onClick: () => void;
}) => (
  <div className={listStyles.wrapper}>
    <img
      className={listStyles.list_icon}
      src={icon}
      alt=""
      width="20"
      height="20"
    />

    <div className={listStyles.text_wrapper}>
      <h3>{text}</h3>
      <p>{subtext}</p>
    </div>
    <img className={listStyles.right_arrow} src={"./right-arrow.svg"} />
  </div>
);

const List = () => (
  <>
    <Button
      icon="/rocket.svg"
      text="Lightning Fast"
      subtext="Save Time on Tasks"
      onClick={() => {}}
    />
    <Button
      icon="/bulb.svg"
      text="Secure & Reliable"
      subtext="Protext Your Data"
      onClick={() => {}}
    />
    <Button
      icon="lock.svg"
      text="Intuitive Design"
      subtext="Work Smart, Not Hard!"
      onClick={() => {}}
    />
  </>
);

export default List;
