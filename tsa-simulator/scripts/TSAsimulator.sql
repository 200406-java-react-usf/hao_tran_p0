create user tester
with password 'Ac!00899297';

create database TSAsimulator;

grant all privileges 
on database TSAsimulator
to tester;

set search_path to TSAsimulator;

-- user
create table users
(
    id serial,
    username varchar(25) unique not null,
    userpassword varchar(25) not null,
    score int not null,
    userrole varchar(25) not null,

    constraint passports_pk primary key (id)
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
WHERE "religion" = 'Orthodox';


-- passport insert

insert into passports
    (firstname, lastname, origin, occupation, race, religion, culture, property, selected)
values
    ('Nikolai', 'Adamos', 'Consantinuoplis', 'Poet', 'Greek', 'Orthodox', 'Greek', 100, false),
    ('Halfdan', 'Bjornsson', 'Birka', 'Soldier', 'Norse', 'Germanic', 'Thule', 100, false)
;
​
​
insert into dailyevents
    (title, content, groupname, selected)
values
    ('Christian Only', 'only allow christians', 'religion_christian', false)

;


commit;
