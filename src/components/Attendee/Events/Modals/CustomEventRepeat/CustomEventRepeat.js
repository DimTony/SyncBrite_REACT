import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdArrowBack } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import axios from "axios";
import "./CustomEventRepeat.css";

function CustomEventRepeat({ user, onBack, toOne, data, setData }) {
  const handleChange = (array) => {
    setData((prevData) => ({
      ...prevData,
      customDates: array,
    }));
  };

  return (
    <>
      <div className="create_event_modal2_wrapper">
        <div className="custom_event_dates_header">
          <h2>Select Custom Event Dates</h2>
          <div className="custom_event_dates_header_btn_container">
            <MdArrowBack
              className="custom_event_dates_header_btn"
              onClick={onBack}
              size={30}
            />
          </div>
        </div>
        <Calendar
          className="calendar"
          multiple
          name="customDates"
          value={data.customDates}
          sort
          onChange={(array) => handleChange(array)}
          format="YYYY-MM-DD"
          plugins={[
            <TimePicker hideSeconds style={{ minWidth: "100px" }} />,
            <DatePanel
              header="  Custom Event Dates"
              markFocused
              focusedClassName="bg-red"
            />,
          ]}
        />
        <div className="custom_event_dates_next_cta">
          <button onClick={toOne} className="custom_event_dates_next_btn">
            Next
          </button>
        </div>
      </div>
      {/* <button onClick={onBack}>Back</button> */}
    </>
  );
}

export default CustomEventRepeat;
