CREATE MIGRATION m1o3bvyjti2hineuoasjgw4lglg3g65u2a23hodklck55bialu23na
    ONTO m1tgt67bt5mcszmqin6nhkw67nbsrtxoibsbbswyt37wh5z3hzlnsq
{
  ALTER TYPE default::TutorialSteps RENAME TO default::TutorialStep;
  ALTER TYPE default::TutorialStep {
      CREATE REQUIRED LINK tutorial: default::Tutorial {
          SET REQUIRED USING (<default::Tutorial>{});
      };
  };
  ALTER TYPE default::Tutorial {
      ALTER LINK tutorialSteps {
          USING (.<tutorial[IS default::TutorialStep]);
      };
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK tutorials := (.<user[IS default::Tutorial]);
  };
};
