import { useState } from "react"

export default function useToggle(defaultValue) {
  const [value, setValue] = useState(defaultValue)

  function toggleValue(value) {
    setValue(currentValue =>
      typeof value === "boolean" ? value : !currentValue
    )
  }
  return [value, toggleValue , setValue]
}





// import React , { useState } from "react";

// const useToggle = (initialState = false) => {
//   const [visible, setVisibility] = useState(initialState);

//   const toggle = useCallback(() => setVisibility((prev) => !prev), []);

//   const setToggleStatus = (value) => setVisibility(Boolean(value));

//   return [visible, toggle, setToggleStatus];
// };
// export default  useToggle;