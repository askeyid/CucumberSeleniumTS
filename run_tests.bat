@echo off
:: setting environment tag
set env=%1

:: setting cucumber tag
set tag=%2

:: exporting environment variables
set COMMON_CONFIG_FILE=env/common.env
set NODE_ENV=%env%

:: running the test
yarn run cucumber --profile %tag% || yarn run postcucumber