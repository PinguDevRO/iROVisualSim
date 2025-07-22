import { useRef, useState } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

const CharacterZoomLens = ({
    imageUrl,
}: {
    imageUrl: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const zoomRef = useRef<HTMLDivElement>(null);
    const [showZoom, setShowZoom] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        const zoom = zoomRef.current;
        if (!container || !zoom) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const scale = 3;
        const zoomWidth = 310;
        const zoomHeight = 310;

        const clampedX = Math.max(0, Math.min(x, rect.width));
        const clampedY = Math.max(0, Math.min(y, rect.height));

        zoom.style.backgroundPosition = `-${(clampedX * scale - zoomWidth / 2) - clampedX}px -${(clampedY * scale - zoomHeight / 2) - clampedY}px`;
    };

    return (
        <>
            <Box
                sx={{
                    display: { 'xs': 'none', 'md': 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                <Box
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setShowZoom(true)}
                    onMouseLeave={() => setShowZoom(false)}
                    style={{
                        position: 'absolute',
                        width: 200,
                        height: 200,
                        overflow: 'hidden',
                        flexShrink: 0,
                    }}
                >
                    <Image
                        src={imageUrl}
                        alt="Ragnarok Online"
                        width={200}
                        height={200}
                        draggable={false}
                        loading="lazy"
                        style={{ objectFit: 'cover' }}
                    />
                </Box>
                <Box
                    ref={zoomRef}
                    style={{
                        translate: '105%',
                        width: 310,
                        height: 310,
                        border: '1px solid #d8d8d8',
                        backgroundColor: '#FFFFFF',
                        backgroundImage: `url(${imageUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: `${200 * 2}px ${200 * 2}px`,
                        visibility: showZoom ? 'visible' : 'hidden',
                        flexShrink: 0,
                        zIndex: 9999,
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: { 'xs': 'flex', 'md': 'none' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                <Image
                    src={imageUrl}
                    alt="Ragnarok Online"
                    width={200}
                    height={200}
                    draggable={false}
                    loading="lazy"
                />
            </Box>
        </>
    );
};

export default CharacterZoomLens;
