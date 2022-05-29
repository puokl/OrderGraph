import { useState, useRef, useEffect } from "react";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import {
  Grid,
  Drawer,
  Box,
  Card,
  Divider,
  useMediaQuery,
  styled,
  useTheme,
} from "@mui/material";

import { useDispatch, useSelector } from "src/store";

import ManagementUsers from "../../content/management/Users/index";

const FullCalendarWrapper = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(3)};

    & .fc-license-message {
      display: none;
    }
    .fc {

      .fc-col-header-cell {
        padding: ${theme.spacing(1)};
        background: ${theme.colors.alpha.black[5]};
      }

      .fc-scrollgrid {
        border: 2px solid ${theme.colors.alpha.black[10]};
        border-right-width: 1px;
        border-bottom-width: 1px;
      }

      .fc-cell-shaded,
      .fc-list-day-cushion {
        background: ${theme.colors.alpha.black[5]};
      }

      .fc-list-event-graphic {
        padding-right: ${theme.spacing(1)};
      }

      .fc-theme-standard td, .fc-theme-standard th,
      .fc-col-header-cell {
        border: 1px solid ${theme.colors.alpha.black[10]};
      }

      .fc-event {
        padding: ${theme.spacing(0.1)} ${theme.spacing(0.3)};
      }

      .fc-list-day-side-text {
        font-weight: normal;
        color: ${theme.colors.alpha.black[70]};
      }

      .fc-list-event:hover td,
      td.fc-daygrid-day.fc-day-today {
        background-color: ${theme.colors.primary.lighter};
      }

      td.fc-daygrid-day:hover,
      .fc-highlight {
        background: ${theme.colors.alpha.black[10]};
      }

      .fc-daygrid-dot-event:hover, 
      .fc-daygrid-dot-event.fc-event-mirror {
        background: ${theme.colors.primary.lighter};
      }

      .fc-daygrid-day-number {
        padding: ${theme.spacing(1)};
        font-weight: bold;
      }

      .fc-list-sticky .fc-list-day > * {
        background: ${theme.colors.alpha.black[5]} !important;
      }

      .fc-cell-shaded, 
      .fc-list-day-cushion {
        background: ${theme.colors.alpha.black[10]} !important;
        color: ${theme.colors.alpha.black[70]} !important;
      }

      &.fc-theme-standard td, 
      &.fc-theme-standard th,
      &.fc-theme-standard .fc-list {
        border-color: ${theme.colors.alpha.black[30]};
      }
    }
`
);

const selectedEventSelector = (state) => {
  const { events, selectedEventId } = state.calendar;

  if (selectedEventId) {
    return events.find((_event) => _event.id === selectedEventId);
  }
  return null;
};

function Organization() {
  //   const theme = useTheme();

  //   const calendarRef = useRef(null);
  //   const mobile = useMediaQuery(theme.breakpoints.down("md"));
  //   const dispatch = useDispatch();
  //   const { events, isDrawerOpen, selectedRange } = useSelector(
  //     (state) => state.calendar
  //   );
  //   const selectedEvent = useSelector(selectedEventSelector);
  //   const [date, setDate] = useState(new Date());
  //   const [view, setView] = useState(mobile ? "listWeek" : "dayGridMonth");

  //   const handleDateToday = () => {
  //     const calItem = calendarRef.current;

  //     if (calItem) {
  //       const calApi = calItem.getApi();

  //       calApi.today();
  //       setDate(calApi.getDate());
  //     }
  //   };

  //   const changeView = (changedView) => {
  //     const calItem = calendarRef.current;

  //     if (calItem) {
  //       const calApi = calItem.getApi();

  //       calApi.changeView(changedView);
  //       setView(changedView);
  //     }
  //   };

  //   const handleDatePrev = () => {
  //     const calItem = calendarRef.current;

  //     if (calItem) {
  //       const calApi = calItem.getApi();

  //       calApi.prev();
  //       setDate(calApi.getDate());
  //     }
  //   };

  //   const handleDateNext = () => {
  //     const calItem = calendarRef.current;

  //     if (calItem) {
  //       const calApi = calItem.getApi();

  //       calApi.next();
  //       setDate(calApi.getDate());
  //     }
  //   };

  //   const handleAddClick = () => {
  //     dispatch(openDrawerPanel());
  //   };

  //   const handleRangeSelect = (arg) => {
  //     const calItem = calendarRef.current;

  //     if (calItem) {
  //       const calApi = calItem.getApi();

  //       calApi.unselect();
  //     }

  //     dispatch(selectRange(arg.start, arg.end));
  //   };

  //   const handleEventSelect = (arg) => {
  //     dispatch(selectEvent(arg.event.id));
  //   };

  //   const handleEventResize = async ({ event }) => {
  //     try {
  //       await dispatch(
  //         updateEvent(event.id, {
  //           allDay: event.allDay,
  //           start: event.start,
  //           end: event.end,
  //         })
  //       );
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   const handleEventDrop = async ({ event }) => {
  //     try {
  //       dispatch(
  //         updateEvent(event.id, {
  //           allDay: event.allDay,
  //           start: event.start,
  //           end: event.end,
  //         })
  //       );
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   const closeDrawer = () => {
  //     dispatch(closeDrawerPanel());
  //   };

  //   useEffect(() => {
  //     dispatch(getEvents());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     const calItem = calendarRef.current;

  //     if (calItem) {
  //       const calApi = calItem.getApi();
  //       const changedView = mobile ? "listWeek" : "dayGridMonth";

  //       calApi.changeView(changedView);
  //       setView(changedView);
  //     }
  //   }, [mobile]);

  return (
    <>
      <ManagementUsers />
    </>
  );
}

export default Organization;
