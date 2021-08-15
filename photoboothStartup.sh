#!/bin/bash
export DISPLAY=:0.0
export PROJECT_PATH=/home/pi/Desktop/wedding-photo-booth/

# Mount he USB drive:
# Disabled for now. Need to write out process for mounting on boot
# refer to https://raspberrytips.com/mount-usb-drive-raspberry-pi/
# sudo mount /dev/sda1 /mnt/usb/uploads -o uid=pi,gid=pi

# Create Symbolic link to usb and api for saving pics
# ln -s /mnt/usb/uploads /home/pi/Desktop/wedding-photo-booth/photo-booth-api/

# Git fetch and pull the latest version if possible
if ping -q -c 1 -W 1 8.8.8.8 >/dev/null; then
    UPSTREAM=${1:-'@{u}'}
    LOCAL=$(git --git-dir $PROJECT_PATH.git rev-parse @)
    REMOTE=$(git --git-dir $PROJECT_PATH.git rev-parse "$UPSTREAM")
    BASE=$(git --git-dir $PROJECT_PATH.git merge-base @ "$UPSTREAM")

    if [ $LOCAL = $REMOTE ]; then
        echo "Up-to-date"
    elif [ $LOCAL = $BASE ]; then
        echo "Need to pull"
        git --git-dir $PROJECT_PATH.git pull
    elif [ $REMOTE = $BASE ]; then
        echo "Need to push"
        git --git-dir $PROJECT_PATH.git checkout .
    else
        echo "Diverged"
    fi
else
  echo "IPv4 is down. Could not check Github for updates"
fi

# Create TMUX sessions for UI and API
tmux new-session -d -s "PHOTOBOOTH"
tmux new-session -d -s "FRONT"
tmux new-session -d -s "BACK"

yarn --cwd /home/pi/Desktop/wedding-photo-booth/photo-booth/
yarn --cwd /home/pi/Desktop/wedding-photo-booth/photo-booth/server
# Execute the yarn commands to bring up the services
tmux send-keys -t PHOTOBOOTH.0 \
    'yarn --cwd /home/pi/Desktop/wedding-photo-booth/photo-booth/ start' ENTER

# Wait for the API and UI services to be up
while ! curl --output /dev/null --silent --head --fail http://localhost:3000; do sleep 1 && echo -n .; done;

# Load up the windows
# NOTE: We want to open the front display second so that its selected and the keystrokes go through
tmux send-keys -t BACK.0 \
    'chromium-browser --kiosk --start-fullscreen --user-data-dir=/home/pi/Documents/back --window-position=1920,0 --new-window --app=http://localhost:3000/#/back' ENTER
tmux send-keys -t FRONT.0 \
    'chromium-browser --kiosk --start-fullscreen --user-data-dir=/home/pi/Documents/front --window-position=0,0 --new-window --app=http://localhost:3000/#/front' ENTER

