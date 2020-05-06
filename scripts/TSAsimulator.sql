create user tester
with password 'Ac!00899297';

create database TSAsimulator;

grant all privileges 
on database TSAsimulator
to tester;

set search_path
to TSAsimulator;

-- user
create table users
(
    id serial,
    username varchar(25) unique not null,
    userpassword varchar(25) not null,
    score int not null,
    userrole varchar(25) not null,

    constraint users_pk primary key (id)
);


insert into users
    (username, userpassword, score, userrole)
values
    ('test', 'test', 100, 'tester')
;
-- passports
create table passports
(
    id serial,
    firstname varchar(25) not null,
    lastname varchar(25) not null,
    origin varchar(25) not null,
    occupation varchar(25) not null,
    race varchar(25) not null,
    religion varchar(25) not null,
    culture varchar(25) not null,
    property varchar(25) not null,
    selected boolean not null,

    constraint passports_pk primary key (id)
);

--dailyevents
create table dailyevents
(
    id serial,
    title varchar(25) not null,
    content varchar(256) not null,
    groupname varchar(25) not null,
    selected boolean not null,

    constraint dailyevents_pk primary key (id)
);

--groups 
create table religion_christian 
AS
SELECT *
FROM passports
WHERE "religion" = 'Orthodox' or "religion" = 'Catholic' or "religion" = 'Miaphysite';


create table occupation_not_pilgrim
AS
SELECT *
FROM passports
WHERE "occupation" != 'Pilgrim';

create table occupation_not_soldier
AS
SELECT *
FROM passports
WHERE "occupation" != 'Soldier';

create table race_norse
AS
SELECT *
FROM passports
WHERE "race" = 'Norse' or "race" = 'Kievian';
--events
insert into dailyevents
    (title, content, groupname, selected)
values
    ('Christian Only', 'only allow christians', 'religion_christian', false),
    ('Crusade of the Beggars', 'no pilgrims', 'occupation_not_pilgrim', false),
    ('Powerful Generals', 'no soldiers', 'occupation_not_soldier', false),
    ('Varangian Guards', 'only allow Norse or Kievian', 'race_norse', false)
;
-- passport insert

insert into passports
    (firstname, lastname, origin, occupation, race, religion, culture, property, selected)
values
    ('Nikolaos', 'Adamos', 'Consantinuoplis', 'Poet', 'Greek', 'Orthodox', 'Roman Empire', 500, false),
    ('Ioannes', 'Maliasenos', 'Consantinuoplis', 'Pilgrim', 'Greek', 'Orthodox', 'Roman Empire', 10, false),
    ('Halfdan', 'Bjornsson', 'Birka', 'Soldier', 'Norse', 'Germanic', 'Svealand', 50, false),
    ('Erik', 'Ivarsson', 'Gotland', 'Merchant', 'Norse', 'Germanic', 'Gotland', 1000, false),
    ('Kapi', 'Stensson', 'Sjaelland', 'Soldier', 'Norse', 'Germanic', 'Tanmarkar', 1000, false),
    ('Chao', 'Zhao', 'Cathay', 'Merchant', 'Chinese', 'Taoist', 'Tang', 5000, false),
    ('Jan', 'Sokol ', 'Praha', 'Noble', 'Bohemian', 'Catholic', 'Holy Roman Empire', 0, false),
    ('Otto', 'von Hesse', 'Hesse', 'Pilgrim', 'German', 'Catholic', 'Holy Roman Empire', 0, false),
    ('Olga', 'Kiyevskaya', 'Kiev', 'Noble', 'Kievian', 'Orthodox', 'Rus', 2000, false),
    ('Ahmet', 'Omer', 'Diyari Bekir', 'Soldier', 'Trukish', 'Sunni', 'Sejuk', 200, false),
    ('Abu', 'ibn Battuta', 'Tingi', 'Pilgrim', 'Morrocan', 'Sunni', 'Ayt Mrin', 800, false),
    ('Lorenzo', 'da Venezia', 'Venezia', 'Merchant', 'Italian', 'Catholic', 'La Serenissima', 800, false),
    ('David', 'Tumasyan', 'Yerewan', 'Merchant', 'Armenia', 'Miaphysite', 'Vaspowrakan', 1500, false)
;
​
​



commit;
