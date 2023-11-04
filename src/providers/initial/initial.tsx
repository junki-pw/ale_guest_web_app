"use client";

import useSWR, { SWRConfig } from "swr";
import { initialFetcher } from "./fetcher";
import useSWRSubscription from "swr/subscription";
import { useCurrentUser } from "@/hooks/current_user";

const InitialProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <InitialData>{children}</InitialData>
    </SWRConfig>
  );
};

export default InitialProvider;

interface InitialDataProps {
  children: React.ReactNode;
}

function InitialData({ children }: InitialDataProps) {
  const { isLoading, error } = useSWR("initial", initialFetcher);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (error) {
    return <div>{error}</div>;
  }

  return <CurrentUserData>{children}</CurrentUserData>;
}

function CurrentUserData({ children }: InitialDataProps) {
  const { currentUser, error } = useCurrentUser();

  if (currentUser == undefined) {
    return <div>Loading</div>;
  } else if (error) {
    return <div>Error...</div>;
  }

  return children;
}
