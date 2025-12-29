import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
  });

  if (!course) {
    return redirect("/");
  }

  return (
    <div className="p-6">
       <h1>Course Setup: {course.title}</h1>
       <p>Course ID: {course.id}</p>
    </div>
  );
};

export default CourseIdPage;