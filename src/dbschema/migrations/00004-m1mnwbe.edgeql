CREATE MIGRATION m1mnwbexqrceq5bbhlv52ednviwbivjh47ejy3uwlgm7lphmxuvpma
    ONTO m1t2uy6jpqbqdt3ru3qnagk7mz3fl5ibf5vsutoi22a4irjeyx5sdq
{
  ALTER TYPE default::User {
      CREATE REQUIRED LINK identity: ext::auth::Identity {
          SET REQUIRED USING (<ext::auth::Identity>{});
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE GLOBAL default::current_user := (std::assert_single((SELECT
      default::User
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
  DROP TYPE default::Account;
  DROP TYPE default::Session;
  DROP TYPE default::VerificationToken;
};
