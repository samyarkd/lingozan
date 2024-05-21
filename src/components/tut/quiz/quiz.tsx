"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Heading } from "~/components/ui/Typography";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { cn, wait } from "~/lib/utils";
import { api } from "~/trpc/react";
import { type api as serverApi } from "~/trpc/server";

type QuizQuestion = {
  question: string;
  answers: string[];
  correctAnswer: string;
  id: string;
  title: string;
};

type AnswerT = {
  answer: string | null;
  questionId: string;
  isCorrect: boolean | null;
};

type CurrentAnswerStateT = [string | null, Function];

const QuizPage = ({
  quiz,
  tutId,
}: {
  quiz: NonNullable<
    Awaited<ReturnType<typeof serverApi.quiz.generateQuiz.mutate>>
  >;
  tutId: string;
}) => {
  const [answerList, setAnswerList] = useState<AnswerT[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [isQuestionChecked, setIsQuestionChecked] = useState(false);

  const quizQuestions = useMemo(() => {
    return quiz.map(
      (v) =>
        ({
          ...v,
          question: v.title,
        }) satisfies QuizQuestion,
    );
  }, [quiz]);

  return (
    <div className="grid gap-14 content-between sm:content-around p-4 sm:p-0 sm:justify-center flex-grow">
      <PageStepByStepTitle answerList={answerList} />
      {answerList.length !== quizQuestions.length && quizQuestions.length && (
        <QuestionStep
          currentQuestion={quizQuestions[answerList.length]}
          isQuestionChecked={isQuestionChecked}
          currentAnswerState={[currentAnswer, setCurrentAnswer]}
          answerList={answerList}
        />
      )}
      {answerList.length === quizQuestions.length && (
        <>
          <FinishCard answerList={answerList} tutId={tutId} /> <div />
        </>
      )}
      {answerList.length !== quizQuestions.length && (
        <SkipAndContinue
          currentQuestion={quizQuestions[answerList.length]}
          isQuestionCheckedState={[isQuestionChecked, setIsQuestionChecked]}
          answerListState={[answerList, setAnswerList]}
          currentAnswerState={[currentAnswer, setCurrentAnswer]}
        />
      )}
    </div>
  );
};

const PageStepByStepTitle = ({ answerList }: { answerList: AnswerT[] }) => {
  return (
    <div className="relative w-full sm:mt-0 mt-5">
      <Card className="w-full sm:min-w-96 text-center">
        <CardContent className="p-2">
          <Heading>Step By Step Tutorial</Heading>
        </CardContent>
      </Card>
      <div className="grid w-full -z-10 gap-2 grid-cols-10 absolute -top-1/3 left-0 px-2 justify-items-center">
        {answerList
          .filter((q) => q?.isCorrect !== null)
          .map((step) => {
            return (
              <motion.div
                key={step.questionId}
                initial={{ top: 0, opacity: 0.5 }}
                animate={{ top: "-10%", opacity: 1 }}
                className="relative"
              >
                <Badge
                  variant={step.isCorrect ? "default" : "destructive"}
                  className="w-5 h-10"
                />
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

function SkipAndContinue({
  currentAnswerState,
  answerListState,
  currentQuestion,
  isQuestionCheckedState,
}: {
  currentAnswerState: CurrentAnswerStateT;
  answerListState: [AnswerT[], (data: AnswerT[]) => void];
  currentQuestion: QuizQuestion;
  isQuestionCheckedState: [boolean, Function];
}) {
  const [currentAnswer, setCurrentAnswer] = currentAnswerState;
  const [answerList, setAnswerList] = answerListState;
  const [isQuestionChecked, setIsQuestionChecked] = isQuestionCheckedState;

  async function addAnswer() {
    setIsQuestionChecked(true);
    await wait(800);

    const isCorrect = currentQuestion.correctAnswer === currentAnswer;

    setCurrentAnswer(null);
    setAnswerList([
      ...answerList,
      { answer: currentAnswer, questionId: currentQuestion.id, isCorrect },
    ]);
    setIsQuestionChecked(false);
  }

  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        className="opacity-70"
        onClick={() => addAnswer()}
        disabled={!!currentAnswer || !isQuestionChecked}
      >
        Skip
      </Button>
      <Button
        onClick={() => {
          void addAnswer();
        }}
        disabled={!currentAnswer || isQuestionChecked || !currentQuestion}
      >
        Continue
      </Button>
    </div>
  );
}

const QuestionStep = ({
  currentQuestion,
  currentAnswerState,
  isQuestionChecked,
}: {
  currentQuestion: QuizQuestion;
  answerList: AnswerT[];
  currentAnswerState: CurrentAnswerStateT;
  isQuestionChecked: boolean;
}) => {
  const [currentAnswer, setCurrentAnswer] = currentAnswerState;

  return (
    <Card className="w-full text-center">
      <CardHeader>{currentQuestion?.question}</CardHeader>
      <CardContent className="pt-6 grid gap-2 text-start whitespace-pre-line">
        {currentQuestion.answers.map((an, idx) => {
          return (
            <Button
              className={cn({
                "border-primary text-primary hover:text-primary":
                  currentAnswer === an && !isQuestionChecked,
              })}
              disabled={
                currentAnswer
                  ? isQuestionChecked
                    ? currentAnswer === an
                      ? false
                      : an === currentQuestion.correctAnswer
                        ? false
                        : true
                    : false
                  : false
              }
              variant={
                currentAnswer
                  ? !isQuestionChecked
                    ? "outline"
                    : currentAnswer === an
                      ? currentAnswer === currentQuestion.correctAnswer
                        ? "default"
                        : "destructive"
                      : an === currentQuestion.correctAnswer
                        ? "default"
                        : "outline"
                  : "outline"
              }
              onClick={async () => {
                if (isQuestionChecked) return;

                setCurrentAnswer(an);
              }}
              key={idx}
            >
              {an}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

const FinishCard = ({
  answerList,
  tutId,
}: {
  answerList: AnswerT[];
  tutId: string;
}) => {
  const postAnswers = api.quiz.postAnswers.useMutation();

  useEffect(() => {
    !postAnswers.isSuccess &&
      void postAnswers.mutate({
        answers: answerList.map((q) => ({
          questionId: q.questionId,
          userAnswer: q.answer ?? "",
        })),
        tutId,
      });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Card className="w-full shadow-md">
        <CardHeader>Well-done 🎉 now let&#39;s review your answers</CardHeader>
      </Card>
      <Link href="review">
        {postAnswers.isSuccess && (
          <Link href={`/tut/${tutId}/review/${postAnswers.data.takeQuizId}`}>
            <Button className={"shadow-md w-full"}>Review Answers</Button>
          </Link>
        )}
      </Link>
    </div>
  );
};

export default QuizPage;
