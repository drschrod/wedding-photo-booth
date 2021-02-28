export const resolutions = {
    '2160p': { width: 3840, height: 2160 },
    '1440p': { width: 2560, height: 1440 },
    '1080p': { width: 1920, height: 1080 },
    '720p': { width: 1280, height: 720 },
    'SD': { width: 720, height: 480 },
    '480p': { width: 854, height: 480 },
    '360p': { width: 640, height: 360 },
    '240p': { width: 426, height: 240 },
    'qHD': { width: 960, height: 540 },
    'ExactWidth': { width: 1080, height: 608 }
}
export const videoConstraints = {
    ...resolutions['ExactWidth'],
    facingMode: 'user',
};

