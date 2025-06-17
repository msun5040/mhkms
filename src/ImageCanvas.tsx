import { useEffect } from 'react';
import {fetchMedia} from './firebaseUtils/firebase';
import { useState } from 'react';
import './styles/polaroid.css';

function ImageCanvas() {
    const [media, setMedia] = 
        useState<{
            mediaList: { index: number; image: string; video: string }[];
            eggList: { index: number; image: string }[];
        }>({mediaList: [], eggList: [],});

    useEffect(() => {
        async function loadMedia() {
            const result = await fetchMedia();
            setMedia(result);
        }
        loadMedia();
    }, []);
    const container = document.getElementById("canvas");
    const numberOfDivs = media.mediaList.length;
    for (let i = 0; i < numberOfDivs; i++) {
        const existingDiv = document.getElementById(`polaroid-${i}`);
        if (existingDiv) continue;

        const newDiv = document.createElement("div");
        newDiv.classList.add("polaroid");
        newDiv.id = `polaroid-${i}`;
        newDiv.style.backgroundImage = `url(${media.mediaList[i].image})`;
        newDiv.textContent = `This is div number ${i + 1}`;

        if (container) {
            container.appendChild(newDiv);
        }
    }

    return null
}

export default ImageCanvas;