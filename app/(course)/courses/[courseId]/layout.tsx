import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

const CourseLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  // const { userId } = auth();

  // if (!userId) {
  //   return redirect("/")
  // }

  const userSession = await currentUser();
  const userId = userSession?.id

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            }
          }
        },
        orderBy: {
          position: "asc"
        }
      },
    },
  });

  // if (!course) {
  //   return redirect("/");
  // }

  return (
    <main className="h-full w-full">
      {children}
    </main>
  )
}

export default CourseLayout