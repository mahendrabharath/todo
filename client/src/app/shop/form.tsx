"use client";
import { Suspense, useContext, useEffect, useState } from "react";
import { List } from "./page";
import { AlertColor, Button, InputAdornment, TextField } from "@mui/material";
import shopStyles from "./shop.module.scss";
import FileUpload from "@/components/FileUpload";
import { ToastContext, ToastProvider } from "@/hooks/useToast";
import ToastWrapper from "@/components/Toast/Toast";
import { BASE_URL, SHOP } from "@/configs/constants";
import Unsplash from "@/components/Unsplash/Unsplash";
import fileUploadStyles from "../../components/FileUpload/fileupload.module.css";

type TShopForm = {
  title: string;
  price: string;
  desc: string;
  url: string;
  setValue: (key: string, value: string) => void;
};

// To use loading.js
// const PostFeed = async () => {
const PostFeed = () => {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [rate, setRate] = useState("0");
  const [desc, setDesc] = useState("");
  const [url, setURL] = useState("");
  const [image, setImage] = useState<File>(null as unknown as File);
  const [imageURL, setImageURL] = useState<string>("");
  const [bought, setBought] = useState(false);
  const { setToast, setSeverity, setMessage } = useContext(ToastContext);

  const postShopList = () => {
    const payload = {
      title,
      rate,
      quantity,
      description: desc,
      url,
    };
    const imageFormData = new FormData();
    imageFormData.append("name", "Image Upload");
    if (imageURL) {
      imageFormData.append("file_type", "URL");
      imageFormData.append("file_url", imageURL);
    } else {
      imageFormData.append("file_type", "BLOB");
      imageFormData.append("file_attachment", image);
    }
    imageFormData.append("document", JSON.stringify(payload));

    console.log(imageFormData.getAll("file_attachment"));

    fetch(BASE_URL + SHOP, {
      method: "POST",
      // headers: {
      //     "Content-type": "multipart/form-data",
      //     Accept: "multipart/form-data",
      // },
      body: imageFormData,
    }).then(() => {
      setToast(true);
      setSeverity("success");
      setMessage("Saved Item!");
    });
  };

  return (
    <>
      <div className={shopStyles.shop__form}>
        <h4>Required details</h4>
        <div className={shopStyles.form_list_details}>
          <TextField
            label="Title"
            variant="standard"
            fullWidth={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            variant="standard"
            fullWidth={true}
            value={desc}
            multiline
            rows={2}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div>
            <div>
              <TextField
                label="Quantity"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img width={"25px"} src="./icons/quantity.svg" />
                    </InputAdornment>
                  ),
                }}
                value={quantity}
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <TextField
                label="Rate"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img width={"25px"} src="./icons/rupee.svg" />
                    </InputAdornment>
                  ),
                }}
                value={rate}
                type="number"
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
            <div>
              <h4>Price:{Number(rate) * Number(quantity)}</h4>
            </div>
          </div>
          <TextField
            label="URL"
            variant="standard"
            fullWidth={true}
            value={url}
            onChange={(e) => setURL(e.target.value)}
          />
        </div>
        <Button
          onClick={() => postShopList()}
          style={{ margin: "15px" }}
          variant="contained"
        >
          Save
        </Button>
      </div>
      <div className={shopStyles.image_selection_wrapper}>
        {imageURL ? (
          <div className={fileUploadStyles.fileupload__container}>
            <img src={imageURL} className={fileUploadStyles.preview__image} />
          </div>
        ) : (
          <FileUpload image="" setImage={setImage} />
        )}
        {title.length > 2 ? (
          <Unsplash onImgSelection={(url) => setImageURL(url)} query={title} />
        ) : (
          ""
        )}
      </div>
      <ToastWrapper />
    </>
  );
};
const ShopWrapper = () => (
  <ToastProvider>
    <PostFeed />
  </ToastProvider>
);

export default ShopWrapper;
