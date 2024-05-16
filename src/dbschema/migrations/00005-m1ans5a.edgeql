CREATE MIGRATION m1ans5atcobpgr3iwke2wqxuhyjqbyvrat2v74tenhcin6xcv6eaza
    ONTO m1mnwbexqrceq5bbhlv52ednviwbivjh47ejy3uwlgm7lphmxuvpma
{
  ALTER TYPE default::User {
      CREATE PROPERTY avatar_url: std::str;
  };
};
