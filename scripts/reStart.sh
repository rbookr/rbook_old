if hash pm2 2>/dev/null; then
    pm2 stop pm2.yml
    pm2 restart pm2.yml
else
    ./node_modules/.bin/pm2 stop pm2.yml
    ./node_modules/.bin/pm2 restart pm2.yml
fi
