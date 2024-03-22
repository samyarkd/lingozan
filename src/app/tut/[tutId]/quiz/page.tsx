"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Heading } from "~/components/ui/Typography";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { wait } from "~/lib/utils";
const quizQuestions = [
  {
    question: 'What does "koko" mean?',
    answers: ["This place", "That place", "Where", "What"],
    correctAnswer: "This place",
  },
  {
    question: 'What is the function of the particle "wa"?',
    answers: ["Subject marker", "Topic marker", "Object marker", "Verb ender"],
    correctAnswer: "Topic marker",
  },
  {
    question: 'What does "doko" mean?',
    answers: ["Here", "There", "Where", "What"],
    correctAnswer: "Where",
  },
  {
    question: 'What is "desu"?',
    answers: ["To be (casual)", "To be (polite)", "Is", "Are"],
    correctAnswer: "To be (polite)",
  },
  {
    question: 'What does the particle "ka" indicate?',
    answers: ["Statement", "Command", "Question", "Exclamation"],
    correctAnswer: "Question",
  },
  {
    question: 'How many words are in "Koko wa doko desu ka?"',
    answers: ["3", "4", "5", "6"],
    correctAnswer: "5",
  },
  {
    question: "What is the literal English translation?",
    answers: [
      "This is where?",
      "Where is this?",
      "This place where is?",
      "This where place is?",
    ],
    correctAnswer: "Where is this?",
  },
  {
    question: 'If you drop "desu", what is the phrase?',
    answers: [
      "Koko wa doko ka",
      "Koko doko desu",
      "Koko doko ka",
      "Doko koko ka",
    ],
    correctAnswer: "Koko wa doko ka",
  },
  {
    question: 'What is the response if someone says "Kore wa ryokan desu"?',
    answers: [
      "This is a hotel.",
      "Where is this?",
      "That is a hotel.",
      "Hotel this is.",
    ],
    correctAnswer: "This is a hotel.",
  },
  {
    question: 'What cultural context is implied by using the polite "desu"?',
    answers: [
      "Casual conversation",
      "Formal situation",
      "Impolite manner",
      "No implication",
    ],
    correctAnswer: "Formal situation",
  },
];

const TutorialPage = ({ params }: { params: { tutId: string } }) => {
  const [answerList, setAnswerList] = useState<
    { answer: string | null; question: string; isCorrect: boolean | null }[]
  >([]);

  return (
    <div className="grid gap-14 content-between sm:content-around p-4 sm:p-0 sm:justify-center min-h-screen">
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
      {answerList.length !== quizQuestions.length && quizQuestions.length && (
        <QuestionStep
          currentQuestion={
            quizQuestions[answerList.length] as (typeof quizQuestions)[0]
          }
          answerList={answerList}
          setAnswerList={setAnswerList}
        />
      )}
      {answerList.length === quizQuestions.length && <FinishCard />}
      {/* TODO: we need a check button and a skkip button just like how doulingo does it */}
      <div />
    </div>
  );
};

const QuestionStep = ({
  currentQuestion,
  setAnswerList,
  answerList,
}: {
  currentQuestion: (typeof quizQuestions)[0];
  answerList: any[];
  setAnswerList: any;
}) => {
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  async function addAnswer(
    answer: string,
    question: string,
    isCorrect: boolean,
  ) {
    setCurrentAnswer(answer);
    await wait(800);
    setCurrentAnswer(null);
    setAnswerList([...answerList, { answer, question, isCorrect }]);
    changeActiveIndex(1);
  }

  function changeActiveIndex(next: -1 | 1) {
    if (activeIndex === 0) {
      setActiveIndex(activeIndex + 1);
      return;
    }

    if (activeIndex === quizQuestions.length - 1) {
      setActiveIndex(activeIndex - 1);
      return;
    }

    setActiveIndex(activeIndex + next);
  }

  return (
    <Card className="w-full text-center">
      <CardHeader>{currentQuestion?.question}</CardHeader>
      <CardContent className="pt-6 grid gap-2 text-start whitespace-pre-line">
        {currentQuestion.answers.map((an, idx) => {
          return (
            <Button
              disabled={
                currentAnswer !== null
                  ? currentAnswer === an
                    ? false
                    : an === currentQuestion.correctAnswer
                      ? false
                      : true
                  : false
              }
              variant={
                currentAnswer
                  ? currentAnswer === an
                    ? currentAnswer === currentQuestion.correctAnswer
                      ? "default"
                      : "destructive"
                    : an === currentQuestion.correctAnswer
                      ? "default"
                      : "secondary"
                  : "secondary"
              }
              onClick={async () => {
                if (currentAnswer) return;

                await addAnswer(
                  an,
                  currentQuestion.question,
                  an === currentQuestion.correctAnswer,
                );
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
