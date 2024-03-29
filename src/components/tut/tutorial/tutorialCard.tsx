import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "~/components/ui/card";
import MoreInfoDrawer from "../moreInfo";

import remarkGfm from "remark-gfm";
const TutorialCard = ({ content }: { content: string }) => {
  return (
    <div className="relative w-full">
      <Card className="w-full text-center">
        <CardContent className="p-3 min-h-52 sm:p-6 gap-4 text-start whitespace-pre-line flex flex-col justify-between">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="text-sm sm:text-base markdown"
          >
            {content}
          </ReactMarkdown>
          <MoreInfoDrawer />
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorialCard;
