const disk = require('diskusage');
const os = require('os');

let path = os.platform() === 'win32' ? 'c:' : '/';
const GB = 1000000000;

const checkDiskSpace = () => {
    try {
        const { free } = disk.checkSync(path);
        const freeGb = free/GB;
        if (freeGb < 5) {
            // NOTE: Implement some sort of system to actually alert the owner outside of the logs that space is running out.
            console.warn(`Warning: only ${freeGb} Gigabytes of free space remain`);
        }
      }
      catch (err) {
        console.log(err);
      }
};

module.exports = {
    checkDiskSpace,
}