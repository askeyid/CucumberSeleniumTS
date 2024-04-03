#environment tag
env=$1

#cucumber tag
tag=$2

#export env variables
export COMMON_CONFIG_FILE='env/common.env'
export NODE_ENV=$env

#run cucumber tests
yarn run cucumber --profile $tag || yarn run postcucumber