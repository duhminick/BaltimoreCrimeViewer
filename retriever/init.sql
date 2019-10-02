CREATE TABLE IF NOT EXISTS crimes(
    id serial PRIMARY KEY,
    longitude double precision,
    latitude double precision,
    crimedate date,
    crimehour int,
    crimeminute int,
    crimecode text,
    location text,
    description text,
    inside boolean,
    weapon text,
    post text,
    district text,
    neighborhood text,
    premise text
);