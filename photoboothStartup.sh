#!/bin/bash
export DISPLAY=:0.0
export PROJECT_PATH=~/Desktop/wedding-photo-booth/

# Mount he USB drive:
sudo mount /dev/sda1 /mnt/usb/uploads -o uid=pi,gid=pi
ln -s /mnt/usb/uploads ~/Desktop/wedding-photo-booth/photo-booth-api/

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
        # Build the UI if we pull
        yarn --cwd ~/Desktop/wedding-photo-booth/photo-booth/ build
    elif [ $REMOTE = $BASE ]; then
        echo "Need to push"
        git --git-dir $PROJECT_PATH.git checkout .
        # Build the UI if we reset
        yarn --cwd ~/Desktop/wedding-photo-booth/photo-booth/ build
    else
        echo "Diverged"
    fi
else
  echo "IPv4 is down. Could not check Github for updates"
fi

# Create TMUX sessions for UI and API
tmux new-session -d -s "UI"
tmux new-session -d -s "API"
tmux new-session -d -s "FRONT"
tmux new-session -d -s "BACK"

# Execute the yarn commands to bring up the services
tmux send-keys -t API.0 \
    'yarn --cwd ~/Desktop/wedding-photo-booth/photo-booth-api/ start' ENTER
tmux send-keys -t UI.0 \
    'yarn --cwd ~/Desktop/wedding-photo-booth/photo-booth/ serve -s build -p 3000 -C' ENTER

# Wait for the API and UI services to be up
while ! curl --output /dev/null --silent --head --fail http://localhost:3001; do sleep 1 && echo -n .; done;
while ! curl --output /dev/null --silent --head --fail http://localhost:3000; do sleep 1 && echo -n -; done;

# Load up the windows
tmux send-keys -t FRONT.0 \
    'chromium-browser --start-fullscreen --user-data-dir=~/Documents/front --window-position=0,0 --new-window http://localhost:3000' ENTER
tmux send-keys -t BACK.0 \
    'chromium-browser --start-fullscreen --user-data-dir=~/Documents/back --window-position=1920,0 --new-window http://localhost:3000/back' ENTER
