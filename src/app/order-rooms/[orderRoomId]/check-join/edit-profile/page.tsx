"use client";
import useSWR from "swr";
import EditProfileBottom from "./components/edit_profile_bottom";
import EditProfileIconsPart from "./components/edit_profile_icons_part";
import EditProfileInputPart from "./components/edit_profile_input_part";
import { checkJoinEditProfileFetcher } from "./fetcher";

interface EditProfilePageProps {
  params: {
    orderRoomId: string;
  };
}

export default function EditProfilePage(props: EditProfilePageProps) {
  const orderRoomId = props.params.orderRoomId;
  const { data, isLoading, error } = useSWR(
    `order-rooms/${orderRoomId}/check-join/edit-profile`,
    checkJoinEditProfileFetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (data == undefined || error) {
    return <div>Error...</div>;
  }

  return (
    <main className="relative py-6">
      <EditProfileIconsPart data={data} />
      <div className="h-8"></div>
      <EditProfileInputPart />
      <EditProfileBottom />
    </main>
  );
}
