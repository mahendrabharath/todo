'use client'
import { ChangeEvent, useState, useRef } from "react";
import fileUploadStyles from './fileupload.module.css'

const FileUpload = ({ image, setImage }: { image: string, setImage: (arg: File) => void }) => {
    const defaultPreview = './icons/upload.svg';
    const [previewURL, setPreviewURL] = useState<string | ArrayBuffer>(defaultPreview)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const uploadFile = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
        if (files?.length) {
            const fileReader = new FileReader();
            const file = files[0]
            const { type: fileType, size: fileSize } = file
            console.log('Filereader src', fileReader.result)
            fileReader.readAsDataURL(file);

            fileReader.addEventListener('load', function () {
                console.log('Filereader loaded ', fileReader.result)
                if (fileReader.result) {
                    setPreviewURL(fileReader.result)
                    setImage(file)
                    console.log('File loaded ',file)
                }
            });
        }

    }


    return <div className={fileUploadStyles.fileupload__container}>
        <input style={{ display: 'none' }} ref={fileInputRef} type="file" id="fileInput" onChange={e => uploadFile(e)} accept="image/*" />
        <img onClick={() => {
            if (fileInputRef.current && fileInputRef.current.click) {
                fileInputRef.current.click()
            }
        }} className={fileUploadStyles.preview__image} src={previewURL as string} />
    </div>
}

export default FileUpload