CREATE MIGRATION m1pp7vebkbnvzrdvmd6bxomno6rgjshji7utlsyhg64jwaaq72xzbq
    ONTO initial
{
  CREATE TYPE default::Hello {
      CREATE REQUIRED PROPERTY world: std::str;
  };
};
