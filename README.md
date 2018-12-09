# droney

### build and deploy to heroku
 ```
 mvn clean install \
 && heroku container:push web \
 && heroku container:release web \
 && heroku open
 ```
### thanks
https://codepen.io/ccrch/pen/GgPLVW

### issues
1. list of videos is loaded twice