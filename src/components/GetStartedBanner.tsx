import { Heading } from "./ui/Typography";
import { Card, CardContent, CardHeader } from "./ui/card";

const GetStartedBanner = () => {
  return (
    <Card className="shadow-md w-full my-auto bg-white/10 backdrop-blur text-center max-w-lg">
      <CardHeader>
        <Heading>Learn a Language the Fun Way</Heading>
      </CardHeader>
      <CardContent className="space-y-4 md:text-lg">
        <p>
          Type or paste the phrase you want to learn into the input field. For
          example,
          <span className="text-zinc-500">
            &#34;こんにちは、リンゴザンです。&#34;
          </span>{" "}
          and I will take care of the learning curve.
        </p>{" "}
        <p>
          Click{" "}
          <b className="font-semibold">
            Generate a Tutorial, a Quiz and a Review of the Quiz
          </b>{" "}
          and I&#39;l provide a 10-step breakdown covering vocabulary, grammar,
          pronunciation, and cultural context.
        </p>
        <p>
          Learn phrases interactively through these tailored tutorials. Enter
          new phrases anytime for fresh lessons!
        </p>
      </CardContent>
    </Card>
  );
};

export default GetStartedBanner;
