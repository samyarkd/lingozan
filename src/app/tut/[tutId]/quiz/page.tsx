import QuizPage from "~/components/tut/quiz/quiz";
import { api } from "~/trpc/server";

const page = async ({ params }: { params: { tutId: string } }) => {
  const quiz = await api.quiz.generateQuiz.mutate({ id: params.tutId });

  return <QuizPage tutId={params.tutId} quiz={quiz} />;
};

export default page;
