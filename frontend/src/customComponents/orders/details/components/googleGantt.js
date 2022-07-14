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
      let completion =
        (task.subTasks.filter((subtask) => subtask.finished === true).length *
          100) /
        task.subTasks.length;

      if (isNaN(completion)) {
        completion = 0;
      }

      const taskID = nextId();
      if (index2 === 0) {
        items[index].push([
          taskID,
          task.taskName,
          `Task ${index2}`,
          new Date(task.startDate),
          null,
          task.duration * 24 * 60 * 60 * 1000,
          completion,
          null,
        ]);
      } else {
        const start =
          Date.parse(task.startDate) +
          Number(item.tasks[index2 - 1].duration) * 24 * 60 * 60 * 1000;
        items[index].push([
          taskID,
          task.taskName,
          `Task ${index2}`,
          new Date(start),
          null,
          task.duration * 24 * 60 * 60 * 1000,
          completion,
          null,
        ]);
      }

      task.subTasks?.forEach((subtask, index3) => {
        let subCompletion = 0;

        if (subtask.finished === true) {
          subCompletion = 100;
        }

        if (index3 === 0 && index2 === 0) {
          const start = Date.parse(task.startDate) + 1;

          const subtaskID = nextId();
          items[index].push([
            subtaskID,
            subtask.description,
            `Task ${index2}`,
            new Date(start),
            null,
            Number(subtask.timeEstimate) * 24 * 60 * 60 * 999,
            subCompletion,
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
            `Task ${index2}`,
            new Date(start),
            null,
            Number(subtask.timeEstimate) * 24 * 60 * 60 * 1000,
            subCompletion,
            null,
          ]);
        } else {
          const subtaskID = nextId();
          items[index].push([
            subtaskID,
            subtask.description,
            `Task ${index2}`,
            null,
            null,
            Number(subtask.timeEstimate) * 24 * 60 * 60 * 1000,
            subCompletion,
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
        const data = [columns, ...item];
        return (
          <div key={index}>
            <Typography variant="h4" component="h4" sx={{ m: 1 }}>
              {t(`${currentOrder.items[index].itemName}`)}
            </Typography>
            <Chart
              chartType="Gantt"
              width="100%"
              height="300px"
              data={data}
              options={options}
            />
          </div>
        );
      })}
    </Card>
  );
}

export default GoogleGantt;
