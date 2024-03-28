import { AnimatePresence, motion } from "framer-motion";
import { Heading } from "~/components/ui/Typography";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

const TutorialTitle = ({
  title,
  currentStep,
  canGoToNextStep,
}: {
  title: string;
  currentStep: number;
  canGoToNextStep: boolean;
}) => {
  return (
    <div className="relative sm:mt-0 mt-5">
      <Card className="w-full sm:min-w-96 text-center">
        <CardContent className="p-2">
          <Heading>{title}</Heading>
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
  );
};

export default TutorialTitle;
