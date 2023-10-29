import { KeyedMutator } from "swr";
import { OrderCartState } from "./state";
import { useEffect, useState } from "react";

interface useOrderCartHooksProps {
  data: OrderCartState | undefined;
  mutate: KeyedMutator<OrderCartState>;
}

export const useOrderCartHooks = ({ data, mutate }: useOrderCartHooksProps) => {
  const [test, setTest] = useState("");

  useEffect(() => {
    if (data == undefined) {
      mutate({ ...data! });
    }
  });

  const increment = () => {
    mutate({ ...data! });
  };

  return { test };
};
