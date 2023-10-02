#### Install the app and related dependencies

#### Install the docker application and run following commands
    - docker pull mysql/mysql-server:latest
    - docker run -d -p 3306:3306 --name mysql-docker-container -e MYSQL_ROOT_PASSWORD=abc -e MYSQL_DATABASE=task_db -e MYSQL_USER=abc -e MYSQL_PASSWORD=abc mysql/mysql-server:latest
    - sudo docker exec -it mysql-docker-container bash
    - mysql -u root -p

##### After running docker run the commands in task_db database given in ./databse/queries.sql file

##### Replace the default and dev file with required sql credentials.
    - Run export NODE_ENV=dev && pm2 start bin/www --name task_app && pm2 logs task_app on terminal 
    (this command sometimes doesnt work in npm start depending on os hence use it to run pm2 with variables otherise run
    -##$ pm2 start bin/www --name task_app && pm2 logs task_app on terminal )