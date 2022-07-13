import { useState, useEffect } from "react";
import nextId, { setPrefix } from "react-id-generator";
import { Card, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Chart } from "react-google-charts";

function GoogleGantt({ currentOrder }) {
  setPrefix("");
  const { t } = useTranslation();

  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  const rows = [];
  const items = [];

  currentOrder.items.forEach((item, index) => {
    items.push([]);
    item.tasks.forEach((task, index2) => {
      const completion =
        (task.subTasks.filter((subtask) => subtask.finished === true).length *
          100) /
        task.subTasks.length;
      console.log(completion);

      const taskID = nextId();
      if (index2 === 0) {
        items[index].push([
          taskID,
          task.taskName,
          null,
          new Date(task.startDate),
          null,
          task.duration * 24 * 60 * 60 * 1000,
          40,
          null,
        ]);
      } else {
        items[index].push([
          taskID,
          task.taskName,
          null,
          null,
          null,
          task.duration * 24 * 60 * 60 * 1000,
          40,
          JSON.stringify(taskID - items[index].length),
        ]);
      }

      task.subTasks?.forEach((subtask, index3) => {
        if (index3 === 0 && index2 === 0) {
          const subtaskID = nextId();
          items[index].push([
            subtaskID,
            subtask.description,
            task.taskName,
            new Date(task.startDate),
            null,
            Number(subtask.timeEstimate) * 24 * 60 * 60 * 1000,
            40,
            null,
          ]);
        } else if (index3 === 0) {
          const subtaskID = nextId();
          const start =
            Date.parse(task.startDate) +
            Number(item.tasks[index2 - 1].duration) * 24 * 60 * 60 * 1000;

          items[index].push([
            subtaskID,
            subtask.description,
            task.taskName,
            new Date(start),
            null,
            Number(subtask.timeEstimate) * 24 * 60 * 60 * 1000,
            40,
            null,
          ]);
        } else {
          const subtaskID = nextId();
          items[index].push([
            subtaskID,
            subtask.description,
            task.taskName,
            null,
            null,
            Number(subtask.timeEstimate) * 24 * 60 * 60 * 1000,
            40,
            JSON.stringify(subtaskID - 1),
          ]);
        }
      });
    });
  });
  console.log(items);

  const options = {
    height: "100%",
    gantt: {
      defaultStartDateMillis: new Date(2015, 3, 28),
    },
  };

  return (
    <Card sx={{ p: "1.5rem" }}>
      {items.map((item, index) => {
        console.log(item[index]);
        const data = [columns, ...item];
        return (
          <>
            <Typography variant="h4" component="h4" sx={{ m: 1 }}>
              {t(`${currentOrder.items[index].itemName}`)}
            </Typography>
            <Chart
              key={index}
              chartType="Gantt"
              width="100%"
              height="300px"
              data={data}
              options={options}
            />
          </>
        );
      })}
    </Card>
  );
}

export default GoogleGantt;
