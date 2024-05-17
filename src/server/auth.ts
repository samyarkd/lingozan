import { auth } from "~/edgedb";
import { db } from "./db";

/**
 */
export const getServerAuthSession = async () => {
  const sessionIdentity = auth.getSession();

  const cu = await db
    .select(db.global.current_user, () => {
      return {
        id: true,
        name: true,
        avatar_url: true,
      };
    })
    .run(sessionIdentity.client);

  return {
    ...sessionIdentity,
    user: cu,
  };
};
