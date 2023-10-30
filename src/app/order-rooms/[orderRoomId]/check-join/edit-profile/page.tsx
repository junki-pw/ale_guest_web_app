import EditProfileBottom from "./components/edit_profile_bottom";
import EditProfileIconsPart from "./components/edit_profile_icons_part";
import EditProfileInputPart from "./components/edit_profile_input_part";

export default function EditProfilePage() {
  return (
    <main className="relative py-6">
      <EditProfileIconsPart />
      <div className="h-8"></div>
      <EditProfileInputPart />
      <EditProfileBottom />
    </main>
  );
}
