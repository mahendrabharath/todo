import { UNSPLASH } from "@/configs/constants";
import { useState, useEffect } from "react";
import unsplashStyles from "./Unsplash.module.scss";
import _ from "lodash";
import { debounce } from "@mui/material";

type TImageResponse = {
  results: {
    urls: {
      raw: string;
      regular: string;
      small: string;
    };
  }[];
};

type TUnsplash = { query: string; onImgSelection: (url: string) => void };

type TGetImages = (
  setImages: Function,
  query: string,
  setLoading: Function
) => Promise<null>;

const getImages: TGetImages = (setImages, query, setLoading) => {
  setLoading(true);
  return fetch(`${UNSPLASH}page=1&per_page=5&query=${query}`, {
    headers: {
      Authorization: "Client-ID UB2iVvwXxUu3OThsVxKbbYpapTW1DzXkpAExtNAc-kA",
    },
  })
    .then((response) => response.json())
    .then((data: TImageResponse) => {
      setImages(data.results.map(({ urls: { regular } }) => regular));
      setLoading(false);
      return null;
    });
};

const debouncedGetImages = _.debounce(getImages, 3000);

const Unsplash = ({ query, onImgSelection }: TUnsplash) => {
  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    debouncedGetImages(setImages, query, setLoading);
  }, [query]);

  const onImageClick = (url: string) => {
    if (url != selected) {
      setSelected(url);
      onImgSelection(url);
    } else {
      onImgSelection("");
      setSelected("");
    }
  };

  return (
    <div className={unsplashStyles.container}>
      {loading ? "Loading..." : ""}
      {images.map((url) => (
        <img
          onClick={() => onImageClick(url)}
          key={url}
          className={
            selected == url
              ? unsplashStyles.image__selected
              : unsplashStyles.image
          }
          src={url}
        />
      ))}
    </div>
  );
};

export default Unsplash;
