import { useEffect, useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
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
                <Button
                    onClick={() => setSelected("Upper")}
                    sx={{
                        minWidth: 110,
                        maxWidth: 200,
                        padding: 1,
                        margin: 2,
                        backgroundColor: selected === "Upper" ? '#fff495' : 'inherit',
                        border: '1px solid #b8c4dc',
                        borderRadius: 1,
                        '&:hover': {
                            border: '1px solid #fff495',
                        },
                    }}
                >
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start">
                        <Typography
                            variant="body2"
                            component="label"
                            sx={{
                                p: 0.5,
                                borderRadius: 2,
                                fontWeight: 700,
                            }}
                        >
                            UPPER
                        </Typography>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={24} height={24}>
                            <Image
                                src={upperHeadgear !== null ? `https://db.irowiki.org/image/item/${upperHeadgear.itemId}.png` : '/interface/forbidden_item.png'}
                                alt={"test"}
                                width={24}
                                height={24}
                                draggable={false}
                                loading="lazy"
                            />
                        </Box>
                    </Box>
                </Button>
                <Button
                    onClick={() => setSelected("Middle")}
                    sx={{
                        minWidth: 110,
                        maxWidth: 200,
                        padding: 1,
                        margin: 2,
                        backgroundColor: selected === "Middle" ? '#fff495' : 'inherit',
                        border: '1px solid #b8c4dc',
                        borderRadius: 1,
                        '&:hover': {
                            border: '1px solid #fff495',
                        },
                    }}
                >
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start">
                        <Typography
                            variant="body2"
                            component="label"
                            sx={{ p: 0.5, borderRadius: 2, fontWeight: 700 }}
                        >
                            MIDDLE
                        </Typography>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={24} height={24}>
                            <Image
                                src={middleHeadgear !== null ? `https://db.irowiki.org/image/item/${middleHeadgear.itemId}.png` : '/interface/forbidden_item.png'}
                                alt={"test"}
                                width={24}
                                height={24}
                                draggable={false}
                                loading="lazy"
                            />
                        </Box>
                    </Box>
                </Button>
                <Button
                    onClick={() => setSelected("Lower")}
                    sx={{
                        minWidth: 110,
                        maxWidth: 200,
                        padding: 1,
                        margin: 2,
                        backgroundColor: selected === "Lower" ? '#fff495' : 'inherit',
                        border: '1px solid #b8c4dc',
                        borderRadius: 1,
                        '&:hover': {
                            border: '1px solid #fff495',
                        },
                    }}
                >
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start">
                        <Typography
                            variant="body2"
                            component="label"
                            sx={{ p: 0.5, borderRadius: 2, fontWeight: 700 }}
                        >
                            LOWER
                        </Typography>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={24} height={24}>
                            <Image
                                src={lowerHeadgear !== null ? `https://db.irowiki.org/image/item/${lowerHeadgear.itemId}.png` : '/interface/forbidden_item.png'}
                                alt={"test"}
                                width={24}
                                height={24}
                                draggable={false}
                                loading="lazy"
                            />
                        </Box>
                    </Box>
                </Button>
                <Button
                    onClick={() => setSelected("Garment")}
                    sx={{
                        minWidth: 110,
                        maxWidth: 200,
                        padding: 1,
                        margin: 2,
                        backgroundColor: selected === "Garment" ? '#fff495' : 'inherit',
                        border: '1px solid #b8c4dc',
                        borderRadius: 1,
                        '&:hover': {
                            border: '1px solid #fff495',
                        },
                    }}
                >
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start">
                        <Typography
                            variant="body2"
                            component="label"
                            sx={{ p: 0.5, borderRadius: 2, fontWeight: 700 }}
                        >
                            GARMENT
                        </Typography>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={24} height={24}>
                            <Image
                                src={garment !== null ? `https://db.irowiki.org/image/item/${garment.itemId}.png` : '/interface/forbidden_item.png'}
                                alt={"test"}
                                width={24}
                                height={24}
                                draggable={false}
                                loading="lazy"
                            />
                        </Box>
                    </Box>
                </Button>
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
