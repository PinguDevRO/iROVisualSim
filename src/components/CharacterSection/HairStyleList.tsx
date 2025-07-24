import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { headlist } from '@/constants/headlist';
import { useStore } from "@/store/useStore";


const HairStyleList = () => {

    const selectedHead = useStore((x) => x.character.head);
    const selectedGender = useStore((x) => x.character.gender);
    const selectedJob = useStore((x) => x.character.job)[0];
    const setSelectedHead = useStore((x) => x.update_char_head);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={1}>
            <Typography variant="body2" fontWeight={700} component="span">
                Hair Style
            </Typography>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
            >
                {selectedGender === 1 && (selectedJob !== '4218' && selectedJob !== '4308') ?
                    headlist.human_male.map((x) => (
                        <IconButton
                            key={`hair-style-human-male-${x}`}
                            onClick={() => setSelectedHead(parseInt(x))}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                width={36}
                                height={36}
                                sx={{
                                    backgroundColor: parseInt(x) === selectedHead ? '#fff495' : 'inherit',
                                    border: "1px solid #b8c4dc !important",
                                    borderRadius: 1,
                                    '&:hover': {
                                        border: "1px solid #515789 !important",
                                    },
                                }}
                            >
                                <Image
                                    src={`/head/img_hairstyle${x}.gif`}
                                    alt={x}
                                    width={30}
                                    height={28}
                                    draggable={false}
                                    loading="lazy"
                                />
                            </Box>
                        </IconButton>
                    )) : selectedGender === 1 && (selectedJob === '4218' || selectedJob === '4308') ?
                        headlist.doram_male.map((x) => (
                            <IconButton
                                key={`hair-style-doram-male-${x}`}
                                onClick={() => setSelectedHead(parseInt(x))}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    width={36}
                                    height={36}
                                    sx={{
                                        backgroundColor: parseInt(x) === selectedHead ? '#fff495' : 'inherit',
                                        border: "1px solid #b8c4dc !important",
                                        borderRadius: 1,
                                        '&:hover': {
                                            border: "1px solid #515789 !important",
                                        },
                                    }}
                                >
                                    <Image
                                        src={`/head/img_hairstyle_doramboy${x}.gif`}
                                        alt={x}
                                        width={30}
                                        height={28}
                                        draggable={false}
                                        loading="lazy"
                                    />
                                </Box>
                            </IconButton>
                        )) : selectedGender === 0 && (selectedJob !== '4218' && selectedJob !== '4308') ?
                            headlist.human_female.map((x) => (
                                <IconButton
                                    key={`hair-style-human-female-${x}`}
                                    onClick={() => setSelectedHead(parseInt(x))}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                >
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        width={36}
                                        height={36}
                                        sx={{
                                            backgroundColor: parseInt(x) === selectedHead ? '#fff495' : 'inherit',
                                            border: "1px solid #b8c4dc !important",
                                            borderRadius: 1,
                                            '&:hover': {
                                                border: "1px solid #515789 !important",
                                            },
                                        }}
                                    >
                                        <Image
                                            src={`/head/img_hairstyle_girl${x}.gif`}
                                            alt={x}
                                            width={30}
                                            height={28}
                                            draggable={false}
                                            loading="lazy"
                                        />
                                    </Box>
                                </IconButton>
                            )) : selectedGender === 0 && (selectedJob === '4218' || selectedJob === '4308') ?
                                headlist.doram_female.map((x) => (
                                    <IconButton
                                        key={`hair-style-doram-female-${x}`}
                                        onClick={() => setSelectedHead(parseInt(x))}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                            },
                                        }}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            justifyContent="center"
                                            width={36}
                                            height={36}
                                            sx={{
                                                backgroundColor: parseInt(x) === selectedHead ? '#fff495' : 'inherit',
                                                border: "1px solid #b8c4dc !important",
                                                borderRadius: 1,
                                                '&:hover': {
                                                    border: "1px solid #515789 !important",
                                                },
                                            }}
                                        >
                                            <Image
                                                src={`/head/img_hairstyle_doramgirl${x}.gif`}
                                                alt={x}
                                                width={30}
                                                height={28}
                                                draggable={false}
                                                loading="lazy"
                                            />
                                        </Box>
                                    </IconButton>
                                )) : (
                                    <></>
                                )
                }
            </Box>
        </Box>
    );
};

export default HairStyleList;
