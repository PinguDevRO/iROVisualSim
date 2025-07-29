import { useEffect, useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import HeadgearUpperTable from './headgearUpperTable';
import HeadgearMiddleTable from './headgearMiddleTable';
import HeadgearLowerTable from './headgearLowerTable';
import GarmentTable from './garmentTable';
import { HeadgearModel } from '@/models/get-headgear';
import { GarmentModel } from '@/models/get-garment';
import { GetHeadgearLocation } from '@/constants/headgearlist';
import { COLORS } from '@/theme/colors';
import { useStore } from '@/store/useStore';

type TableType = "Upper" | "Middle" | "Lower" | "Garment";

const ItemSection = ({
    headgearData,
    garmentData,
}: {
    headgearData: HeadgearModel[] | undefined;
    garmentData: GarmentModel[] | undefined;
}) => {
    const [search, setSearch] = useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');
    const [selected, setSelected] = useState<TableType>("Upper");

    const upperHeadgear = useStore((x) => x.headgear_upper);
    const middleHeadgear = useStore((x) => x.headgear_middle);
    const lowerHeadgear = useStore((x) => x.headgear_lower);
    const garment = useStore((x) => x.garment);
    const resetUpperHeadgear = useStore((x) => x.reset_upper_headgear);
    const resetMiddleHeadgear = useStore((x) => x.reset_middle_headgear);
    const resetLowerHeadgear = useStore((x) => x.reset_lower_headgear);
    const resetGarment = useStore((x) => x.reset_garment);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            flex={1}
        >
            <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search..."
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                    input: {
                        color: COLORS.secondary_background_text,
                    },
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: COLORS.second_background,
                        borderRadius: 2,
                        '& fieldset': {
                            borderColor: COLORS.chinese_silver,
                        },
                        '&:hover fieldset': {
                            borderColor: COLORS.secondary_background_text,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: COLORS.secondary_background_text,
                        },
                    },
                }}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon sx={{ color: COLORS.secondary_background_text }} />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                flex={1}
                alignItems="center"
                justifyContent="space-between"
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    flex={1}
                    gap={1}
                    padding={2}
                >
                    <Button
                        onClick={() => setSelected("Upper")}
                        sx={{
                            minWidth: 110,
                            maxWidth: 200,
                            padding: 1,
                            backgroundColor: selected === "Upper" ? '#fff495' : 'inherit',
                            border: '1px solid #b8c4dc',
                            borderRadius: 1,
                            '&:hover': {
                                border: '1px solid #515789',
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
                            title={upperHeadgear !== null && upperHeadgear.items && upperHeadgear.items.length > 0 ? (
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                    <span
                                        key={`tooltip-selected-upper-location--${upperHeadgear.location}`}
                                    >
                                        Location: {GetHeadgearLocation(upperHeadgear.location)}
                                    </span>
                                    {upperHeadgear.items.map((x) => (
                                        <span
                                            key={`tooltip-selected-upper-text--${x.name}-${x.itemId}`}
                                        >
                                            {x.name} (ID: {x.itemId})
                                        </span>
                                    ))}
                                </Box>
                            ) : 'No Upper Headgear selected'}
                        >
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start">
                                <Typography
                                    variant="body2"
                                    component="label"
                                    fontWeight={700}
                                >
                                    UPPER
                                </Typography>
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={24} height={24}>
                                    <Image
                                        src={upperHeadgear !== null && upperHeadgear.items && upperHeadgear.items.length > 0 ? `https://db.irowiki.org/image/item/${upperHeadgear.items[0].itemId}.png` : '/interface/forbidden_item.png'}
                                        alt={"Upper"}
                                        width={24}
                                        height={24}
                                        draggable={false}
                                        loading="lazy"
                                    />
                                </Box>
                            </Box>
                        </Tooltip>
                    </Button>
                    <Button
                        onClick={() => resetUpperHeadgear()}
                        disabled={upperHeadgear === null}
                        sx={{
                            minWidth: 110,
                            maxWidth: 200,
                            backgroundColor: 'inherit',
                            border: '1px solid #b8c4dc',
                            borderRadius: 1,
                            '&:hover': {
                                border: '1px solid #515789',
                            },
                            '&:disabled': {
                                backgroundColor: '#F2F2F2',
                            },
                        }}
                    >
                        <Typography
                            variant="body2"
                            component="label"
                            fontWeight={400}
                            fontSize={10}
                        >
                            CLEAR
                        </Typography>
                    </Button>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    flex={1}
                    gap={1}
                    padding={2}
                >
                    <Button
                        onClick={() => setSelected("Middle")}
                        sx={{
                            minWidth: 110,
                            maxWidth: 200,
                            padding: 1,
                            backgroundColor: selected === "Middle" ? '#fff495' : 'inherit',
                            border: '1px solid #b8c4dc',
                            borderRadius: 1,
                            '&:hover': {
                                border: '1px solid #515789',
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
                            title={middleHeadgear !== null && middleHeadgear.items && middleHeadgear.items.length > 0 ? (
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                    <span
                                        key={`tooltip-selected-middle-location--${middleHeadgear.location}`}
                                    >
                                        Location: {GetHeadgearLocation(middleHeadgear.location)}
                                    </span>
                                    {middleHeadgear.items.map((x) => (
                                        <span
                                            key={`tooltip-selected-middle-text--${x.name}-${x.itemId}`}
                                        >
                                            {x.name} (ID: {x.itemId})
                                        </span>
                                    ))}
                                </Box>
                            ) : 'No Middle Headgear selected'}
                        >
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start">
                                <Typography
                                    variant="body2"
                                    component="label"
                                    fontWeight={700}
                                >
                                    MIDDLE
                                </Typography>
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={24} height={24}>
                                    <Image
                                        src={middleHeadgear !== null && middleHeadgear.items && middleHeadgear.items.length > 0 ? `https://db.irowiki.org/image/item/${middleHeadgear.items[0].itemId}.png` : '/interface/forbidden_item.png'}
                                        alt={"Middle"}
                                        width={24}
                                        height={24}
                                        draggable={false}
                                        loading="lazy"
                                    />
                                </Box>
                            </Box>
                        </Tooltip>
                    </Button>
                    <Button
                        onClick={() => resetMiddleHeadgear()}
                        disabled={middleHeadgear === null}
                        sx={{
                            minWidth: 110,
                            maxWidth: 200,
                            backgroundColor: 'inherit',
                            border: '1px solid #b8c4dc',
                            borderRadius: 1,
                            '&:hover': {
                                border: '1px solid #515789',
                            },
                            '&:disabled': {
                                backgroundColor: '#F2F2F2',
                            },
                        }}
                    >
                        <Typography
                            variant="body2"
                            component="label"
                            fontWeight={400}
                            fontSize={10}
                        >
                            CLEAR
                        </Typography>
                    </Button>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    flex={1}
                    gap={1}
                    padding={2}
                >
                    <Button
                        onClick={() => setSelected("Lower")}
                        sx={{
                            minWidth: 110,
                            maxWidth: 200,
                            padding: 1,
                            backgroundColor: selected === "Lower" ? '#fff495' : 'inherit',
                            border: '1px solid #b8c4dc',
                            borderRadius: 1,
                            '&:hover': {
                                border: '1px solid #515789',
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
                            title={lowerHeadgear !== null && lowerHeadgear.items && lowerHeadgear.items.length > 0 ? (
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                    <span
                                        key={`tooltip-selected-lower-location--${lowerHeadgear.location}`}
                                    >
                                        Location: {GetHeadgearLocation(lowerHeadgear.location)}
                                    </span>
                                    {lowerHeadgear.items.map((x) => (
                                        <span
                                            key={`tooltip-selected-lower-text--${x.name}-${x.itemId}`}
                                        >
                                            {x.name} (ID: {x.itemId})
                                        </span>
                                    ))}
                                </Box>
                            ) : 'No Lower Headgear selected'}
                        >
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start">
                                <Typography
                                    variant="body2"
                                    component="label"
                                    fontWeight={700}
                                >
                                    LOWER
                                </Typography>
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={24} height={24}>
                                    <Image
                                        src={lowerHeadgear !== null && lowerHeadgear.items && lowerHeadgear.items.length > 0 ? `https://db.irowiki.org/image/item/${lowerHeadgear.items[0].itemId}.png` : '/interface/forbidden_item.png'}
                                        alt={"Lower"}
                                        width={24}
                                        height={24}
                                        draggable={false}
                                        loading="lazy"
                                    />
                                </Box>
                            </Box>
                        </Tooltip>
                    </Button>
                    <Button
                        onClick={() => resetLowerHeadgear()}
                        disabled={lowerHeadgear === null}
                        sx={{
                            minWidth: 110,
                            maxWidth: 200,
                            backgroundColor: 'inherit',
                            border: '1px solid #b8c4dc',
                            borderRadius: 1,
                            '&:hover': {
                                border: '1px solid #515789',
                            },
                            '&:disabled': {
                                backgroundColor: '#F2F2F2',
                            },
                        }}
                    >
                        <Typography
                            variant="body2"
                            component="label"
                            fontWeight={400}
                            fontSize={10}
                        >
                            CLEAR
                        </Typography>
                    </Button>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    flex={1}
                    gap={1}
                    padding={2}
                >
                    <Button
                        onClick={() => setSelected("Garment")}
                        sx={{
                            minWidth: 110,
                            maxWidth: 200,
                            padding: 1,
                            backgroundColor: selected === "Garment" ? '#fff495' : 'inherit',
                            border: '1px solid #b8c4dc',
                            borderRadius: 1,
                            '&:hover': {
                                border: '1px solid #515789',
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
                            title={garment !== null && garment.items && garment.items.length > 0 ? (
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                    {garment.items.map((x) => (
                                        <span
                                            key={`tooltip-selected-garment-text--${x.name}-${x.itemId}`}
                                        >
                                            {x.name} (ID: {x.itemId})
                                        </span>
                                    ))}
                                </Box>
                            ) : 'No Garment selected'}
                        >
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start">
                                <Typography
                                    variant="body2"
                                    component="label"
                                    fontWeight={700}
                                >
                                    GARMENT
                                </Typography>
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={24} height={24}>
                                    <Image
                                        src={garment !== null && garment.items && garment.items.length > 0 ? `https://db.irowiki.org/image/item/${garment.items[0].itemId}.png` : '/interface/forbidden_item.png'}
                                        alt={"Garment"}
                                        width={24}
                                        height={24}
                                        draggable={false}
                                        loading="lazy"
                                    />
                                </Box>
                            </Box>
                        </Tooltip>
                    </Button>
                    <Button
                        onClick={() => resetGarment()}
                        disabled={garment === null}
                        sx={{
                            minWidth: 110,
                            maxWidth: 200,
                            backgroundColor: 'inherit',
                            border: '1px solid #b8c4dc',
                            borderRadius: 1,
                            '&:hover': {
                                border: '1px solid #515789',
                            },
                            '&:disabled': {
                                backgroundColor: '#F2F2F2',
                            },
                        }}
                    >
                        <Typography
                            variant="body2"
                            component="label"
                            fontWeight={400}
                            fontSize={10}
                        >
                            CLEAR
                        </Typography>
                    </Button>
                </Box>
            </Box>
            {selected === "Upper" ? (
                <HeadgearUpperTable headgearData={headgearData} queryFilter={debouncedSearch} />
            ) : selected === "Middle" ? (
                <HeadgearMiddleTable headgearData={headgearData} queryFilter={debouncedSearch} />
            ) : selected === "Lower" ? (
                <HeadgearLowerTable headgearData={headgearData} queryFilter={debouncedSearch} />
            ) : selected === "Garment" ? (
                <GarmentTable garmentData={garmentData} queryFilter={debouncedSearch} />
            ) : (
                <></>
            )}
        </Box>
    );
};

export default ItemSection;
