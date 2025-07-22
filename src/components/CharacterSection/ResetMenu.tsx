import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useStore } from "@/store/useStore";


const ResetMenuList = () => {

    const resetCharacter = useStore((x) => x.reset_character);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
            gap={1}
        >
            <Typography variant="body2" fontWeight={700} component="span">
                Reset
            </Typography>
            <Button
                variant="outlined"
                onClick={() => resetCharacter()}
                sx={{
                    width: "100%"
                }}
            >
                <Typography variant="body2" fontWeight={400} component="span">
                    Character
                </Typography>
            </Button>
        </Box>
    );
};

export default ResetMenuList;
