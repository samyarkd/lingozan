CREATE MIGRATION m1rg5p6jhd2ow7avnravf6izlwxzuwiw23qkivl4lqlnhu6ouhwjya
    ONTO m17bqmnotptqpi5dfsg6u2wa5lypgsxastqyqe7khfzvlwewfcvxea
{
  CREATE TYPE default::AnswerdQuestion {
      CREATE REQUIRED LINK question: default::Question;
      CREATE REQUIRED PROPERTY isCorrect: std::bool;
      CREATE REQUIRED PROPERTY userAnswer: std::str;
  };
  ALTER TYPE default::Question {
      CREATE MULTI LINK answeredQuestions := (.<question[IS default::AnswerdQuestion]);
  };
  CREATE TYPE default::TakenQuiz {
      CREATE REQUIRED LINK tutorial: default::Tutorial;
      CREATE PROPERTY review: std::str;
  };
  ALTER TYPE default::AnswerdQuestion {
      CREATE REQUIRED LINK takenQuiz: default::TakenQuiz;
  };
  ALTER TYPE default::TakenQuiz {
      CREATE MULTI LINK answeredQuestions := (.<takenQuiz[IS default::AnswerdQuestion]);
  };
  ALTER TYPE default::Tutorial {
      CREATE MULTI LINK takenQuizzes := (.<tutorial[IS default::TakenQuiz]);
  };
};
