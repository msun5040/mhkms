import React from 'react';
import '../styles/polaroid.css';

type PolaroidProps = {
    index: number;
    image: string;
    onClick: () => void;
    transforms: {
        x: number;
        y: number;
        rotation: number;
    };
};

const PolaroidDiv: React.FC<PolaroidProps> = ({index, image, onClick, transforms}) => {
    const handleClick = () => {
        console.log(`Polaroid ${index} clicked`);
        onClick();
        const polaroidElement = document.getElementById(`polaroid-${index}`);
        if (polaroidElement) {
            
        }
    };

    return (
        <div
            className="item"
            id={`item-${index}`}
            style={{
                transform: `translate(${transforms.x}px, ${transforms.y}px) rotate(${transforms.rotation}deg)`,
            }}
            onClick={handleClick}
        >
            <div className="polaroid" id={`polaroid-${index}`}>
                <img
                    className="polaroid-image"
                    src={image}
                    alt='Polaroid'
                />
            </div>
        </div>
    );
};

export default PolaroidDiv;
