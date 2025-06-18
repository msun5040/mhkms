import { useEffect, useState } from 'react';
import { fetchMedia } from './firebaseUtils/firebase';
import Polaroid from './components/polaroid';

function ImageCanvas() {
    const [media, setMedia] = useState<{
        mediaList: { index: number; image: string; video: string }[];
        eggList: { index: number; image: string }[];
    }>({ mediaList: [], eggList: [] });

    useEffect(() => {
        async function loadMedia() {
            const result = await fetchMedia();
            setMedia(result);
        }
        loadMedia();
    }, []);

    return (
        <div className="canvas" id="canvas">
            {media.mediaList.map((item, i) => (
                <Polaroid
                    index={i}
                    image={item.image}
                    video={item.video}
                />
            ))}
        </div>
    );
}

export default ImageCanvas;
