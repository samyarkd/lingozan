"use client";
import Link from "next/link";
import { useState } from "react";
import { Heading } from "~/components/ui/Typography";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

const tutorialSteps = [
  {
    step: 1,
    title: "Vocabulary",
    content:
      '- Koko = This place, here\n- Wa = Topic marker particle\n- Doko = Where\n- Desu = Is (Polite form of verb "to be")\n- Ka = Question particle',
  },
  {
    step: 2,
    title: "Word Order",
    content:
      '- Japanese follows a Subject-Object-Verb word order\n- The phrase translates literally as "Here what place is?"',
  },
  {
    step: 3,
    title: 'Topic Marker "Wa"',
    content:
      "- Marks the topic being talked about (koko/here)\n- Differentiates it from the subject",
  },
  {
    step: 4,
    title: 'Question Particle "Ka"',
    content:
      "- Added at the end to indicate a question\n- Makes the statement into a query",
  },
  {
    step: 5,
    title: "Polite Speech",
    content:
      '- Desu is the polite copula form meaning "is"\n- Used in Japanese in most formal/polite contexts',
  },
  {
    step: 6,
    title: "Pronunciation",
    content: '- Ko-ko-wa-do-ko-de-su-ka\n- Note the elongated "o" vowel sounds',
  },
  {
    step: 7,
    title: "Usage",
    content:
      "- Asking for the location of somewhere unfamiliar\n- Can substitute koko for other location words",
  },
  {
    step: 8,
    title: "Example Responses",
    content:
      "- Kore wa gakkou desu. (This is a school.)\n- Nihon no naka desu. (It's in Japan.)",
  },
  {
    step: 9,
    title: "Grammar Patterns",
    content:
      "- [Location] wa [location descriptor] desu [ka]?\n- Common grammar for asking about places",
  },
  {
    step: 10,
    title: "Cultural Context",
    content:
      "- Polite questioning is valued in Japanese\n- The casual form drops desu: Koko wa doko?",
  },
];

const TutorialPage = ({ params }: { params: { tutId: string } }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  function changeActiveIndex(next: -1 | 1) {
    if (activeIndex === 0) {
      setActiveIndex(activeIndex + 1);
      return;
    }

    if (activeIndex === tutorialSteps.length - 1) {
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
        {tutorialSteps.map((step, idx) => {
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
                {step.content}
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
          disabled={activeIndex === tutorialSteps.length - 1}
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
              activeIndex === tutorialSteps.length - 1 ? "default" : "link"
            }
            className="w-full"
          >
            {activeIndex === tutorialSteps.length - 1
              ? "Take a Quiz"
              : "Skip To take a Quiz"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TutorialPage;
