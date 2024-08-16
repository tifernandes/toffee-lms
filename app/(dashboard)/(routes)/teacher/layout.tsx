import { isTeacher } from "@/lib/teacher";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const TeacherLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {

  const userSession = await currentUser();
  const userId = userSession?.id

  if (!isTeacher(userId)) {
    return redirect("/");
  }

  return <>{children}</>
}
 
export default TeacherLayout;