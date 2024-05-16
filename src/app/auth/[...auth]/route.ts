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

    if (isSignUp && tokenData) {
      const userDataReq = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${tokenData.provider_token}`,
        },
      });
      const userData = (await userDataReq.json()) as GithubUserDataRes;

      await db
        .insert(db.User, {
          name: userData.name,
          avatar_url: userData.email ?? undefined,
          email: userData.email ?? undefined,
          identity: db.assert_exists(
            db.select(db.ext.auth.Identity, () => ({
              filter_single: { id: tokenData.identity_id! },
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

type GithubUserDataRes = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string | null;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  blog: string;
  email: string | null;
  hireable: boolean;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};
