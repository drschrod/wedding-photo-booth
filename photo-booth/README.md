# wedding-photo-booth

## TODO

# PI Specific
- [x] Get the PI to be SSH accessible
- [x] Write startup script that does the following
    - Opens chromium on both screens in full screen
        - Both chromium windows open their respective pages
        - Links:
            - https://unix.stackexchange.com/questions/560063/chromium-kiosk-mode-across-dual-monitors
            - https://stackoverflow.com/questions/18360569/how-do-you-run-an-application-in-bash-and-select-which-monitor-it-runs-on
            - https://gist.github.com/rampfox/085bf3ffb9ff51e114bf7afdf3ced71b
            - https://github.com/elalemanyo/raspberry-pi-kiosk-screen
    - Starts the server and the front end via yarn and runs in background
- [ ] Mount the USB drive and use it to write the images to
- [ ] Disable the chromium download popup and set the downloads directory to the usb drive

Front End: