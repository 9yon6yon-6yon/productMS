## To run the backend with docker


  
### build the docker image

    docker build -t backend .

### run docker container in dev mode mapping 3000 host port

    docker run -p 3000:3000 -v "$(pwd):/backend" backend