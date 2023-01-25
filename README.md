## Mr Z's Space Port

#### Techologies used :

Frontend : React + TypeScript
Backend : Python + Flask
Database : Sqlite


------------

Run Application in Development Mode :

Rquired : Pyhon3+ , Node 16+ installed in the system.

    clone the repo

Backend: ( run on localhost:5000)

```bash
cd spaceport-backend
pip3 install -r requirements.txt
python3 server.py or gunicorn -b 0.0.0.0:5000 server:app
```
Frontend : (run on localhost:3000)

    cd spaceport-frontend
    npm i
    npm start

Run App application using Docker (Prod Mode):

- Pre Requisit - Docker Installed on the System:

Build Backend Image :
```bash
docker build -f Dockerfile.prod -t spaceport-backend:latest .
```

Run the Backend :
```bash
    docker run -it -p 5000:5000 --rm spaceport-backend:latest
```

Build the Frontend Image:
```bash
    docker build -f Dockerfile.prod -t spaceport-frontend:latest .
```

Run the Frontend:
```bash
    docker run -it -p 80:80 --rm spaceport-frontend:latest
```

Sample data in the database :

```json
[
   {
      "colour":"red",
      "id":100,
      "mfd":"Wed, 12 Dec 2012 00:00:00 GMT",
      "pulseLaser":true,
      "speed":50
   },
   {
      "colour":"green",
      "id":101,
      "mfd":"Mon, 21 Nov 2016 00:00:00 GMT",
      "pulseLaser":true,
      "speed":150
   },
   {
      "colour":"blue",
      "id":102,
      "mfd":"Thu, 14 May 2020 00:00:00 GMT",
      "pulseLaser":true,
      "speed":120
   },
   {
      "colour":"red",
      "id":103,
      "mfd":"Sat, 13 May 2000 00:00:00 GMT",
      "pulseLaser":false,
      "speed":200
   },
   {
      "colour":"green",
      "id":104,
      "mfd":"Thu, 22 Dec 1994 00:00:00 GMT",
      "pulseLaser":false,
      "speed":110
   },
   {
      "colour":"blue",
      "id":105,
      "mfd":"Thu, 11 Aug 1994 00:00:00 GMT",
      "pulseLaser":false,
      "speed":90
   }
]
```



