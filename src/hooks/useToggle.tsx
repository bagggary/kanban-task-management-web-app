import { useState } from "react";

export default function useToggle(
  defaultValue: boolean
): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(defaultValue);

  function toggleValue() {
    setValue((currentValue) => !currentValue);
  }
  return [value, toggleValue];
}
