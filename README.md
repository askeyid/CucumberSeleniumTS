# React App

clone react app from git@github.com:askeyid/dummy.git

> Install react app packages

Inside root directory:

Install project packages

`yarn install`

start application

`yarn run start`

# Run Automation

- On Mac (BASH)

````
cd e2e

yarn Install

./run_tests.sh environment tag

e.g. ./run_tests.sh localhost dev
````

- On Windows (BAT)

````
cd e2e

yarn Install

.\run_tests.bat environment tag

e.g. .\run_tests.bat localhost dev
````
# Selenium Grid
## Non-docker way
- create a folder
- download browsers webdrivers
- install java
- download Selenium Server (Grid) https://www.selenium.dev/downloads/
- create config.toml https://www.selenium.dev/documentation/grid/configuration/toml_options/ like this
````
[node]
detect-drivers = false

[[node.driver-configuration]]
max-sessions = 4
display-name = "chrome"
stereotype = "{\"browserName\":\"chrome\"}"

[[node.driver-configuration]]
max-sessions = 4
display-name = "firefox"
stereotype = "{\"browserName\":\"firefox\"}"
````
- run Selenium Grid (4444 port should be free)
````
java -jar selenium-server-<version>.jar standalone --config config.toml
````
- required variables to run tests on Selenium Grid (common.env file)
````
SELENIUM_GRID_ENABLED=true
SELENIUM_GRID_URL=http://gridhost:4444
````
- run tests
````
.\run_tests.bat localhost dev
````
## Docker way
- configure your docker-compose.yml file or use this one https://github.com/SeleniumHQ/docker-selenium/blob/trunk/docker-compose-v2.yml
- up Selenium Grid
````
docker-compose -f docker-compose-v2.yml up -d
````
- run tests
````
.\run_tests.bat localhost dev
````
# CI/CD configuration
- install buildkite https://buildkite.com/
- create a pipeline (name it, select repository and save)
- setup an agent on your machine https://buildkite.com/docs/agent/v3/windows
- run buildkite agent
````
buildkite-agent.exe start
````