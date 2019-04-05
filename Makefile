testNet:
	env NODE_ENV=testNet forever start --minUptime 10000 --spinSleepTime 1000 ./bin/www.js

mainNet:
	env NODE_ENV=mainNet forever start --minUptime 10000 --spinSleepTime 1000 ./bin/www.js

stop:
	forever stopall

restart:
	forever restartall

list:
	forever list
