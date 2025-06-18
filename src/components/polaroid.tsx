import React from 'react';
import '../styles/polaroid.css';

type PolaroidProps = {
    index: number;
    image: string;
    video?: string;
};

const Polaroid: React.FC<PolaroidProps> = ({index, image, video}) => {
    // const handleClick = () => {
    //     window.open(githubUrl, '_blank');
    // };

    const transforms = {
                x: Math.random() * 20 - 10,
                y: Math.random() * 20 - 10,
                rotation: Math.random() * 20 - 10};
    return (
        <div
            className="item"
            id={`item-${index}`}
            style={{
                transform: `translate(${transforms.x}px, ${transforms.y}px) rotate(${transforms.rotation}deg)`,
            }}
        >
            <div className="polaroid" id={`polaroid-${index}`}>
                <img
                    className="polaroid-image"
                    src={image}
                    alt={`polaroid-${index}`}
                />
            </div>
        </div>
    );
};

export default Polaroid;
