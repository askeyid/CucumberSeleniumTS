#environment tag
set env=%1

#cucumber tag
set tag=%2

#export env variables
set COMMON_CONFIG_FILE=env/common.env
set NODE_ENV=%env%

yarn run cucumber --profile %tag% || yarn run postcucumber