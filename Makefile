# /bin/sh

# >> /etc/bash.bashrc

create-aliases:
	echo "alias startUI='yarn --cwd ~/Desktop/wedding-photo-booth/photo-booth/ start'" >> /etc/bash.bashrc
	echo "alias startAPI='yarn --cwd ~/Desktop/wedding-photo-booth/photo-booth-api/ start'" >> /etc/bash.bashrc
	echo "alias viewPictures='open ~/Desktop/wedding-photo-booth/photo-booth-api/uploads'" >> /etc/bash.bashrc
	echo "alias start='startUI & startAPI'" >> /etc/bash.bashrc
	echo "alias photobooth='cd ~/Desktop/wedding-photo-booth'" >> /etc/bash.bashrc
	source /etc/bash.bashrc

setup:
	mkdir -p ./photo-booth-api/uploads

clean-uploads:
	rm -rf ./photo-booth-api/uploads
	$(MAKE) setup

start-photobooth:
	yarn --cwd ./photo-booth start & yarn --cwd ./photo-booth-api start

stop:
	taskkill /im node.exe