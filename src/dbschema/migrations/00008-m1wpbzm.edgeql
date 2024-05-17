CREATE MIGRATION m1wpbzmfavxxcm6nr2ilougcog2ia5q5fepf7sadq6b7u6mmuspfrq
    ONTO m1o3bvyjti2hineuoasjgw4lglg3g65u2a23hodklck55bialu23na
{
  ALTER TYPE default::Tutorial {
      CREATE REQUIRED PROPERTY translation: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
