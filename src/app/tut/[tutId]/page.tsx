import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import Tutorial from "~/components/tut/tutorial";
import { api } from "~/trpc/server";

const TutorialPage = async ({ params }: { params: { tutId: string } }) => {
  noStore();

  const tutorial = await api.tutorial.getTutorial.query({
    id: params.tutId,
  });

  if (!tutorial) {
    notFound();
  }

  return (
    <Tutorial
      tutorialId={params.tutId}
      tutorialSteps={tutorial.tutorialSteps}
    />
  );
};

export default TutorialPage;
