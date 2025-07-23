import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {
    first_job_body_palette_list,
    regular_job_body_palette_list,
    third_fourth_job_body_palette_list,
    first_job_palette_list,
    regular_job_palette_list,
    third_fourth_job_palette_list
} from '@/constants/bodypalette';
import { COLORS } from '@/theme/colors';
import { useStore } from "@/store/useStore";


const BodyColorList = () => {

    const currentJob = parseInt(useStore((x) => x.character.job)[0]);
    const selectedBodyColor = useStore((x) => x.character.bodyPalette);
    const setSelectedBodyColor = useStore((x) => x.update_char_bodyPalette);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={1}>
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
                {first_job_palette_list.indexOf(currentJob) >= 0 && first_job_body_palette_list.map((x, idx) => (
                    <IconButton
                        key={`body-color-${x.id}-${idx}`}
                        onClick={() => setSelectedBodyColor(x.id)}
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
                                width={22}
                                height={22}
                                sx={{
                                    backgroundColor: x.id === selectedBodyColor ? '#fff495' : 'inherit',
                                    border: "1px solid #b8c4dc !important",
                                    borderRadius: 1,
                                    '&:hover': {
                                        border: "1px solid #515789 !important",
                                    },
                                }}
                            >
                                <Typography variant="body2" fontWeight={700} component="span">{x.visual}</Typography>
                            </Box>
                        </Tooltip>
                    </IconButton>
                ))}
                {regular_job_palette_list.indexOf(currentJob) >= 0 && regular_job_body_palette_list.map((x, idx) => (
                    <IconButton
                        key={`body-color-${x.id}-${idx}`}
                        onClick={() => setSelectedBodyColor(x.id)}
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
                                width={22}
                                height={22}
                                sx={{
                                    backgroundColor: x.id === selectedBodyColor ? '#fff495' : 'inherit',
                                    border: "1px solid #b8c4dc !important",
                                    borderRadius: 1,
                                    '&:hover': {
                                        border: "1px solid #515789 !important",
                                    },
                                }}
                            >
                                <Typography variant="body2" fontWeight={700} component="span">{x.visual}</Typography>
                            </Box>
                        </Tooltip>
                    </IconButton>
                ))}
                {third_fourth_job_palette_list.indexOf(currentJob) >= 0 && third_fourth_job_body_palette_list.map((x, idx) => (
                    <IconButton
                        key={`body-color-${x.id}-${idx}`}
                        onClick={() => setSelectedBodyColor(x.id)}
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
                                width={22}
                                height={22}
                                sx={{
                                    backgroundColor: x.id === selectedBodyColor ? '#fff495' : 'inherit',
                                    border: "1px solid #b8c4dc !important",
                                    borderRadius: 1,
                                    '&:hover': {
                                        border: "1px solid #515789 !important",
                                    },
                                }}
                            >
                                <Typography variant="body2" fontWeight={700} component="span">{x.visual}</Typography>
                            </Box>
                        </Tooltip>
                    </IconButton>
                ))}
            </Box>
        </Box>
    );
};

export default BodyColorList;
