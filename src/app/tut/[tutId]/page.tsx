"use client";

import { AnimatePresence, motion } from "framer-motion";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { useStep } from "usehooks-ts";
import MoreInfoDrawer from "~/components/tut/moreInfo";
import { Heading } from "~/components/ui/Typography";
import { Badge } from "~/components/ui/badge";
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
  noStore();
  const [currentStep, helpers] = useStep(tutorialSteps.length);

  const { canGoToPrevStep, canGoToNextStep, goToNextStep, goToPrevStep } =
    helpers;

  return (
    <div className="grid p-4 sm:p-0 gap-6 sm:justify-center content-between sm:content-around min-h-screen">
      <div className="relative sm:mt-0 mt-5">
        <Card className="w-full sm:min-w-96 text-center">
          <CardContent className="p-2">
            <Heading>Step By Step Tutorial</Heading>
          </CardContent>
        </Card>
        <div className="grid w-full gap-2 grid-cols-10 absolute -top-1/3 left-0 px-2 justify-items-center">
          <AnimatePresence>
            {new Array(currentStep + (canGoToNextStep ? -1 : 0))
              .fill(true)
              .map((_, idx) => {
                return (
                  <motion.div
                    key={`step ${idx}`}
                    initial={{ top: 0, opacity: 0.5 }}
                    animate={{ top: "-10%", opacity: 1 }}
                    exit={{ top: 0, opacity: 0 }}
                    className="relative -z-10"
                  >
                    <Badge variant="default" className="w-5 h-10" />
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>
      <div className="relative w-full">
        <Card className="w-full text-center">
          <CardContent className="p-3 min-h-52 sm:p-6 gap-4 text-start whitespace-pre-line flex flex-col justify-between">
            <p className="text-sm sm:text-base">
              {tutorialSteps[currentStep - 1]?.content}
            </p>
            <MoreInfoDrawer />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 w-full gap-x-4 gap-y-2">
        <Button
          disabled={!canGoToPrevStep}
          onClick={() => {
            goToPrevStep();
          }}
          className={cn("sm:col-span-1 shadow-md disabled:cursor-not-allowed")}
          variant="secondary"
        >
          Back
        </Button>
        <Button
          disabled={!canGoToNextStep}
          onClick={() => {
            goToNextStep();
          }}
          className="sm:col-span-3 shadow-md disabled:cursor-not-allowed"
        >
          Next
        </Button>
        <Link className="sm:col-span-4" href={`/tut/${params.tutId}/quiz`}>
          <Button
            variant={!canGoToNextStep ? "default" : "link"}
            className="w-full"
          >
            {canGoToNextStep ? "Skip to Take the Quiz" : "Take the Quiz"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TutorialPage;
