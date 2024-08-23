create schema inventory collate utf8mb4_general_ci;
use inventory;

create table categories
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    description text         null
);

create table locations
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    description text         null
);

create table items
(
    id          int auto_increment
        primary key,
    category_id int                                not null,
    location_id int                                not null,
    name        varchar(255)                       not null,
    description text                               null,
    photo       varchar(255)                       null,
    created_at  datetime default CURRENT_TIMESTAMP not null,
    constraint category_fk
        foreign key (category_id) references categories (id),
    constraint location_fk
        foreign key (location_id) references locations (id)
);

insert into inventory.categories (id, name, description)
values  (1, 'Мебель', 'Офисная мебель'),
        (2, 'Компьютерное оборудование', 'ПК, Мониторы, клавиатуры итд'),
        (3, 'Мебель', 'Офисная мебель'),
        (4, 'Компьютерное оборудование', 'ПК, Мониторы, клавиатуры итд'),
        (5, 'Мебель', 'Офисная мебель'),
        (6, 'Компьютерное оборудование', 'ПК, Мониторы, клавиатуры итд'),
        (7, 'Мебель', 'Офисная мебель'),
        (8, 'Компьютерное оборудование', 'ПК, Мониторы, клавиатуры итд'),
        (9, 'Мебель', 'Офисная мебель'),
        (10, 'Компьютерное оборудование', 'ПК, Мониторы, клавиатуры итд'),
        (11, 'Мебель', 'Офисная мебель'),
        (12, 'Компьютерное оборудование', 'ПК, Мониторы, клавиатуры итд'),
        (13, 'mebel', 'test'),
        (14, 'mebel', 'test');

        insert into inventory.items (id, category_id, location_id, name, description, photo, created_at)
        values  (1, 1, 2, 'Стол офисный', 'Деревянный офисный стол', null, '2024-08-23 16:19:03'),
                (2, 2, 1, 'Ноутбук HP Pavilion', 'Рабочий ноутбук директора', null, '2024-08-23 16:19:03'),
                (3, 1, 2, 'Стол офисный', 'Деревянный офисный стол', null, '2024-08-23 16:20:47'),
                (4, 2, 1, 'Ноутбук HP Pavilion', 'Рабочий ноутбук директора', null, '2024-08-23 16:20:47'),
                (5, 1, 2, 'Стол офисный', 'Деревянный офисный стол', null, '2024-08-23 16:21:21'),
                (6, 2, 1, 'Ноутбук HP Pavilion', 'Рабочий ноутбук директора', null, '2024-08-23 16:21:21'),
                (7, 1, 2, 'Стол офисный', 'Деревянный офисный стол', null, '2024-08-23 16:22:59'),
                (8, 2, 1, 'Ноутбук HP Pavilion', 'Рабочий ноутбук директора', null, '2024-08-23 16:22:59'),
                (9, 1, 2, 'Стол офисный', 'Деревянный офисный стол', null, '2024-08-23 16:24:43'),
                (10, 2, 1, 'Ноутбук HP Pavilion', 'Рабочий ноутбук директора', null, '2024-08-23 16:24:43');

                insert into inventory.locations (id, name, description)
                values  (1, 'Кабинет директора', 'Нахождение важных документов'),
                        (2, 'Офис 6', 'Офис для обсуждений'),
                        (3, 'Кабинет директора', 'Нахождение важных документов'),
                        (4, 'Офис 6', 'Офис для обсуждений'),
                        (5, 'Кабинет директора', 'Нахождение важных документов'),
                        (6, 'Офис 6', 'Офис для обсуждений'),
                        (7, 'Кабинет директора', 'Нахождение важных документов'),
                        (8, 'Офис 6', 'Офис для обсуждений'),
                        (9, 'Кабинет директора', 'Нахождение важных документов'),
                        (10, 'Офис 6', 'Офис для обсуждений'),
                        (11, 'Кабинет директора', 'Нахождение важных документов'),
                        (12, 'Офис 6', 'Офис для обсуждений');