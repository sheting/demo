# shipping-demo

```powershell

cd $PROJECT
# development run
> docker-compose run --rm --service-ports --entrypoint sh dev
# rebuild images
> docker-compose build
# get into docker
> sh ./cmd/local-start.sh
# broswer
> localhost:3333
```
