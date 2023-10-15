"use client";
import React, { useContext, useEffect, useState } from "react";
import ShopForm from "./form";
import FileUpload from "@/components/FileUpload";
import shopStyles from "./shop.module.scss";
import { BASE_URL, SHOP } from "@/configs/constants";
import { ToastContext, ToastProvider } from "@/hooks/useToast";

export interface List {
  title: string;
  id: number;
}

type TGetData = () => Promise<List[]>;

type TShopResponse = typeof Response & {
  _id: { $oid: string };
  file: {
    file_type: "URL" | "BLOB";
    url: string;
    file_data?: { $binary: { base64: string } };
  };
  url: string;
  rate: number;
};

const getData: TGetData = async () => {
  let data: List[] = [];
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
    data = await response.json();
    const parsedData = data.map(({ title, id }) => ({ title, id }));
    console.log(parsedData);
    return parsedData;
  } catch (err) {
    console.log("Error when fetching data ", err);
    return data;
  }
};

type TShopCard = {
  title: string;
  price: number;
  quantity: number;
  image: string;
  link: string;
  id?: string;
  bought: boolean;
  fileType: "URL" | "BLOB";
};

const ShopCard = ({
  title,
  price,
  quantity,
  image,
  link,
  bought = false,
  id,
  getAllShopList,
  fileType,
}: TShopCard & { getAllShopList: () => void }) => {
  const { setToast, setSeverity, setMessage } = useContext(ToastContext);
  const updateCard = () => {
    fetch(BASE_URL + SHOP, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      // body: '{"imageFormData":""}',
      body: JSON.stringify({ id: id, bought: true }),
    }).then(() => {
      console.log("Updated");
      setToast(true);
      setSeverity("success");
      setMessage("Saved Item!");
      getAllShopList();
    });
  };
  return (
    <div onDoubleClick={() => updateCard()} className={shopStyles.shop__card}>
      <div
        className={`${shopStyles.card__text_wrapper}  ${
          bought ? shopStyles.green : ""
        }`}
      >
        <div className={shopStyles.card__main}>
          <span>
            <h3 className={shopStyles.card__title}>{title}</h3>
            <p>
              Rs. {price} x {quantity}
            </p>
          </span>
          <span>Rs. {price * quantity}</span>
        </div>
        {link && (
          <div className={shopStyles.card__link}>{link.slice(0, 45)}...</div>
        )}
      </div>
      <div className={shopStyles.shop_image}>
        {image && (
          <img
            src={fileType == "URL" ? image : `data:image/jpeg;base64,${image}`}
            width={"100%"}
          />
        )}
      </div>
    </div>
  );
};

export default async function Shop() {
  const [shopList, setShopList] = useState<TShopCard[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getAllShopList();
  }, []);

  const getAllShopList = () => {
    fetch(BASE_URL + SHOP, {
      headers: new Headers({ "content-type": "application/json" }),
    })
      .then((res) => res.json())
      .then((data) => {
        let result = data;
        result = result.map((el: TShopResponse) => ({
          ...el,
          id: el._id.$oid,
          image:
            el.file.file_type == "URL"
              ? el.file.file_data
              : el?.file?.file_data?.$binary?.base64,
          link: el.url,
          fileType: el?.file.file_type,
          price: el.rate,
        }));
        setShopList(result);
        const sum = result.reduce((acc: number, val: TShopCard) => {
          return acc + Number(val.price) * Number(val.quantity);
        }, 0);
        console.log("res ==>> ", result, sum);
        setTotal(sum);
      });
  };

  return (
    <div className={shopStyles.container}>
      <div>
        <ShopForm />
      </div>
      <div className={shopStyles.shop__details}>
        <div className={shopStyles.shop__list__wrapper}>
          <p className={shopStyles.hint}> Double tap to mark as Bought</p>
          <ToastProvider>
            {shopList.map(
              ({
                title,
                image,
                price,
                quantity,
                link,
                id,
                bought,
                fileType,
              }) => (
                <ShopCard
                  key={id}
                  title={title}
                  image={image}
                  price={price}
                  quantity={quantity}
                  link={link}
                  bought={bought}
                  id={id}
                  getAllShopList={getAllShopList}
                  fileType={fileType}
                />
              )
            )}
          </ToastProvider>
        </div>
        <div>
          <h4>Total: Rs. {total}</h4>
        </div>
      </div>
      {/* <FileUpload image={image} setImage={setImage} /> */}
    </div>
  );
}
