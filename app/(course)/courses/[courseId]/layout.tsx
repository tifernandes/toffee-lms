import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { CourseNavbar } from "./_components/course-navbar";

const CourseLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/")
  }

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

  if (!course) {
    return redirect("/");
  }

  return (
    <main className="h-full w-full">
      {children}
    </main>
  )
}

export default CourseLayout