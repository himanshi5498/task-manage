CREATE TABLE tb_users (
  user_id int PRIMARY KEY auto_increment,
  name varchar(25) NOT NULL,
  password varchar(100) NOT NULL,
  status int not null default 1,
  updated_at timestamp default current_timestamp on update current_timestamp,
  created_at timestamp default current_timestamp
);

-- status 1 for open 
--2 for ongoing
-- 3 completed
CREATE TABLE tb_tasks (
  task_id int PRIMARY KEY auto_increment,
  name varchar(50) unique key NOT NULL,
  description varchar(100) default '',
  updated_by int not null,
  updated_status_time timestamp not null,
  status int not null,
  updated_at timestamp default current_timestamp on update current_timestamp,
  created_at timestamp default current_timestamp
);

CREATE TABLE tb_task_logs (
  id int PRIMARY KEY auto_increment,
  task_id int NOT NULL,
  updated_by int not null,
  info varchar(500) not null,
  updated_at timestamp default current_timestamp on update current_timestamp,
  created_at timestamp default current_timestamp
);

---status 1 active in tb_users, 2- deleted
-- insert
INSERT INTO tb_users(name, password) VALUES ('himanshi', '123456');