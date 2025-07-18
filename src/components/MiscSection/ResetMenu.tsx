import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useStore } from "@/store/useStore";


const ResetMenuList = () => {

    const resetCharacter = useStore((x) => x.reset_character);
    const resetUpperHeadgear = useStore((x) => x.reset_upper_headgear);
    const resetMiddleHeadgear = useStore((x) => x.reset_middle_headgear);
    const resetLowerHeadgear = useStore((x) => x.reset_lower_headgear);
    const resetGarment = useStore((x) => x.reset_garment);

    return (
        <Box
            display="flex"
            flexDirection="column"
            flex={1}
            justifyContent="center"
            gap={1}
            sx={{
                alignItems: {
                    'xs': "start",
                    'md': "end"
                },
            }}
        >
            <Typography variant="body2" fontWeight={700} component="span">
                Reset
            </Typography>
            <Button
                variant="outlined"
                onClick={() => resetCharacter()}
            >
                <Typography variant="body2" fontWeight={400} component="span">
                    Character
                </Typography>
            </Button>
            <Button
                variant="outlined"
                onClick={() => resetUpperHeadgear()}
            >
                <Typography variant="body2" fontWeight={400} component="span">
                    Upper Headgear
                </Typography>
            </Button>
            <Button
                variant="outlined"
                onClick={() => resetMiddleHeadgear()}
            >
                <Typography variant="body2" fontWeight={400} component="span">
                    Middle Headgear
                </Typography>
            </Button>
            <Button
                variant="outlined"
                onClick={() => resetLowerHeadgear()}
            >
                <Typography variant="body2" fontWeight={400} component="span">
                    Lower Headgear
                </Typography>
            </Button>
            <Button
                variant="outlined"
                onClick={() => resetGarment()}
            >
                <Typography variant="body2" fontWeight={400} component="span">
                    Garment
                </Typography>
            </Button>
        </Box>
    );
};

export default ResetMenuList;
