import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { characterActions } from '@/constants/actionlist';
import { useStore } from "@/store/useStore";
import { COLORS } from '@/theme/colors';


const ActionMenuList = () => {

    const selectedAction = useStore((x) => x.character.action);
    const setSelectedAction = useStore((x) => x.update_char_movement_action);

    return (
        <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="body2" fontWeight={700} component="span">
                Character Actions
            </Typography>
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
            >
                {characterActions.map((x, idx) => (
                    <IconButton
                        key={`char-action-${x.id}-${idx}`}
                        onClick={() => setSelectedAction(x.id)}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        <Tooltip
                            slotProps={{
                                tooltip: {
                                    sx: {
                                        color: COLORS.primary_background_text,
                                        backgroundColor: COLORS.primary_background,
                                        borderRadius: 2,
                                    },
                                },
                            }}
                            title={x.name}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                width={30}
                                height={30}
                                sx={{
                                    backgroundColor: x.id === (Math.floor(selectedAction / 8) * 8) ? '#fff495' : 'inherit',
                                    border: "1px solid #b8c4dc !important",
                                    borderRadius: 1,
                                    '&:hover': {
                                        border: "1px solid #fff495 !important",
                                    },
                                }}
                            >
                                <Image
                                    src={`/action/${x.name}.png`}
                                    alt={x.name}
                                    width={24}
                                    height={24}
                                    draggable={false}
                                    loading="lazy"
                                />
                            </Box>
                        </Tooltip>
                    </IconButton>
                ))}
            </Box>
        </Box>
    );
};

export default ActionMenuList;
