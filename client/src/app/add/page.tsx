"use client";

import { Alert, Button, Checkbox, Snackbar, TextField } from "@mui/material";
import addStyles from "./add.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL, LIST } from "@/configs/constants";
import { Button as ListButton } from "@/components/List";
import ListItem from "@/components/ListItems/v1/ListItem";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import moment from "moment";

type TToggleEditMode = (
  id: string,
  task: {
    title: string;
    description: string;
    status: boolean;
    completeBy: number;
  }
) => void;

const Add = () => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [list, setList] = useState([]);
  const [toast, setToast] = useState(false);
  const [showDateTimePicker, setShowDateTimePicket] = useState(false);
  const [completeBy, setCompleteBy] = useState<number>();
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
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
      headers: new Headers({ "content-type": "application/json" }),
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
      completeBy: moment(completeBy).unix(),
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

  const toggleEditMode: TToggleEditMode = (id, listDetail) => {
    setEditMode(true);
    setEditId(id)
    setTitle(listDetail.title);
    setDesc(listDetail.description);
    debugger;
    if (listDetail.completeBy) setCompleteBy(listDetail.completeBy);
    else setCompleteBy(0)
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
            <h1>{editMode ? 'Edit' : 'Add'} Task {loading}</h1>
            <div style={{ height: "350px", width: "460px" }}>
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
              <div>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <span className={addStyles.date_time_title}>
                    <img src="/icons/sand-clock.svg" width={"35px"} />
                    <p
                      onClick={() => setShowDateTimePicket(!showDateTimePicker)}
                    >
                      Complete: {completeBy ? moment(completeBy).fromNow() : ''}
                    </p>
                  </span>
                  {showDateTimePicker && (
                    <StaticDateTimePicker
                      orientation="landscape"
                      onChange={(e) => console.log("change --->>", e)}
                      onAccept={(e) => {
                        console.log("accept --->>", e, e?.valueOf());
                        setCompleteBy(e?.valueOf());
                        setShowDateTimePicket(false);
                      }}
                      onClose={() => {
                        console.log("--->> close");
                        setShowDateTimePicket(false);
                      }}
                      defaultValue={moment()}
                    />
                  )}
                </LocalizationProvider>
              </div>
              <Button
                style={{ margin: "20px" }}
                onClick={() => {
                editMode ? updateTodo(editId, {title, description, completeBy: moment(completeBy).unix()}) : addTodo()
                }}
                variant="contained"
              >
                {editMode ? 'Edit' : 'Add'}
              </Button>
            </div>
          </div>
          <div className={addStyles.list_container}>
            <h1>List</h1>
            <div className={addStyles.list_wrapper}>
              {list.map(
                (
                  { title, description, status, id, time = 0, completeBy },
                  index
                ) => (
                  <ListItem
                    key={id}
                    name={title}
                    description={description}
                    status={status}
                    created={time && time * 1000}
                    completeBy={completeBy && completeBy * 1000}
                    toggleEditMode={() =>
                      toggleEditMode(id, {
                        title,
                        description,
                        status,
                        completeBy: completeBy ? completeBy * 1000 : 0,
                      })
                    }
                    onClick={() => {
                      console.log(index);
                      updateTodo(id, { status: !status });
                    }}
                  />
                )
              )}
            </div>
            <div><img className={addStyles.arrow} src="/icons/down-arrow.svg" width={"35px"} /></div>
          </div>
        </>
      )}
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
