if hash pm2 2>/dev/null; then
    pm2 start $1.yml
else
    ./node_modules/.bin/pm2 start $1.yml
fi
