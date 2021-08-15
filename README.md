# Photo Booth Project

## Background:
Made this for a friends wedding because I confidently said:
> I could make you guys a photobooth for way cheaper than whatever you would get charged for

6 months later and about 80 hours of work I was most definitely wrong.

## Suggested Hardware:
- External USB drive to save the photos to
- _Raspberry PI 4_
- Two `1920x1080` monitors in portrait mode
- Raspberry PI camera or any USB based camera

## Raspberry PI Initial Setup:

### Pre-reqs
- `raspbian` is installed (NOTE: only tested with the __GUI__ version so far)
- `SSH` is enabled (this makes it much easier to follow the rest of the steps)
- Set both monitors to portrait mode
- connect to internet
- repo has been cloned
- tmux has been installed on the machine
- chromium has been installed on the machine
- USB drive has been mounted properly and a symbolic link has been created between the USB and the uploads directory in the application
    - See USB Mounting section for instructions.

### SSH into your PI
- Follow the steps on the raspberry pi site to setup SSH. 
- Be sure to secure your device and update the password

### USB Mounting/Setup:
refer to https://raspberrytips.com/mount-usb-drive-raspberry-pi/
- Mount the drive

`sudo mount /dev/sda1 /mnt/usb/uploads -o uid=pi,gid=pi`

- Create Symbolic link to usb and api for saving pics

`ln -s /mnt/usb/uploads /home/pi/Desktop/wedding-photo-booth/photo-booth-api/`

### Setup
1. Clone this repo
2. Make it so that the setup script executes on startup:

#### Option 1: autostart script
Copy the autostart script from within this repo using the following command:
`make setup`

#### Option 2: init.d
Add the startup script to `init.d` directory

```bash
sudo cp ~/Desktop/wedding-photo-booth/photoboothStartup.sh /etc/init.d/
cd /etc/init.d/
sudo chmod +x photoboothStartup.sh
sudo update-rc.d photoboothStartup.sh defaults
```

3. Reboot the system: `sudo reboot`

