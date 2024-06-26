﻿# Advanced_Software_Engineering_Project
![101](https://github.com/AbdullahSholi/Advanced_Software_Engineering_Project/assets/149682145/26b9e174-b9c1-4abb-8651-72673e4e7080)

## Prerequisites:
* Git & Github
* MySQL Database
* npm
* Docker
* Node

## Steps
### Via CMD
1- Create new folder
```
mkdir advance_project
```
2- Go inside created folder
```
cd advance_project
```

3- Cloning project from github to your local machine
```
git clone https://github.com/AbdullahSholi/Advanced_Software_Engineering_Project
```
4- Go inside project folder
```
cd Advanced_Software_Engineering_Project
```

5- Build & Run Docker Containers( Nodejs & MySQL Server )
```
docker-compose up -d --build
```

6- Enter to Project CLI Frontend 
```
cd views
```

7- Run Project CLI Frontend 
```
node cli-frontend.mjs
```

---

### Additional Commands for Docker

1- Turn off all Docker Containers
```
docker-compose down
```

2- Display all Docker Containers
```
docker ps
```

3- To view our containers logs 
```
docker logs advanced_software_engineering_project-app-1 -f
docker logs advanced_software_engineering_project-mysqldb-1 -f

```

4- To enter inside Containers shell
```
docker exec -it advanced_software_engineering_project-app-1 bash
docker exec -it advanced_software_engineering_project-mysqldb-1 bash

```

---

### Additional Commands for Treat with MySQL inside NodeJS app Container
1- Enter to nodejs app container
```
docker exec -it advanced_software_engineering_project-app-1 bash
```

2- Connect to our database
```
mysql -h mysqldb -P 3306 -u root -p
```

3- Then Enter DB Password
```
testDB
```

4- Now you inside DB 
```
USE testDB;
```

5- Display all DB tables
```
SHOW tables;
```

Now, you can make all database operations as you want.



## Wiki Pages

- [Home](https://github.com/AbdullahSholi/Advanced_Software_Engineering_Project/wiki): Home page
- [API Documentation](https://github.com/AbdullahSholi/Advanced_Software_Engineering_Project/wiki/API-Documentation): Explore the API endpoints and usage documentation.
- [Installation](https://github.com/AbdullahSholi/Advanced_Software_Engineering_Project/wiki/Installation-Guide): Get started with setting up the GreenThumb API on your local machine.
- [Developer Guide](https://github.com/AbdullahSholi/Advanced_Software_Engineering_Project/wiki/Developer-Guide): Learn about the Repo and how to contribute to the GreenThumb API project.
- [Tools and Technologies Used](https://github.com/AbdullahSholi/Advanced_Software_Engineering_Project/wiki/Tools-and-Technologies): Explore the tools and technologies used in the development of the GreenThumb API.


# Authors

- [Abdullah Sholi](https://github.com/AbdullahSholi)
- [Rashid Sawalha](https://github.com/RashidSawalha)
- [Shareef Salahat](https://github.com/shareefsalahat443)


Copyright © 2024 GreenThumb. All rights reserved.
