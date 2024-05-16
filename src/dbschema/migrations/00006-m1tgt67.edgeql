CREATE MIGRATION m1tgt67bt5mcszmqin6nhkw67nbsrtxoibsbbswyt37wh5z3hzlnsq
    ONTO m1ans5atcobpgr3iwke2wqxuhyjqbyvrat2v74tenhcin6xcv6eaza
{
  ALTER TYPE default::User {
      DROP PROPERTY emailVerified;
      DROP PROPERTY image;
  };
};
