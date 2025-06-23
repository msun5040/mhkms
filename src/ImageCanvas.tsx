import { useEffect, useMemo, useState} from 'react';
import { fetchMedia } from './firebaseUtils/firebase';
import PolaroidDiv from './components/Polaroid';
import VideoView from './components/VideoView';
import { get } from 'http';

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

    const transforms = useMemo(() => {
        const count = media.mediaList.length;
        return {
            x: Array.from({ length: count }, () => Math.random() * 20 - 10),
            y: Array.from({ length: count }, () => Math.random() * 20 - 10),
            rotation: Array.from({ length: count }, () => Math.random() * 20 - 10),
        };
    }, [media.mediaList.length]);

    const [videoPlaying, setVideoPlaying] = useState<string | null>(null);

    function getTransformAtIndex(transforms: {x:number[], y:number[], rotation:number[]}, index: number) {
    return {
        x: transforms.x[index],
        y: transforms.y[index],
        rotation: transforms.rotation[index],
    };
}

    return (
        <div className="canvas" id="canvas">
            {media.mediaList.map((item, i) => (
                <PolaroidDiv
                    index={i}
                    image={item.image}
                    onClick={()=>setVideoPlaying(item.video)}
                    transforms={getTransformAtIndex(transforms, i)}
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
