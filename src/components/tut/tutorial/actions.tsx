import Link from "next/link";
import { useStep } from "usehooks-ts";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface TutorialActionsProps {
  helpers: ReturnType<typeof useStep>[1];
  tutorialId: string;
}

const TutorialActions = ({ helpers, tutorialId }: TutorialActionsProps) => {
  const { canGoToPrevStep, canGoToNextStep, goToNextStep, goToPrevStep } =
    helpers;

  return (
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
      <Link className="sm:col-span-4" href={`/tut/${tutorialId}/quiz`}>
        <Button
          variant={!canGoToNextStep ? "default" : "link"}
          className="w-full"
        >
          {canGoToNextStep ? "Skip to Take the Quiz" : "Take the Quiz"}
        </Button>
      </Link>
    </div>
  );
};

export default TutorialActions;
