create TABLE person
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255),
    height     INTEGER,
    mass       INTEGER,
    hair_color VARCHAR(255),
    skin_color VARCHAR(255),
    eye_color  VARCHAR(255),
    birth_year VARCHAR(255),
    gender     VARCHAR(255)
);

create TABLE starship
(
    id                     SERIAL PRIMARY KEY,
    name                   VARCHAR(255),
    model                  VARCHAR(255),
    manufacturer           VARCHAR(255),
    cost_in_credits        VARCHAR(255),
    length                 VARCHAR(255),
    max_atmosphering_speed VARCHAR(255),
    crew                   VARCHAR(255),
    passengers             VARCHAR(255),
    cargo_capacity         VARCHAR(255),
    consumables            VARCHAR(255),
    hyperdrive_rating      VARCHAR(255),
    starship_class         VARCHAR(255)
);

create TABLE planet
(
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255),
    rotation_period INTEGER,
    orbital_period  INTEGER,
    diameter        INTEGER,
    climate         VARCHAR(255),
    gravity         VARCHAR(255),
    terrain         VARCHAR(255),
    surface_water   INTEGER,
    population      BIGINT
);

create TABLE "user"
(
    id             SERIAL PRIMARY KEY,
    name           VARCHAR(255),
    email          VARCHAR(255),
    password       VARCHAR(255),
    isActivated    BOOLEAN,
    activationLink VARCHAR(255),
    UNIQUE (email)
);

create TABLE token
(
    id           SERIAL PRIMARY KEY,
    "user"       BIGINT,
    refreshToken VARCHAR(255),
    FOREIGN KEY ("user") REFERENCES "user" (id)
);