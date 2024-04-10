#!/bin/bash

set -ueo pipefail

#environment tag
env=$1

#cucumber tag
tag=$2

#export env variables
export COMMON_CONFIG_FILE=env/common.env
export NODE_ENV=$env

#run cucumber tests & on failure exit script
if ! yarn run cucumber --profile $tag; then
    yarn run postcucumber;
    exit 1;
fi