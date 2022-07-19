import { useState, useEffect } from "react";
import nextId, { setPrefix } from "react-id-generator";
import { Card } from "@mui/material";

import Gantt from "src/customComponents/gantt/index";

function OrderGantt({ currentOrder }) {
  setPrefix("");
  console.log(currentOrder);
  const tasks = {
    tasks: [],
    links: [],
  };
  const dateString =
    new Date(currentOrder.startDate).toDateString() +
    " " +
    new Date(currentOrder.startDate).toLocaleTimeString("it-IT");
  console.log(dateString);

  currentOrder.tasks.forEach((item, index) => {
    const newID = Number(nextId());
    tasks.tasks.push({
      id: newID,
      text: item.taskName,
      start_date: dateString,
      duration: 3,
    });
    item.subTasks?.forEach((subitem, index2) => {
      const subID = Number(nextId());
      tasks.tasks.push({
        id: subID,
        text: subitem.description,
        start_date: dateString,
        duration: Number(subitem.timeEstimate),
        parent: newID,
      });
      const linkID = Number(nextId());
      tasks.links.push({
        id: linkID,
        source: newID,
        target: subID,
        type: 1,
      });
    });
  });
  console.log(tasks);

  //   const createTaskArray = () => {
  //     currentOrder.tasks.forEach((item, index) => {
  //       const newID = Number(nextId());
  //       tasks.tasks.push({
  //         id: newID,
  //         text: item.taskName,
  //         start_date: dateString,
  //         duration: 3,
  //       });
  //       item.subTasks?.forEach((subitem, index2) => {
  //         const subID = Number(nextId());
  //         tasks.tasks.push({
  //           id: subID,
  //           text: subitem.description,
  //           start_date: dateString,
  //           duration: Number(subitem.timeEstimate),
  //           parent: newID,
  //         });
  //         const linkID = Number(nextId());
  //         tasks.links.push({
  //           id: linkID,
  //           source: newID,
  //           target: subID,
  //           type: 1,
  //         });
  //       });
  //     });
  //     console.log(tasks);
  //   };

  //   useEffect(() => {
  //     createTaskArray();
  //   }, []);

  return (
    <Card sx={{ p: "1.5rem" }}>
      <Gantt tasks={tasks} />
    </Card>
  );
}

export default OrderGantt;
