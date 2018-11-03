# Todo-list

#### Install and run mongod

Download and extract mongoDB community https://www.mongodb.com/download-center/community
Then, open a terminal and execute:
```sh
$ cd mongodb-linux-x86_64/
$ mkdir data && cd data && mkdir db && cd ..
$ ./mongod --dbpath ./data/db/
``` 

#### Download the repo, the dependencies, build the client and run the server 

```sh
$ git clone https://github.com/gbosetti/todolist-integrated-backend-and-frontend.git
$ cd todolist-integrated-backend-and-frontend/client_source/
$ npm install
$ npm run build
$ cd ..
$ npm install
$ node .
``` 

Open http://localhost:3000