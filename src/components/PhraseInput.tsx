import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

export function PhraseInput() {
  return (
    <div className="grid w-full gap-2 md:mb-6">
      <Textarea
        className="backdrop-blur-sm xs:text-lg md:text-3xl bg-white/30"
        maxLength={300}
        placeholder="Type your message here."
      />
      <Button className="md:text-3xl sm:text-lg md:py-10" size="lg">
        Send Message
      </Button>
    </div>
  );
}

export default PhraseInput;
