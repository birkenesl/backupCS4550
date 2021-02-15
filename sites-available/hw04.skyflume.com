server {
        listen 80;
        listen [::]:80;

        #root /home/hw04/www/cs4550-hw04;

        #index index.html;

        server_name hw04.skyflume.com;

        location / {
		proxy_pass http://localhost:4790;
        }
	
	location /socket {
		proxy_pass http://localhost:4790;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	
	}
}
