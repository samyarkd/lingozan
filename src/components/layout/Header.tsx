import Link from "next/link";
import { auth } from "~/edgedb";
import { db } from "~/server/db";
import Lingozan from "./Lingozan";

const Header = async () => {
  const session = auth.getSession();
  const isSignedIn = await session.isSignedIn();

  const cu = await db
    .select(db.global.current_user, () => {
      return {
        name: true,
      };
    })
    .run(session.client);

  console.log(cu);

  return (
    <div className="h-full flex justify-between items-center">
      <Lingozan />
      {isSignedIn ? (
        <span>{cu?.name}</span>
      ) : (
        <Link href={auth.getBuiltinUISignUpUrl()}>Not signed In</Link>
      )}
    </div>
  );
};

export default Header;
