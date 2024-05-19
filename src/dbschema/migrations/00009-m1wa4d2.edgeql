CREATE MIGRATION m1wa4d264xlmaleqqxpvf74n2vpfi2bg3l3vkucvgkquk6y3kloiuq
    ONTO m1wpbzmfavxxcm6nr2ilougcog2ia5q5fepf7sadq6b7u6mmuspfrq
{
  CREATE TYPE default::Question {
      CREATE REQUIRED LINK tutorial: default::Tutorial;
      CREATE REQUIRED PROPERTY answers: std::json;
      CREATE REQUIRED PROPERTY correctAnswer: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  ALTER TYPE default::Tutorial {
      CREATE MULTI LINK tutorialQuestions := (.<tutorial[IS default::Question]);
  };
};
