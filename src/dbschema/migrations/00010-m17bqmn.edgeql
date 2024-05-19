CREATE MIGRATION m17bqmnotptqpi5dfsg6u2wa5lypgsxastqyqe7khfzvlwewfcvxea
    ONTO m1wa4d264xlmaleqqxpvf74n2vpfi2bg3l3vkucvgkquk6y3kloiuq
{
  ALTER TYPE default::Question {
      ALTER PROPERTY answers {
          SET TYPE array<std::str> USING (<array<std::str>>.answers);
      };
  };
};
