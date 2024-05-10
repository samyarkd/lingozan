module default {
  type Account {
    required type: str;
    required provider: str {
      constraint exclusive;
    }
    required providerAccountId: str {
      constraint exclusive;
    }
    required user: User;
    
    refresh_token: str;
    access_token: str; 
    expires_at: int32;
    token_type: str;
    scope: str;
    id_token: str;
    session_state: str;
    refresh_token_expires_in: int32;
  }
  
  type Session {
    required sessionToken: str {
      constraint exclusive;
    }
    required expires:  datetime;
    required user: User;
  }

  type User {
    name: str;
    email: str {
      constraint exclusive;
    }
    emailVerified:    datetime;
    image:            str;
  }

  type VerificationToken {
    required identifier: str;
    required token: str {
      constraint exclusive;
    }
    required expires: datetime {
      constraint exclusive;
    }
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
