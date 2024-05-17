import Link from "next/link";
import { auth } from "~/edgedb";
import { db } from "~/server/db";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Lingozan from "./Lingozan";

const Header = async () => {
  const session = auth.getSession();
  const isSignedIn = await session.isSignedIn();

  const cu = await db
    .select(db.global.current_user, () => {
      return {
        name: true,
        avatar_url: true,
      };
    })
    .run(session.client);

  return (
    <div className="h-full z-50 bg-emerald-50 backdrop-blur flex justify-between items-center sticky top-0 border-b border-solid border-primary/20 p-2">
      <Lingozan />
      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <span className="text-sm text-emerald-700 font-semibold">
            {cu?.name}{" "}
          </span>
          <Avatar className="w-8 h-8 border-2 border-emerald-700">
            <AvatarImage src={cu?.avatar_url ?? undefined} />
            <AvatarFallback>
              {cu?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <Link href={auth.getBuiltinUISignUpUrl()}>Not signed In</Link>
      )}
    </div>
  );
};

export default Header;
