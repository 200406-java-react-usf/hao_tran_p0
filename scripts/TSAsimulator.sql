create user tester with password 'Ac!00899297';

create database TSAsimulator;

grant all privileges on database TSAsimulator to tester;

set
    search_path to TSAsimulator;

--roles
create table user_roles(
    id serial,
    name varchar(25) not null,
    constraint user_roles_pk primary key (id)
);

insert into
    user_roles (name)
values
    ('Admin'),
    ('Dev'),
    ('User'),
    ('Locked');

-- user
create table users (
    id serial,
    username varchar(25) unique not null,
    userpassword varchar(25) not null,
    score int not null,
    userrole int not null,
    constraint app_users_pk primary key (id),
    constraint user_role_fk foreign key (userrole) references user_roles
);

insert into
    users (username, userpassword, score, userrole)
values
    ('test', 'test', 100, 3);

SELECT
    *
FROM
    users
    INNER JOIN user_roles ON users.userrole = user_roles.id;

-- passports
create table origins(
    id serial,
    name varchar(25) not null unique,
    constraint origins_pk primary key (id)
);

insert into
    origins (name)
values
    ('Constantinopolis'),
    ('Birka'),
    ('Visby'),
    ('Sjaelland'),
    ('Cathay'),
    ('Praha'),
    ('Hesse'),
    ('Kiev'),
    ('Diyari Bekir'),
    ('Tingi'),
    ('Venezia'),
    ('Yerewan');

create table occupations(
    id serial,
    name varchar(25) not null unique,
    constraint occupations_pk primary key (id)
);

insert into
    occupations (name)
values
    ('Poet'),
    ('Pilgrim'),
    ('Soldier'),
    ('Merchant'),
    ('Noble');

create table races(
    id serial,
    name varchar(25) not null unique,
    constraint races_pk primary key (id)
);

insert into
    races (name)
values
    ('Greek'),
    ('Norse'),
    ('Chinese'),
    ('Bohemian'),
    ('Rhenish'),
    ('Kievian'),
    ('Trukish'),
    ('Morrocan'),
    ('Italian'),
    ('Armenian');

create table religions(
    id serial,
    name varchar(25) not null unique,
    constraint religions_pk primary key (id)
);

insert into
    religions (name)
values
    ('Orthodox'),
    ('Germanic'),
    ('Taoist'),
    ('Catholic'),
    ('Sunni'),
    ('Miaphysite');

create table cultures(
    id serial,
    name varchar(25) not null unique,
    constraint cultures_pk primary key (id)
);

insert into
    cultures (name)
values
    ('Roman Empire'),
    ('Svealand'),
    ('Gotland'),
    ('Tanmarkar'),
    ('Tang'),
    ('Holy Roman Empire'),
    ('Rus'),
    ('Sejuk'),
    ('Ayt Mrin'),
    ('La Serenissima'),
    ('Vaspowrakan');

--create passports
create table passports (
    id serial unique,
    firstname VARCHAR(25) not null,
    lastname VARCHAR(25) not null,
    origin int not null,
    occupation int not null,
    race int not null,
    religion int not null,
    culture int not null,
    property int not null,
    selected boolean not null,
    constraint passports_pk primary key (id),
    constraint origin_fk foreign key (origin) references origins,
    constraint occupation_fk foreign key (occupation) references occupations,
    constraint race_fk foreign key (race) references races,
    constraint religion_fk foreign key (religion) references religions,
    constraint culture_fk foreign key (culture) references cultures
);

-- passport insert
insert into
    passports (
        firstname,
        lastname,
        origin,
        occupation,
        race,
        religion,
        culture,
        property,
        selected
    )
values
    ('Nikolaos', 'Adamos', 1, 1, 1, 1, 1, 500, false),
    (
        'Ioannes',
        'Maliasenos',
        1,
        2,
        1,
        1,
        1,
        10,
        false
    ),
    ('Halfdan', 'Bjornsson', 2, 3, 2, 2, 1, 50, false),
    ('Erik', 'Ivarsson', 3, 4, 2, 2, 3, 1000, false),
    ('Kapi', 'Stensson', 4, 3, 2, 2, 4, 1000, false),
    ('Chao', 'Zhao', 5, 4, 3, 3, 5, 5000, false),
    ('Jan', 'Sokol ', 6, 5, 4, 4, 6, 0, false),
    ('Otto', 'von Hesse', 7, 2, 5, 4, 6, 0, false),
    ('Olga', 'Kiyevskaya', 8, 5, 6, 1, 7, 2000, false),
    ('Ahmet', 'Omer', 9, 3, 7, 5, 8, 200, false),
    ('Abu', 'ibn Battuta', 10, 2, 8, 5, 9, 800, false),
    (
        'Lorenzo',
        'da Venezia',
        11,
        4,
        9,
        4,
        10,
        800,
        false
    ),
    (
        'David',
        'Tumasyan',
        12,
        4,
        10,
        6,
        11,
        1500,
        false
    );


--dailyevents
create table dailyevents (
    id serial,
    title varchar(25) not null,
    content varchar(256) not null,
    groupname varchar(25) not null unique,
    selected boolean not null,
    constraint dailyevents_pk primary key (id)
);

--groups of different combination
create table religion_christian
(
    id serial unique,
    firstname VARCHAR(25) not null,
    lastname VARCHAR(25) not null,
    origin int not null,
    occupation int not null,
    race int not null,
    religion int not null,
    culture int not null,
    property int not null,
    selected boolean not null,
    constraint religion_christian_passports_pk primary key (id),
    constraint religion_christian_origin_fk foreign key (origin) references origins,
    constraint religion_christian_occupation_fk foreign key (occupation) references occupations,
    constraint religion_christian_race_fk foreign key (race) references races,
    constraint religion_christian_religion_fk foreign key (religion) references religions,
    constraint religion_christian_culture_fk foreign key (culture) references cultures
);
INSERT INTO
    religion_christian 
SELECT * FROM
    passports
WHERE
    "religion" = 1
    or "religion" = 4
    or "religion" = 6
;

create table race_norse
(
    id serial unique,
    firstname VARCHAR(25) not null,
    lastname VARCHAR(25) not null,
    origin int not null,
    occupation int not null,
    race int not null,
    religion int not null,
    culture int not null,
    property int not null,
    selected boolean not null,
    constraint race_norse_passports_pk primary key (id),
    constraint race_norse_origin_fk foreign key (origin) references origins,
    constraint race_norse_occupation_fk foreign key (occupation) references occupations,
    constraint race_norse_race_fk foreign key (race) references races,
    constraint race_norse_religion_fk foreign key (religion) references religions,
    constraint race_norse_culture_fk foreign key (culture) references cultures

);
INSERT INTO
    race_norse
SELECT * FROM
    passports
WHERE
"race" = 2 or "race" = 6;



create table occupation_not_soldier
(
    id serial unique,
    firstname VARCHAR(25) not null,
    lastname VARCHAR(25) not null,
    origin int not null,
    occupation int not null,
    race int not null,
    religion int not null,
    culture int not null,
    property int not null,
    selected boolean not null,
    constraint occupation_not_soldier_passports_pk primary key (id),
    constraint occupation_not_soldier_origin_fk foreign key (origin) references origins,
    constraint occupation_not_soldier_occupation_fk foreign key (occupation) references occupations,
    constraint occupation_not_soldier_race_fk foreign key (race) references races,
    constraint occupation_not_soldier_religion_fk foreign key (religion) references religions,
    constraint occupation_not_soldier_culture_fk foreign key (culture) references cultures
);
INSERT INTO
    occupation_not_soldier
SELECT * FROM
    passports
WHERE
"occupation" != 3;


create table occupation_not_pilgrim
(
    id serial unique,
    firstname VARCHAR(25) not null,
    lastname VARCHAR(25) not null,
    origin int not null,
    occupation int not null,
    race int not null,
    religion int not null,
    culture int not null,
    property int not null,
    selected boolean not null,
    constraint occupation_not_pilgrim_passports_pk primary key (id),
    constraint occupation_not_pilgrim_origin_fk foreign key (origin) references origins,
    constraint occupation_not_pilgrim_occupation_fk foreign key (occupation) references occupations,
    constraint occupation_not_pilgrim_race_fk foreign key (race) references races,
    constraint occupation_not_pilgrim_religion_fk foreign key (religion) references religions,
    constraint occupation_not_pilgrim_culture_fk foreign key (culture) references cultures

);
INSERT INTO
    occupation_not_pilgrim
SELECT * FROM
    passports
WHERE
"occupation" != 2;

-- Each events correspond to 1 group to admit
insert into
    dailyevents (title, content, groupname, selected)
values
    (
        'Christian Only',
        'only allow christians',
        'religion_christian',
        false
    ),
    (
        'Crusade of the Beggars',
        'no pilgrims',
        'occupation_not_pilgrim',
        false
    ),
    (
        'Powerful Generals',
        'no soldiers',
        'occupation_not_soldier',
        false
    ),
    (
        'Varangian Guards',
        'only allow Norse or Kievian',
        'race_norse',
        false
    );

​ ​ commit;