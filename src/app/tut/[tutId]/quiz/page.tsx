"use client";
import Link from "next/link";
import { useState } from "react";
import { Heading } from "~/components/ui/Typography";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

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
    <div className="grid gap-6 justify-center items-center content-center justify-items-center min-h-screen">
      <Card className="w-96 max-w-2xl shadow-md backdrop-blur bg-white/35 text-center">
        <CardContent className="p-2">
          <Heading>Step By Step Tutorial</Heading>
        </CardContent>
      </Card>
      <div className="relative h-52 w-full">
        {quizQuestions.map((step, idx) => {
          return (
            <Card
              key={idx}
              style={{
                right: activeIndex === idx ? 0 : idx * -5,
                bottom: activeIndex === idx ? 0 : idx * -1,
                transform: activeIndex === idx ? "" : `rotate(${idx * 1}deg)`,
                zIndex: -idx + (activeIndex === idx ? 100 : 0),
              }}
              className="w-full absolute min-h-56 backdrop-blur bg-white/35 text-center"
            >
              <CardContent className="pt-6 text-start whitespace-pre-line">
                {step.question}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid grid-cols-4 w-full gap-x-4 gap-y-2">
        <Button
          disabled={activeIndex === 0}
          onClick={() => {
            changeActiveIndex(-1);
          }}
          className={cn("col-span-1 shadow-md disabled:cursor-not-allowed")}
          variant="secondary"
        >
          Back
        </Button>
        <Button
          disabled={activeIndex === quizQuestions.length - 1}
          onClick={() => {
            changeActiveIndex(1);
          }}
          className="col-span-3 shadow-md disabled:cursor-not-allowed"
        >
          Next
        </Button>
        <Link className="col-span-4" href={`/tut/${params.tutId}/quiz`}>
          <Button
            variant={
              activeIndex === quizQuestions.length - 1 ? "default" : "link"
            }
            className="w-full"
          >
            {activeIndex === quizQuestions.length - 1
              ? "Take a Quiz"
              : "Skip To take a Quiz"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TutorialPage;
