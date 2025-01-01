#!/bin/bash

sed -i 's/$ADDRESS/'$HOST':'$PORT''$PREFIX'/g' /etc/nginx/nginx.conf
nginx -g 'daemon off;'