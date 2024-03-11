import { Card, CardContent, CardHeader } from "./ui/card";

const GetStartedBanner = () => {
  return (
    <Card className="w-full my-auto bg-white/10 backdrop-blur text-center max-w-lg">
      <CardHeader>
        <h1 className="text-2xl font-semibold">Welcome</h1>
      </CardHeader>
      <CardContent className="space-y-4 md:text-lg">
        <p>
          Type or paste the phrase you want to learn into the input field. For
          example,
          <span className="text-zinc-500">
            "こんにちは、リンゴザンです。"
          </span>{" "}
          and I will take care of the rest.
        </p>{" "}
        <p>
          Click <b className="font-semibold">"Generate Tutorial"</b> and I'll
          provide a 10-step breakdown covering vocabulary, grammar,
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
