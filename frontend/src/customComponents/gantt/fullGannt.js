import axios from "src/utils/axios2";
import useAuth from "src/hooks/useAuth";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Grid, Typography, Button, TextField, Modal } from "@mui/material";
import Gantt from "src/customComponents/gantt";

const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  borderRadius: "2rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function FullGantt() {
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState();
  const [progress, setProgress] = useState();

  const auth = useAuth();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [check, setCheck] = useState(false);
  const [dataa, setdataa] = useState();
  useEffect(() => {
    fetchgraphdata();
  }, []);

  const fetchgraphdata = async () => {
    try {
      const response = await axios.get("/api/v1/task/getTask");
      console.log(response);
      const newArray = response.data.map(
        ({
          _id,
          task,
          start_date,
          duration,
          progress,
          user_id,
          createdAt,
          updatedAt,
          __v,
        }) => ({
          id: _id,
          text: task,
          start_date: start_date.slice(0, -8).replace(/T/g, " "),
          duration: duration,
          progress: progress,
        })
      );

      setdataa(newArray);
      setCheck(true);

      console.log(newArray);
    } catch (err) {
      console.log(`account error ${err}`);
    }
  };

  const createTask = async () => {
    const newTask = {
      task: task,
      start_date: startDate,
      duration: duration,
      progress: progress,
    };

    try {
      const response = await axios.post("api/v1/task/newTask", newTask);
      console.log(response);
      window.location.reload(false);
      handleClose();
      alert("Task Added");
    } catch (err) {
      console.log(err);
      alert("Error in creating Task");
    }
  };
  const data = { data: dataa };
  const { t } = useTranslation();
  return (
    <Grid item xs={12} md={12}>
      <Box
        sx={
          {
            //   top: { xs: -50, md: 0 },
            //   left: { xs: -150, md: -45 },
            //   minHeight: { xs: 530, md: 500 },
            //   transform: { xs: "scale(.5)", md: "none" },
            //   position: "relative",
          }
        }
      ></Box>
      {check && (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Create New Admin
              </Typography>
              <Grid
                container
                m={"1.5rem 0"}
                py={2}
                justifyContent={"space-evenly"}
              >
                <Grid item xs={3.5}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="TASK"
                    variant="outlined"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3.5}>
                  <TextField
                    fullWidth
                    type="date"
                    id="outlined-basic"
                    label="START DATE"
                    variant="outlined"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3.5}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="DURATION"
                    variant="outlined"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container mb={"1.5rem"} justifyContent={"space-evenly"}>
                <Grid item xs={3.5}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="PROGRESS"
                    variant="outlined"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-evenly"}>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={createTask}
                    disabled={
                      !task || !startDate || !duration || !progress
                        ? true
                        : false
                    }
                  >
                    SEND
                  </Button>
                </Grid>
                {/* <Grid item xs={4}>
              <Button
                fullWidth
                variant="contained"
                color="dark"
                size="medium"
                onClick={handleClose}
              >
                CLOSE
              </Button>
            </Grid> */}
              </Grid>
            </Box>
          </Modal>
          <Button
            fullWidth
            variant="contained"
            // color="white"
            size="medium"
            onClick={() => setOpen(true)}
          >
            ADD TASK
          </Button>
          <Gantt className="gantt_layout_root" tasks={data} />
        </>
      )}
    </Grid>
  );
}

export default FullGantt;
