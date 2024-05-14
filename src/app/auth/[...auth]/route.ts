import { redirect } from "next/navigation";
import { auth, client } from "~/edgedb";
import { db } from "~/server/db";

export const { GET, POST } = auth.createAuthRouteHandlers({
  async onBuiltinUICallback({ error, provider, tokenData, isSignUp }) {
    if (error) {
      console.error("sign in failed", error);
    }
    if (!tokenData) {
      console.log("email verification required");
    }
    console.log(provider, tokenData);

    if (isSignUp) {
      await db
        .insert(db.User, {
          name: "Just Test",
          identity: db.assert_exists(
            db.select(db.ext.auth.Identity, () => ({
              filter_single: { id: tokenData?.identity_id as string },
            })),
          ),
        })
        .run(client);
    }
    redirect("/");
  },
  onSignout() {
    redirect("/");
  },
});
