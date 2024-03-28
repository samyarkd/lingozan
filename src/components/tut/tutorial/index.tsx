"use client";

import { TutorialSteps } from "@prisma/client";
import { useMemo } from "react";
import { useStep } from "usehooks-ts";
import TutorialActions from "./actions";
import TutorialTitle from "./title";
import TutorialCard from "./tutorialCard";

interface TutorialProps {
  tutorialId: string;
  tutorialSteps: TutorialSteps[];
}

const Tutorial = ({ tutorialId, tutorialSteps }: TutorialProps) => {
  const [currentStep, helpers] = useStep(tutorialSteps.length);
  const { canGoToNextStep } = helpers;

  const currnetCard = useMemo(() => {
    return tutorialSteps[currentStep - 1];
  }, [currentStep]);

  return (
    <div className="grid p-4 sm:p-0 gap-6 max-w-screen-sm mx-auto sm:justify-center content-between sm:content-around min-h-screen">
      <TutorialTitle
        {...{
          currentStep,
          canGoToNextStep,
          title: currnetCard?.title as string,
        }}
      />

      <TutorialCard {...{ content: currnetCard?.body as string }} />

      <TutorialActions {...{ tutorialId, helpers }} />
    </div>
  );
};

export default Tutorial;
