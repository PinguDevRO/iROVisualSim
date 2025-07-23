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
            alignItems="center"
            justifyContent="center"
            width="100%"
        >
            <Button
                variant="outlined"
                onClick={() => resetCharacter()}
                color="error"
                sx={{
                    width: "100%",

                }}
            >
                <Typography variant="body2" fontWeight={400} component="span">
                    Reset Character
                </Typography>
            </Button>
        </Box>
    );
};

export default ResetMenuList;
