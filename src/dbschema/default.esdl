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

    multi tutorials := (.<user[is Tutorial]);

    required identity: ext::auth::Identity {
      constraint exclusive;
    };
  }

  type Tutorial {
    required phrase: str;
    required user: User;
    required translation: str;
    multi tutorialSteps := (.<tutorial[is TutorialStep]);
  }

  type TutorialStep {
    required title: str;
    required body: str;

    required tutorial: Tutorial
  }
}
