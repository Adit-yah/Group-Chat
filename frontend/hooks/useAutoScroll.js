import { useEffect, useRef } from "react";

export function useAutoScroll(deps) {
  const ref = useRef();
  
  useEffect(() => {
    const elem = ref.current;
    if (elem) {
      if (elem.scrollHeight > elem.clientHeight) {
        elem.scrollTo({
          top: elem.scrollHeight - elem.clientHeight,
          behavior: "smooth",
        });
      }
    }
  }, [deps]);

  return ref;
}
