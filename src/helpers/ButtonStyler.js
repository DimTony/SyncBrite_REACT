import React, { useRef, useEffect } from "react";

const useButtonStyles = (
  buttonNames,
  buttonRefs,
  activeFilterButton,
  setActiveFilterButton
) => {
  useEffect(() => {
    const changeButtonStyles = () => {
      const currentPath = window.location.pathname;

      buttonRefs.forEach((buttonRef, index) => {
        if (buttonRef.current) {
          const buttonPath = buttonRef.current.getAttribute("data-path");
          if (buttonPath === currentPath) {
            buttonRef.current.style.background = "#ededff";
            buttonRef.current.style.border = "1px solid #003366";
            buttonRef.current.style.color = "#003366";
            setActiveFilterButton(buttonNames[index]); // Update active button state
          } else {
            buttonRef.current.style.background = "";
            buttonRef.current.style.border = "";
            buttonRef.current.style.color = "";
          }
        }
      });
    };

    // Call the function initially and whenever the pathname changes
    changeButtonStyles();
    window.addEventListener("popstate", changeButtonStyles);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", changeButtonStyles);
    };
  }, [buttonRefs, activeFilterButton]);
};

export default useButtonStyles;
