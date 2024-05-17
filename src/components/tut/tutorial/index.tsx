"use client";

import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useStep } from "usehooks-ts";
import { type api } from "~/trpc/server";
import TutorialActions from "./actions";
import TutorialTitle from "./title";
import Translation from "./translation";
import TutorialCard from "./tutorialCard";

type TutorialStep = {
  body: string;
  title: string;
};

interface TutorialProps {
  tutorialId: string;
  tutorial: NonNullable<
    Awaited<ReturnType<typeof api.tutorial.getTutorial.query>>
  >;
}

const TutorialPage = ({ tutorialId, tutorial }: TutorialProps) => {
  const tutorialSteps: TutorialStep[] = tutorial.tutorialSteps;
  const [currentStep, helpers] = useStep(tutorialSteps?.length ?? 0);
  const { canGoToNextStep } = helpers;

  function updateCurrentTutorial(): TutorialStep {
    return tutorialSteps[currentStep - 1];
  }

  const currnetCard = useMemo(updateCurrentTutorial, [currentStep]);

  return (
    <div className="grid p-4 mt-6 sm:p-0 gap-6 max-w-screen-sm mx-auto sm:justify-center content-between sm:content-around min-h-screen">
      <TutorialTitle
        {...{
          currentStep,
          canGoToNextStep,
          title: currnetCard?.title,
        }}
      />
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Translation translation={tutorial.translation} />
        </Suspense>
      </ErrorBoundary>

      <TutorialCard {...{ content: currnetCard?.body }} />

      <TutorialActions {...{ tutorialId, helpers }} />
    </div>
  );
};

export default TutorialPage;
