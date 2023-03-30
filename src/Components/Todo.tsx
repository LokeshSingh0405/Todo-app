import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import SearchIcon from "@mui/icons-material/Search";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type data = {
  ind: number;
  title: string;
  desc: string;
  date: string;
};

export default function Todo() {
  const [modal, setModal] = useState<boolean>(false);
  const [todos, setTodos] = useState<data[]>([]);
  const [todo, setTodo] = useState<data>({
    title: "",
    desc: "",
    date: "",
    ind: 0,
  });
  const [filteredTodo, setfilteredTodo] = useState<data[]>([]);
  const [toggle, setToggle] = useState<boolean>(true);

  useEffect(() => {
    const res = window.localStorage.getItem("tasks");
    if (res) setTodos(JSON.parse(res));
    else {
      alert("No data added !");
    }
  }, []);

  const openModel = () => {
    setModal(true);
  };
  const closeModel = () => {
    setModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleData = e.target.value;
    setTodo((prev) => ({ ...prev, title: titleData }));
  };

  const handleDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const descData = e.target.value;
    setTodo((prev) => ({ ...prev, desc: descData }));
  };

  const handleSubmit = () => {
    const setter = [
      ...todos,
      { ...todo, date: new Date().toLocaleString() + "" },
    ];
    setTodos([...setter]);
    window.localStorage.setItem("tasks", JSON.stringify(setter));
    closeModel();
  };

  const handleUpdate = (date : string) => {
    const updatesData: data[] = todos.map((task: data, index: number) => {
      if (task.date === date) {
            return todo;
      }
      return task;
    });
    setTodos(updatesData);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchItem: string = e.target.value;
    if (searchItem.length === 0) setfilteredTodo([]);
    else {
      const newData: data[] = todos.filter((res: data) =>
        res.title.toLowerCase().includes(searchItem)
      );
      setfilteredTodo(newData);
    }
  };

  const handleDelete = (ind: number) => {
    const updateItems = todos.filter((value: data, index: number) => {
      return index !== ind;
    });
    localStorage.setItem("tasks", JSON.stringify(updateItems));
    setTodos([...updateItems]);
  };

  const removeAll = () => {
    setTodos([]);
    localStorage.clear();
  };

  const handleEdit = (date: string) => {
    openModel();
    setToggle(false);
    let editItem = todos.find((elem: data) => {
      return elem.date === date;
    });
    if (editItem) setTodo(editItem);
  };

  const maintainState = () => {
    openModel();
    setToggle(true);
  };

  return (
    <>
      <div className="search-bar flex">
        <div className="flex Input-box">
          <input
            className="input-text no-outline"
            type="text"
            onChange={handleSearch}
            placeholder="Search the task"
          />
          <SearchIcon />
        </div>
      </div>

      <div key={1}>
        <Card sx={{ minWidth: 275 }}>
          {filteredTodo.length === 0
            ? todos.map((task: data, ind: number) => {
                const { title, desc, date } = task;
                return (
                  <>
                    <CardContent >
                      <Typography variant="h5" component="div">
                        Title : {title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Desciption : {desc}
                      </Typography>
                      <Typography variant="body2">Dated: {date}</Typography>
                    </CardContent>
                    <div className="flex btn">
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        size="small"
                        onClick={() => {
                          handleDelete(ind);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => {
                          handleEdit(date);
                        }}
                      >
                        Edit the task.
                      </Button>
                    </div>
                  </>
                );
              })
            : filteredTodo.map((task: data, ind: number) => {
                const { title, desc, date } = task;
                return (
                  <>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Title : {title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Desciption : {desc}
                      </Typography>
                      <Typography variant="body2">Dated: {date}</Typography>
                    </CardContent>
                    <div className="flex btn">
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        size="small"
                        onClick={() => {
                          handleDelete(ind);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => {
                          handleEdit(date);
                        }}
                      >
                        Edit the task.
                      </Button>
                    </div>
                  </>
                );
              })}

          <CardActions className="flex action-btn">
            <Button
              size="large"
              color="error"
              startIcon={<GroupRemoveIcon />}
              onClick={removeAll}
            >
              Remove All
            </Button>
            <Button
              size="small"
              onClick={maintainState}
              startIcon={<AddIcon />}
            >
              Add a Task.
            </Button>

            <Modal
              open={modal}
              onClose={closeModel}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className="Modal flex">
                <TextField
                  id="outlined-basic"
                  label="Add a title"
                  variant="outlined"
                  value={todo.title}
                  onChange={handleChange}
                />
                <TextField
                  id="standard-basic"
                  label="Add description"
                  variant="standard"
                  value={todo.desc}
                  onChange={handleDesc}
                />

                {toggle ? (
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    className="task-btn"
                    onClick={handleSubmit}
                  >
                    Add a Task
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<EditIcon />}
                    onClick={()=>{ handleUpdate(todo.date) }}
                  >
                    Update a Task
                  </Button>
                )}
              </Box>
            </Modal>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
