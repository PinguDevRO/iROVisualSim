import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { body_palette_list } from '@/constants/bodypalette';
import { useStore } from "@/store/useStore";


const BodyColorList = () => {

    const selectedBodyColor = useStore((x) => x.character.bodyPalette);
    const setSelectedBodyColor = useStore((x) => x.update_char_bodyPalette);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="body2" fontWeight={700} component="span">
                Body Clothes Color
            </Typography>
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
            >
                {body_palette_list.map((x, idx) => (
                    <IconButton
                        key={`body-color-${x.id}-${idx}`}
                        onClick={() => setSelectedBodyColor(x.id)}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            width={30}
                            height={30}
                            sx={{
                                backgroundColor: x.id === selectedBodyColor ? '#fff495' : 'inherit',
                                border: "1px solid #b8c4dc !important",
                                borderRadius: 1,
                                '&:hover': {
                                    border: "1px solid #fff495 !important",
                                },
                            }}
                        >
                            {x.id}
                        </Box>
                    </IconButton>
                ))}
            </Box>
        </Box>
    );
};

export default BodyColorList;
