import Box from '@mui/material/Box';
import ActionMenuList from './ActionMenu';
import OutfitMenuList from './OutfitMenu';
import ResetMenuList from './ResetMenu';

const MiscSection = () => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            flex={1}
            alignItems="center"
            justifyContent="center"
            padding={4}
            gap={4}
        >
            <ActionMenuList />
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: {
                        'xs': "1fr",
                        'md': "1fr 1fr"
                    },
                    gap: 2,
                }}
            >
                <OutfitMenuList />
                <ResetMenuList />
            </Box>
        </Box>
    );
};

export default MiscSection;
