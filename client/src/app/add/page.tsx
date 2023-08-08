"use client";

import { Alert, Button, Checkbox, Snackbar, TextField } from "@mui/material";
import addStyles from "./add.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL, LIST } from "@/configs/constants";
import { Button as ListButton } from "@/components/List";
import ListItem from "@/components/ListItems/v1/ListItem";

const Add = () => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [list, setList] = useState([]);
  const [toast, setToast] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllTodo();
  }, []);

  const getAllTodo = () => {
    fetch(BASE_URL + LIST, {
      headers: new Headers({'content-type': 'application/json'}),
    })
      .then((res) => res.json())
      .then((data) => {
        let result = data;
        result = result.map(
          (el: typeof Response & { _id: { $oid: string } }) => ({
            ...el,
            id: el._id.$oid,
          })
        );
        setList(result);
        console.log("res ==>> ", result);
      });
  };

  const addTodo = () => {
    debugger;
    if (!title) return;
    const body = {
      title,
      description,
      status: false,
    };
    fetch(BASE_URL + LIST, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log("Saved successfully");
        debugger;
        setToast(true);
        setTitle("");
        setDesc("");
        getAllTodo();
      })
      .catch((err) => {
        debugger;
        console.log(err, "saving data");
      });
  };

  const updateTodo = (id: string, updateObj: object) => {
    const body = {
      ...updateObj,
      id,
    };
    fetch(BASE_URL + LIST, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log("Saved successfully");
        debugger;
        getAllTodo();
      })
      .catch((err) => {
        debugger;
        console.log(err, "saving data");
      });
  };

  return (
    <main className={addStyles.main_wrapper}>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => router.push("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
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
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div>
            <h1>Add Task {loading}</h1>
            <div style={{ height: "200px", width: "460px" }}>
              <TextField
                label="Title"
                helperText="Please enter a task..."
                variant="standard"
                fullWidth={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="standard-multiline-static"
                label="Description"
                multiline
                value={description}
                onChange={(e) => setDesc(e.target.value)}
                rows={2}
                fullWidth={true}
                variant="standard"
              />
              <Button
                style={{ margin: "20px" }}
                onClick={() => addTodo()}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </div>
          <div className={addStyles.list_container}>
            <h1>List</h1>
            <div className={addStyles.list_wrapper}>
              {list.map(({ title, description, status, id }, index) => (
                <ListItem
                key={id}
                  name={title}
                  description={description}
                  status={status}
                  onClick={() => {
                    console.log(index);
                    updateTodo(id, { status: !status });
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* <ListItem
        name="Buy news paper"
        description="Goto the newspaper shop near hanuman temple and buy Hindu paper."
        status={false}
        onClick={() => {}}
      /> */}
      <Snackbar
        style={{ maxWidth: "400px" }}
        open={toast}
        autoHideDuration={6000}
        onClose={() => setToast(!toast)}
      >
        <Alert
          onClose={() => setToast(!toast)}
          severity="success"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </main>
  );
};

export default Add;
