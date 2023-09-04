'use client'
import React, { useState } from 'react';
import ShopForm from './form';
import FileUpload from '@/components/FileUpload';
import shopStyles from './shop.module.css'

export interface List {
    title: string;
    id: number;
}

type TGetData = () => Promise<List[]>;

const getData: TGetData = async () => {
    let data: List[] = [];
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
        data = await response.json();
        const parsedData = data.map(({ title, id }) => ({ title, id }));
        console.log(parsedData);
        return parsedData;
    } catch (err) {
        console.log('Error when fetching data ', err);
        return data;
    }
};


export default async function Shop() {

    return <div className={shopStyles.container}>
        <ShopForm />
        {/* <FileUpload image={image} setImage={setImage} /> */}
    </div>
}