CREATE TABLE lol
(
  id  SERIAL PRIMARY KEY,
  name character varying(255) UNIQUE NOT NULL,
  wins BIGINT NOT NULL,
  losses BIGINT NOT NULL,
  division character varying(255) NOT NULL,
  points BIGINT NOT NULL,
  most_used_champs character varying(255) NOT NULL,
  kills character varying(255) NOT NULL,
  deaths character varying(255) NOT NULL,
  assists character varying(255) NOT NULL,
  player_rank BIGINT NOT NULL
);