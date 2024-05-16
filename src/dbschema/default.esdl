using extension auth;

module default {
  global current_user := (
    assert_single((
      select User
      filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );

  type User {
    name: str;
    avatar_url: str;

    email: str {
      constraint exclusive;
    }
    required identity: ext::auth::Identity {
      constraint exclusive;
    };
  }

  type Tutorial {
    required user: User;
    required phrase: str;
    multi tutorialSteps: TutorialSteps;
  }

  type TutorialSteps {
    required title: str;
    required body: str;
  }
}