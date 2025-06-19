import React from 'react';
import '../styles/videoView.css';

type VideoProps = {
    video?: string;
    onClose: () => void;
};

const VideoDiv: React.FC<VideoProps> = ({video, onClose}) => {
    return(
    <div>
        <div className="video-container" onClick={onClose}>
            <video
                className="video-player"
                autoPlay
                playsInline
                src={video}
            />
        </div>

    </div>
    )
}

export default VideoDiv;