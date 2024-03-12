import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

export function PhraseInput() {
  return (
    <div className="grid w-full gap-2 lg:mb-6">
      <Textarea
        className="shadow-md backdrop-blur-sm xs:text-lg lg:text-2xl md:text-xl bg-white/50"
        maxLength={300}
        placeholder="Type your message here."
      />
      <Button
        className="shadow-md lg:text-2xl md:text-xl sm:text-lg md:py-6"
        size="lg"
      >
        Generate Tutorial
      </Button>
    </div>
  );
}

export default PhraseInput;
