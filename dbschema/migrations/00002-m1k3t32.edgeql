CREATE MIGRATION m1k3t32674jyxcrprl3wswcp2mw62eotqosskzdlwgf4uai7z2hcra
    ONTO m1pp7vebkbnvzrdvmd6bxomno6rgjshji7utlsyhg64jwaaq72xzbq
{
  CREATE TYPE default::User {
      CREATE PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY emailVerified: std::datetime;
      CREATE PROPERTY image: std::str;
      CREATE PROPERTY name: std::str;
  };
  CREATE TYPE default::Account {
      CREATE REQUIRED LINK user: default::User;
      CREATE PROPERTY access_token: std::str;
      CREATE PROPERTY expires_at: std::int32;
      CREATE PROPERTY id_token: std::str;
      CREATE REQUIRED PROPERTY provider: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY providerAccountId: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY refresh_token: std::str;
      CREATE PROPERTY refresh_token_expires_in: std::int32;
      CREATE PROPERTY scope: std::str;
      CREATE PROPERTY session_state: std::str;
      CREATE PROPERTY token_type: std::str;
      CREATE REQUIRED PROPERTY type: std::str;
  };
  DROP TYPE default::Hello;
  CREATE TYPE default::Session {
      CREATE REQUIRED LINK user: default::User;
      CREATE REQUIRED PROPERTY expires: std::datetime;
      CREATE REQUIRED PROPERTY sessionToken: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE default::TutorialSteps {
      CREATE REQUIRED PROPERTY body: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  CREATE TYPE default::Tutorial {
      CREATE MULTI LINK tutorialSteps: default::TutorialSteps;
      CREATE REQUIRED LINK user: default::User;
      CREATE REQUIRED PROPERTY phrase: std::str;
  };
  CREATE TYPE default::VerificationToken {
      CREATE REQUIRED PROPERTY expires: std::datetime {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY identifier: std::str;
      CREATE REQUIRED PROPERTY token: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
