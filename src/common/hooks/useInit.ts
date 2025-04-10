import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from "@/common/utils/axios";
import { useEffect, useState } from "react";

export function useInit() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setupRequestInterceptor();
    setupResponseInterceptor();
    setInit(true);
  }, []);

  return init;
}
