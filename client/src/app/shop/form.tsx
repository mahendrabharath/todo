'use client'
import { Suspense, useEffect, useState } from "react"
import { List } from "./page"
import { Button, InputAdornment, TextField } from "@mui/material"
import shopStyles from './shop.module.css';
import FileUpload from "@/components/FileUpload";

type TShopForm = {
    title: string; price: string; desc: string; url: string; setValue: (key: string, value: string) => void
}

// To use loading.js
// const PostFeed = async () => {
const PostFeed = () => {
    const [title, setTitle] = useState('test')
    const [quantity, setQuantity] = useState('1')
    const [rate, setRate] = useState('1')
    const [desc, setDesc] = useState('test');
    const [url, setURL] = useState('www.example.com');
    const [image, setImage] = useState<File>(null as unknown as File)


    const postShopList = () => {
        const payload = {
            title,
            rate,
            quantity,
            description: desc,
            url,
        }
        const imageFormData = new FormData();
        imageFormData.append('name', 'Image Upload');
        imageFormData.append('file_attachment', image);
        imageFormData.append('document', JSON.stringify(payload))

        console.log(imageFormData.getAll('file_attachment'))

        fetch('http://localhost:3001/shop', {
            method: "POST",
            // headers: {
            //     "Content-type": "multipart/form-data",
            //     Accept: "multipart/form-data",
            // },
            // body: '{"imageFormData":""}',
            body: imageFormData,
        })
        // fetch('http://localhost:3001/shop',{method: 'POST', body: payload})
    }


    return <>
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
                                <img width={'25px'} src='./icons/quantity.svg'/>
                            </InputAdornment>
                        ),
                    }}
                    value={quantity}
                    type='number'
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <TextField
                    label="Rate"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <img width={'25px'} src='./icons/rupee.svg'/>
                            </InputAdornment>
                        ),
                    }}
                    value={rate}
                    type='number'
                    onChange={(e) => setRate(e.target.value)}
                />
                </div>
                <div><h4>Price:{Number(rate) * Number(quantity)}</h4></div>
                </div>
                <TextField
                    label="URL"
                    variant="standard"
                    fullWidth={true}
                    value={url}

                    onChange={(e) => setURL(e.target.value)}
                />
            </div>
            <Button onClick={() => postShopList()} style={{ margin: '15px' }} variant='contained'>Save</Button>
        </div>
        <div>
            <FileUpload image="" setImage={setImage} />
        </div>
    </>
}

export default PostFeed