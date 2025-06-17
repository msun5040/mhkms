// src/firebaseMedia.ts
import { initializeApp, type FirebaseOptions } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  type StorageReference,
} from "firebase/storage";

/**
 * Firebase project settings.
 * NOTE: Double‑check `storageBucket`; it usually ends with “.appspot.com”.
 */
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBFD9kIL85uvz6CGWb7jriOBGiAWKLQJdc",
  authDomain: "mhkms-cb0cc.firebaseapp.com",
  projectId: "mhkms-cb0cc",
  storageBucket: "mhkms-cb0cc.firebasestorage.app", // ← verify this value
  messagingSenderId: "822276580170",
  appId: "1:822276580170:web:fe05095f5ca9200b9897b3",
  measurementId: "G-3HWSZSN6FL",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * Helper to build a StorageReference from a path.
 */
const makeRef = (path: string): StorageReference => ref(storage, path);

/**
 * Fetches image/video (and optional egg) URLs from Firebase Storage
 * and logs them to the console.
 */
export async function fetchMedia(
  numReasons = 3,
  eggNum = 0,
): Promise<void> {
  // — Images & videos —
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
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);
      console.error(`Failed to get URLs for reason ${i}:`, message);
    }
  }

  // — Optional “egg” images —
  for (let i = 1; i <= eggNum; i++) {
    const eggNumber = i.toString().padStart(3, "0");
    const eggRef = makeRef(`images/egg_${eggNumber}.jpg`);

    try {
      const eggURL = await getDownloadURL(eggRef);
      console.log(`Egg ${i} URL: ${eggURL}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);
      console.error(`Failed to get URL for egg ${i}:`, message);
    }
  }
}
