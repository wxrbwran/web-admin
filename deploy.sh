#!/bin/bash
cd ..
tar -zcvf ../web-admin.tar.gz --exclude ./node_modules ./web-admin
scp -r ../web-admin.tar.gz ubuntu@123.206.90.112:~/sites
ssh ubuntu@123.206.90.112 "cd ~/sites; rm -rf ./web-admin; tar -zxvf web-admin.tar.gz; cd web-admin; pwd; yarn install; yarn run build"
