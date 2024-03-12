"use client";
import { animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

const phrases = [
  "Enter a phrase to learn it!",
  "こんにちは、リンゴザンです。",
  "Silav navê min Lingozan e.",
  "Hallo, mein Name ist Lingozan.",
];

export function PhraseInput() {
  const [placeholder, setPlaceholder] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    async function runAnimations() {
      while (true) {
        for await (const phrase of phrases) {
          await animate(0, phrase.length, {
            onUpdate: (latest) => {
              setPlaceholder(phrase.slice(0, latest));
            },
            delay: 0.5,
            duration: 0.5,
          });

          await animate(phrase.length, 0, {
            onUpdate: (latest) => {
              setPlaceholder(phrase.slice(0, latest));
            },
            delay: 2.5,
            duration: 0.5,
          });
        }
      }
    }

    runAnimations();
  }, []);

  return (
    <div className="grid w-full gap-2 lg:mb-6 max-w-2xl">
      <Textarea
        ref={inputRef}
        className="shadow-md backdrop-blur-sm xs:text-lg lg:text-2xl md:text-xl bg-white/50"
        maxLength={300}
        placeholder={placeholder}
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
