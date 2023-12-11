"use client";
import { useParams, useRouter } from "next/navigation";
import IconButton from "../IconButton";
import headerStyles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { addUser } from "@/services/user";
import { getLS, setLS } from "@/services/localStorage";

const tempUserName = { first: "Guest", last: 1 };

const Header = () => {
  const router = useRouter();
  const [userName, setUserName] = useState(tempUserName);
  const params = useParams();

  console.log("params -->>. ", params);

  useEffect(() => {
    const userId = getLS("userId");
    let listGroupId = getLS("listGroupId");
    // console.log("userId -->>", userId, params);
    debugger;

    if (!listGroupId && params.id) {
      setLS("listGroupId", params.id);
      listGroupId = params.id as string;
    }

    if (listGroupId) router.replace("http://localhost:3000/add/" + listGroupId);

    if (userId == "") {
      debugger;
      addUser({
        name: tempUserName,
        createListGroup: !Boolean(listGroupId),
        listGroupId,
      })
        .then((res) => {
          console.log("Saved successfully", res.data);
          const newUserId = res.data.userId;
          const newListGroupId = res.data.newListGroupId;
          setLS("userId", newUserId);
          if (newListGroupId) {
            setLS("listGroupId", newListGroupId);
          }
          router.replace("http://localhost:3000/add/" + listGroupId);
        })
        .catch((err) => {
          // debugger;
          console.log(err, "saving data");
        });
    }
  }, []);

  return (
    <div className={headerStyles.header_wrapper}>
      <div className={headerStyles.left_wrapper}>
        <IconButton
          onClick={() => router.push("/")}
          icon="/icons/left-arrow-circle.svg"
        />
      </div>
      <div className={headerStyles.right_wrapper}>
        <IconButton onClick={() => {}} icon="/icons/profile.svg" />
        <p
          className={headerStyles.user_name}
        >{`${userName.first} ${userName.last}`}</p>
      </div>
    </div>
  );
};

export default Header;
