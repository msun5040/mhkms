import { useEffect, useState } from 'react';
import { fetchMedia } from './firebaseUtils/firebase';
import PolaroidDiv from './components/Polaroid';
import VideoView from './components/VideoView';

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

    const [videoPlaying, setVideoPlaying] = useState<string | null>(null);

    return (
        <div className="canvas" id="canvas">
            {media.mediaList.map((item, i) => (
                <PolaroidDiv
                    index={i}
                    image={item.image}
                    onClick={()=>setVideoPlaying(item.video)}
                />
            ))}
            {videoPlaying && (
                <VideoView
                    video={videoPlaying}
                    onClose={() => setVideoPlaying(null)}
                />
            )}
        </div>
    );
}

export default ImageCanvas;
