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
    multi tutorialQuestions := (.<tutorial[is Question]);
    multi takenQuizzes := (.<tutorial[is TakenQuiz]);
  }

  type TutorialStep {
    required title: str;
    required body: str;

    required tutorial: Tutorial
  }

  type Question {
    required title: str;
    required answers: array<str>;
    required correctAnswer: str;

    required tutorial: Tutorial;
   
    multi answeredQuestions := (.<question[is AnsweredQuestion]);
  }

  type TakenQuiz {
    review: str;

    multi answeredQuestions := (.<takenQuiz[is AnsweredQuestion]);
    required tutorial: Tutorial;
  }

  type AnsweredQuestion {
    required isCorrect: bool;
    required userAnswer: str;

    required question: Question;
    required takenQuiz: TakenQuiz;
  }
}
