This is the open source express js based app to example of reset password 

# Installation

#### Requirements

- docker

### Instruction

Before install modules
```
cd API-Orahi
npm install
```

This will boot the server
```
docker-compose up 
```

Or open the API and MongoDB separately 
```
docker-compose up api
docker-compose up mongo
```

If you installed a new module need to update docker
```
docker-compose up --build api
```

To run the tests
```
docker-compose exec api npm test
```
