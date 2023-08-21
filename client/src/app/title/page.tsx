// @ts-nocheck
'use client'
import ErrorBoundary from "@/components/ErrorBoundary";
import { useEffect } from "react";

const Title = (props: any) => {

  return (
    <div>
        <h1>Title: {props.name.title}</h1>
    </div>
  );
};

export default Title;
