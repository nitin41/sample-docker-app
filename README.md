# Sample Docker App With NodeJs and Mysql

Code example for Node.js and MySQL and PHPMyAdmin docker container application

## Resources

- [Download docker for desktop](https://hub.docker.com/editions/community/docker-ce-desktop-windows)

## After installation run docker cli

Now clone this repository in any directory

Now using command line go in to the sample-docker-app folder

Now run the following commands. (Note :- Before start make sure docker is running)

- docker build . -t nitin41/nodejs-mysql-app

- docker-compose build

- docker-compose up (this command will take time time to complete.)

- http://localhost:3001/ for node

- http://localhost:3002/ for phpmyadmin (Use username and password root for login in phpmyadmin)
