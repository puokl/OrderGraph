import { useState, useEffect } from "react";

import { Card } from "@mui/material";

import Gantt from "src/customComponents/gantt/index";

function OrderGantt({ currentOrder }) {
  console.log(currentOrder);
  const tasks = {
    tasks: [],
  };

  useEffect(() => {
    currentOrder.tasks.forEach((item, index) => {
      console.log("hi");
      tasks.tasks.push({
        id: index,
        text: item.taskName,
        start_date: currentOrder.startDate,
        duration: 3,
      });
      item.subTasks?.forEach((subitem, index2) => {
        tasks.tasks.push({
          id: index2,
          text: subitem.description,
          start_date: currentOrder.startDate,
          duration: subitem.timeEstimate,
          parent: index,
        });
      });
    });

    console.log(tasks);
  }, []);

  return (
    <Card sx={{ p: "1.5rem" }}>
      <Gantt tasks={tasks} />
    </Card>
  );
}

export default OrderGantt;
