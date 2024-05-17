import { unstable_noStore as noStore } from "next/cache";
import GetStartedBanner from "~/components/GetStartedBanner";
import PhraseInput from "~/components/PhraseInput";

export const metadata = {
  title: "Lingozan 😃",
};

export default async function Home() {
  noStore();

  return (
    <div className="md:p-16 flex-grow h-full p-4 sm:p-10 flex flex-col items-center justify-end">
      <GetStartedBanner />
      <PhraseInput />
    </div>
  );
}
