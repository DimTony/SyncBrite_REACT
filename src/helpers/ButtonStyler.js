import React, { useRef, useEffect } from "react";

const useButtonStyles = (
  index,
  topEvents,
  friendEvents,
  followingEvents,
  groupEvents
) => {
  useEffect(() => {
    return {
      backgroundColor:
        (index === 0 && topEvents) ||
        (index === 1 && friendEvents) ||
        (index === 2 && followingEvents) ||
        (index === 3 && groupEvents)
          ? "#YourActiveColor"
          : "#YourInactiveColor",
    };
  });
};

export default useButtonStyles;
