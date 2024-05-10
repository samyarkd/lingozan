"use client";

import { TutorialSteps } from "@prisma/client";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useStep } from "usehooks-ts";
import TutorialActions from "./actions";
import TutorialTitle from "./title";
import Translation from "./translation";
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
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Translation />
        </Suspense>
      </ErrorBoundary>

      <TutorialCard {...{ content: currnetCard?.body as string }} />

      <TutorialActions {...{ tutorialId, helpers }} />
    </div>
  );
};

export default Tutorial;
