import { unstable_noStore as noStore } from "next/cache";
import GetStartedBanner from "~/components/GetStartedBanner";
import PhraseInput from "~/components/PhraseInput";
import { auth } from "~/edgedb";
import { db } from "~/server/db";

export const metadata = {
  title: "Lingozan 😃",
};

export default async function Home() {
  noStore();
  const session = auth.getSession();

  const cu = await db
    .select(db.global.current_user, () => {
      return {
        id: true,
      };
    })
    .run(session.client);

  return (
    <div className="md:p-16 flex-grow h-full p-4 sm:p-10 flex flex-col items-center justify-end">
      <GetStartedBanner />
      <PhraseInput
        signInUrl={auth.getBuiltinUISignUpUrl()}
        userSigedIn={!!cu}
      />
    </div>
  );
}
