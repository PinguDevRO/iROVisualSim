import Box from '@mui/material/Box';
import Character from './Character';
import HairStyleList from './HairStyleList';
import HairColorList from './HairColorList';

const CharacterSection = () => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    md: '1fr 1fr'
                },
                gap: 2,
                padding: 2
            }}
        >
            <Character />
            <Box display="flex" flexDirection="column" gap={2}>
                <HairStyleList />
                <HairColorList />
            </Box>
        </Box>
    );
};

export default CharacterSection;
