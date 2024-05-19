CREATE MIGRATION m16xo62nw4g4iachumjhvdtbe7uy7ez7zh3cfqchbonasjval3uuqa
    ONTO m1rg5p6jhd2ow7avnravf6izlwxzuwiw23qkivl4lqlnhu6ouhwjya
{
  ALTER TYPE default::AnswerdQuestion RENAME TO default::AnsweredQuestion;
};
