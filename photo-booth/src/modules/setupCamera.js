import Webcam from 'webcam-easy';

export const createCamera = () => {
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    const snapSoundElement = null // document.getElementById('snapSound');
    return new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
}

export const setupVideoStream = async () => {
    try {
        const cam = await createCamera();
        console.log(cam);
        const result = await cam.start()
        console.log(result); 
    } catch (error) {
        console.log(error)
    }

    

}
