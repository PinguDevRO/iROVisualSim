import { useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { haircolors } from '@/constants/haircolorlist';
import { useStore } from "@/store/useStore";


const HairColorList = () => {

    const [hover, setHover] = useState<number | null>(null);
    const selectedHairColor = useStore((x) => x.character.headPalette);
    const setSelectedHairColor = useStore((x) => x.update_char_headPalette);

    const getImageSrc = (id: number, file: string) => {
        if (hover === id) return `/color/color${file}_over.png`
        if (selectedHairColor === id) return `/color/color${file}_on.png`
        return `/color/color${file}_off.png`
    }

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="body2" fontWeight={700} component="span">
                Hair Color
            </Typography>
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
                border="1px solid #d8d8d8 !important"
                borderRadius={1}
            >
                {haircolors.map((x, idx) => (
                    <IconButton
                        key={`hair-color-${x.id}-${idx}`}
                        onClick={() => setSelectedHairColor(x.id)}
                        onMouseEnter={() => setHover(x.id)}
                        onMouseLeave={() => setHover(null)}
                    >
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={22} height={22}>
                            <Image
                                src={getImageSrc(x.id, x.file)}
                                alt={x.name}
                                width={24}
                                height={24}
                                draggable={false}
                                loading="lazy"
                            />
                        </Box>
                    </IconButton>
                ))}
            </Box>
        </Box>
    );
};

export default HairColorList;
