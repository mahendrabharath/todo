"use client";

import { Button, TextField } from "@mui/material";
import addStyles from "./add.module.css";
import { useEffect, useState } from "react";
import {useRouter} from 'next/navigation'
const Add = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  return (
    <main className={addStyles.main_wrapper}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Add Task {loading}</h1>
          <div style={{ height: "200px", width: "460px" }}>
            <TextField
              label="Title"
              helperText="Please enter a task..."
              variant="standard"
              fullWidth={true}
            />
            <Button variant="contained">Add</Button>
          </div>
          <Button
            variant="outlined"
            onClick={() => router.push('/')}
            startIcon={
              <img
                color="blue"
                height={"35px"}
                width={"35px"}
                src="/arrow-left.svg"
              />
            }
          >
            Back
          </Button>
        </>
      )}
    </main>
  );
};

export default Add;
