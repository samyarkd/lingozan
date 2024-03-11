import { unstable_noStore as noStore } from "next/cache";
import GetStartedBanner from "~/components/GetStartedBanner";
import PhraseInput from "~/components/PhraseInput";

export const metadata = {
  title: "Lingozan 😃",
};

export default async function Home() {
  noStore();

  return (
    <main className="md:p-16 p-4 sm:p-10 h-screen flex flex-col items-center justify-end">
      <GetStartedBanner />
      <PhraseInput />
    </main>
  );
}
