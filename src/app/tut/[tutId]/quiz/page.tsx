"use client";
import { motion } from "framer-motion";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [answerList, setAnswerList] = useState<
    { answer: string | null; question: string; isCorrect: boolean | null }[]
  >([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);

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
    <div className="grid gap-14 justify-center items-center content-center justify-items-center min-h-screen">
      <div className="relative">
        <Card className="w-96 max-w-2xl z-10 shadow-md relative backdrop-blur bg-white/35 text-center">
          <CardContent className="p-2">
            <Heading>10 Step Quiz</Heading>
          </CardContent>
        </Card>
        <div className="grid w-full gap-2 grid-cols-10 absolute -top-1/3 left-0 px-2 justify-items-center">
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
      {answerList.length !== quizQuestions.length && (
        <div className="relative h-52 w-full">
          {quizQuestions.map((step, questionIdx) => {
            return (
              <Card
                className="w-full absolute min-h-56 backdrop-blur bg-white/35 text-center"
                key={questionIdx}
                style={{
                  zIndex:
                    -questionIdx + (activeIndex === questionIdx ? 100 : 0),
                  right: activeIndex === questionIdx ? 0 : questionIdx * -5,
                  bottom: activeIndex === questionIdx ? 0 : questionIdx * -1,
                  transform:
                    activeIndex === questionIdx
                      ? ""
                      : `rotate(${questionIdx * 1}deg)`,
                }}
              >
                <CardHeader>{step.question}</CardHeader>
                <CardContent className="pt-6 grid grid-cols-2 gap-2 text-start whitespace-pre-line">
                  {step.answers.map((an, idx) => {
                    return (
                      <Button
                        disabled={
                          currentAnswer !== null
                            ? currentAnswer === an
                              ? false
                              : true
                            : false
                        }
                        variant={
                          currentAnswer
                            ? currentAnswer === an
                              ? currentAnswer === step.correctAnswer
                                ? "default"
                                : "destructive"
                              : "secondary"
                            : "secondary"
                        }
                        onClick={async () => {
                          if (currentAnswer) return;

                          await addAnswer(
                            an,
                            step.question,
                            an === step.correctAnswer,
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
          })}
        </div>
      )}
      {answerList.length === quizQuestions.length && (
        <div className="flex flex-col gap-2">
          <Card className="w-full shadow-md">
            <CardHeader>Well-done 🎉 now let's review your answers</CardHeader>
          </Card>
          <Button className="shadow-md">Review Answers</Button>
        </div>
      )}
    </div>
  );
};

export default TutorialPage;
