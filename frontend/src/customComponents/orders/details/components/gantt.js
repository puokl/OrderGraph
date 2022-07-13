import { useState, useEffect } from "react";

import { Card } from "@mui/material";

import Gantt from "src/customComponents/gantt/index";

function OrderGantt({ currentOrder }) {
  console.log(currentOrder);
  const tasks = {
    tasks: [],
  };
  const dateString =
    new Date(currentOrder.startDate).toDateString() +
    " " +
    new Date(currentOrder.startDate).toLocaleTimeString("it-IT");
  console.log(dateString);

  currentOrder.tasks.forEach((item, index) => {
    console.log("hi");
    tasks.tasks.push({
      id: index + 1,
      text: item.taskName,
      start_date: dateString,
      duration: 3,
    });
    item.subTasks?.forEach((subitem, index2) => {
      tasks.tasks.push({
        id: index2 + 22,
        text: subitem.description,
        start_date: dateString,
        duration: subitem.timeEstimate,
        parent: index + 1,
      });
    });
  });
  console.log(tasks);

  //   useEffect(() => {

  //     console.log(tasks);
  //   }, []);

  return (
    <Card sx={{ p: "1.5rem" }}>
      <Gantt tasks={tasks} />
    </Card>
  );
}

export default OrderGantt;
