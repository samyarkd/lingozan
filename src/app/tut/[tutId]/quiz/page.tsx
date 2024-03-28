"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Heading } from "~/components/ui/Typography";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { cn, wait } from "~/lib/utils";

const quizQuestions = [
  {
    question: "What does 'こんにちは' mean?",
    answers: ["Goodbye", "Hello", "Thank you", "How are you"],
    correctAnswer: "Hello",
  },
  {
    question: "What does '私の名前は' mean?",
    answers: [
      "My name is",
      "Where are you from",
      "What is your name",
      "Nice to meet you",
    ],
    correctAnswer: "My name is",
  },
  {
    question: "What does 'サムヤール' mean?",
    answers: ["Hello", "Thank you", "Goodbye", "Samyar (name)"],
    correctAnswer: "Samyar (name)",
  },
  {
    question: "What does 'です' indicate in Japanese?",
    answers: ["Question", "Politeness", "Negation", "Future tense"],
    correctAnswer: "Politeness",
  },
  {
    question: "Which particle is used for the topic in Japanese?",
    answers: ["は (wa)", "を (wo)", "に (ni)", "で (de)"],
    correctAnswer: "は (wa)",
  },
  {
    question: "What does '非常に' mean?",
    answers: ["Good", "Very", "Not", "Never"],
    correctAnswer: "Very",
  },
  {
    question: "What is the polite form of 'to be' in Japanese?",
    answers: [
      "です (desu)",
      "いいえ (iie)",
      "はい (hai)",
      "ありがとう (arigatou)",
    ],
    correctAnswer: "です (desu)",
  },
  {
    question:
      "What is important to pay attention to in Japanese pronunciation?",
    answers: ["Long vowels", "Short vowels", "Consonants", "Grammar"],
    correctAnswer: "Long vowels",
  },
  {
    question: "What should you do to improve pronunciation and fluency?",
    answers: [
      "Practice speaking aloud",
      "Listen to music",
      "Read silently",
      "Watch movies",
    ],
    correctAnswer: "Practice speaking aloud",
  },
  {
    question:
      "What does the phrase 'Watashi wa shōrai ni tsuite hijō ni rakkanteki desu' mean?",
    answers: [
      "I am very tired",
      "I am very optimistic about the future",
      "I am very hungry",
      "I am very happy",
    ],
    correctAnswer: "I am very optimistic about the future",
  },
];

type AnswerT = {
  answer: string | null;
  question: string;
  isCorrect: boolean | null;
};

type CurrentAnswerStateT = [string | null, Function];

const TutorialPage = ({ params }: { params: { tutId: string } }) => {
  const [answerList, setAnswerList] = useState<AnswerT[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [isQuestionChecked, setIsQuestionChecked] = useState(false);

  return (
    <div className="grid gap-14 content-between sm:content-around p-4 sm:p-0 sm:justify-center min-h-screen">
      <PageStepByStepTitle answerList={answerList} />
      {answerList.length !== quizQuestions.length && quizQuestions.length && (
        <QuestionStep
          currentQuestion={
            quizQuestions[answerList.length] as (typeof quizQuestions)[0]
          }
          isQuestionChecked={isQuestionChecked}
          currentAnswerState={[currentAnswer, setCurrentAnswer]}
          answerList={answerList}
          setAnswerList={setAnswerList}
        />
      )}
      {answerList.length === quizQuestions.length && (
        <>
          <FinishCard /> <div />
        </>
      )}
      {answerList.length !== quizQuestions.length && (
        <SkipAndContinue
          currentQuestion={
            quizQuestions[answerList.length] as (typeof quizQuestions)[0]
          }
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
                key={step.question}
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
  answerListState: [AnswerT[], Function];
  currentQuestion: (typeof quizQuestions)[0];
  isQuestionCheckedState: [boolean, Function];
}) {
  const [currentAnswer, setCurrentAnswer] = currentAnswerState;
  const [answerList, setAnswerList] = answerListState;
  const [isQuestionChecked, setIsQuestionChecked] = isQuestionCheckedState;

  async function addAnswer() {
    setIsQuestionChecked(true);
    await wait(800);

    const answer = currentAnswer;
    const question = currentQuestion.question;
    const isCorrect = currentQuestion.correctAnswer === answer;

    setCurrentAnswer(null);
    setAnswerList([...answerList, { answer, question, isCorrect }]);
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
          addAnswer();
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
  currentQuestion: (typeof quizQuestions)[0];
  answerList: any[];
  setAnswerList: any;
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

const FinishCard = () => {
  return (
    <div className="flex flex-col gap-2">
      <Card className="w-full shadow-md">
        <CardHeader>Well-done 🎉 now let's review your answers</CardHeader>
      </Card>
      <Link href="review">
        <Button className="shadow-md w-full">Review Answers</Button>
      </Link>
    </div>
  );
};

export default TutorialPage;
