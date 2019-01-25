if hash pm2 2>/dev/null; then
    pm2 stop $1.yml
    pm2 restart $1.yml
else
    ./node_modules/.bin/pm2 stop $1.yml
    ./node_modules/.bin/pm2 restart $1.yml
fi
