import Box from '@mui/material/Box';
import Character from './Character';
import HairStyleList from './HairStyleList';
import HairColorList from './HairColorList';
import BodyColorList from './BodyColorList';
import OutfitMenuList from './OutfitMenu';
import ActionMenuList from './ActionMenu';
import ResetMenuList from './ResetMenu';
import ActionButton from './ActionButton';
import JobSelector from './JobSelector';

const CharacterSection = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
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
                <Box display="flex" flexDirection="column" gap={2}>
                    <JobSelector />
                    <OutfitMenuList />
                    <Character />
                    <ActionMenuList />
                    <ActionButton />
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                    <HairStyleList />
                    <HairColorList />
                    <BodyColorList />
                    <ResetMenuList />
                </Box>
            </Box>
        </Box>
    );
};

export default CharacterSection;
