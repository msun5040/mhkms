import { initializeApp, type FirebaseOptions } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  type StorageReference,
} from "firebase/storage";


const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBFD9kIL85uvz6CGWb7jriOBGiAWKLQJdc",
  authDomain: "mhkms-cb0cc.firebaseapp.com",
  projectId: "mhkms-cb0cc",
  storageBucket: "mhkms-cb0cc.firebasestorage.app",
  messagingSenderId: "822276580170",
  appId: "1:822276580170:web:fe05095f5ca9200b9897b3",
  measurementId: "G-3HWSZSN6FL",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const makeRef = (path: string): StorageReference => ref(storage, path);

export async function fetchMedia(
  numReasons = 3,
  eggNum = 0,
): Promise<{mediaList:{index:number, image:string, video:string}[], eggList:{index:number, image:string}[]}> {
  const imagePromises = [];
  const videoPromises = [];
  const eggPromises = [];

  for (let i = 1; i <= numReasons; i++) {
    const reasonNumber = i.toString().padStart(3, "0");

    const imageRef = makeRef(`images/img_${reasonNumber}.jpg`);
    const videoRef = makeRef(`videos/vid_${reasonNumber}.mp4`);

    try {
      const [imageURL, videoURL] = await Promise.all([
        getDownloadURL(imageRef),
        getDownloadURL(videoRef),
      ]);
      console.log(`Image ${i} URL: ${imageURL}`);
      console.log(`Video ${i} URL: ${videoURL}`);
      imagePromises.push(imageURL);
      videoPromises.push(videoURL);

    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);
      console.error(`Failed to get URLs for reason ${i}:`, message);
    }
  }

  for (let i = 1; i <= eggNum; i++) {
    const eggNumber = i.toString().padStart(3, "0");
    const eggRef = makeRef(`images/egg_${eggNumber}.jpg`);

    try {
      const eggURL = await getDownloadURL(eggRef);
      eggPromises.push(eggURL);
      console.log(`Egg ${i} URL: ${eggURL}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);
      console.error(`Failed to get URL for egg ${i}:`, message);
    }
  }

  const [images, videos, eggs] = await Promise.all([
    Promise.all(imagePromises),
    Promise.all(videoPromises),
    Promise.all(eggPromises)
  ]);

  const mediaList = []
  for (let i = 0; i < images.length; i++) {
    const subDict = {index: i, image: images[i], video: videos[i]};
    mediaList.push(subDict);
  }

  const eggList = [];
  for (let i = 0; i < eggs.length; i++) {
    const subDict = {index: i, image: eggs[i]};
    eggList.push(subDict);
  }
  return {mediaList: mediaList, eggList: eggList};
}
