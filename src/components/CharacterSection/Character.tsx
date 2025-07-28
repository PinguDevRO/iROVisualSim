import { useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import CharacterZoomLens from './CharacterZoomLens';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import { useStore, Direction } from "@/store/useStore";

type ButtonDirection = "Left" | "Right";

const Character = () => {

    const [genderHover, setGenderHover] = useState<number | null>(null);
    const [headDirHover, setHeadDirover] = useState<Direction | null>(null);
    const [bodyDirHover, setBodyDirHover] = useState<Direction | null>(null);
    const character = useStore((x) => x.character_url);
    const selectedGender = useStore((x) => x.character.gender);
    const download_char_image = useStore((x) => x.download_character_image);
    const setSelectedGender = useStore((x) => x.update_char_gender);
    const setHeadDirecion = useStore((x) => x.update_char_headdir);
    const setBodyDirection = useStore((x) => x.update_char_action);

    const getGenderButton = (id: number) => {
        if (id === 0) {
            if (selectedGender === id) return '/gender/bt_female_press.png'
            if (genderHover === id) return '/gender/bt_female_over.png'
            return '/gender/bt_female_off.png'
        }
        else if (id === 1) {
            if (selectedGender === id) return '/gender/bt_male_press.png'
            if (genderHover === id) return '/gender/bt_male_over.png'
            return '/gender/bt_male_off.png'
        }
        else {
            return "";
        }
    };

    const getHeadDirButton = (dir: ButtonDirection) => {
        if (dir === "Left") {
            if (headDirHover === "Left") return '/interface/bt_leftturn_press.png'
            return '/interface/bt_leftturn_normal.png'
        }
        else if (dir === "Right") {
            if (headDirHover === "Right") return '/interface/bt_rightturn_press.png'
            return '/interface/bt_rightturn_normal.png'
        }
        else {
            return "";
        }
    };

    const getBodyDirButton = (dir: ButtonDirection) => {
        if (dir === "Left") {
            if (bodyDirHover === "Left") return '/interface/bt_leftturn_press.png'
            return '/interface/bt_leftturn_normal.png'
        }
        else if (dir === "Right") {
            if (bodyDirHover === "Right") return '/interface/bt_rightturn_press.png'
            return '/interface/bt_rightturn_normal.png'
        }
        else {
            return "";
        }
    };


    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Box
                    height={40}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                >
                    <Typography variant="body2" fontWeight={700} component="span">
                        Character
                    </Typography>
                    <IconButton
                        sx={{
                            display: character !== null ? 'inline' : 'none',
                            p: 0,
                            m: 0,
                            width: 40,
                            height: 40,
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                        onClick={() => download_char_image()}
                    >
                        <DownloadIcon color="primary" />
                    </IconButton>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={200} height={200} margin={1}>
                    {character !== null ? (
                        <CharacterZoomLens imageUrl={character} />
                    ) : (
                        <Image
                            src={'/poring.png'}
                            alt={'Lazy Poring'}
                            width={200}
                            height={200}
                            draggable={false}
                            loading="lazy"
                        />
                    )}
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Typography variant="body2" fontWeight={700} component="span">
                    Gender
                </Typography>
                <Box display="flex" flexDirection="row" padding={1}>
                    <IconButton
                        key={`gender-male`}
                        onClick={() => setSelectedGender(1)}
                        onMouseEnter={() => setGenderHover(1)}
                        onMouseLeave={() => setGenderHover(null)}
                        disableRipple
                        sx={{
                            padding: 0,
                            margin: 0,
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={63} height={25}>
                            <Image
                                src={getGenderButton(1)}
                                alt={'male'}
                                width={63}
                                height={25}
                                draggable={false}
                                loading="lazy"
                            />
                        </Box>
                    </IconButton>
                    <IconButton
                        key={`gender-female`}
                        onClick={() => setSelectedGender(0)}
                        onMouseEnter={() => setGenderHover(0)}
                        onMouseLeave={() => setGenderHover(null)}
                        disableRipple
                        sx={{
                            padding: 0,
                            margin: 0,
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={62} height={25}>
                            <Image
                                src={getGenderButton(0)}
                                alt={'female'}
                                width={62}
                                height={25}
                                draggable={false}
                                loading="lazy"
                            />
                        </Box>
                    </IconButton>
                </Box>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={4}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Typography variant="body2" fontWeight={700} component="span">
                        Head Direction
                    </Typography>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <IconButton
                            key={`face-direction-left`}
                            onClick={() => setHeadDirecion("Left")}
                            onMouseEnter={() => setHeadDirover("Left")}
                            onMouseLeave={() => setHeadDirover(null)}
                            disableRipple
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={22} height={23}>
                                <Image
                                    src={getHeadDirButton("Left")}
                                    alt={'Left'}
                                    width={22}
                                    height={23}
                                    draggable={false}
                                    loading="lazy"
                                />
                            </Box>
                        </IconButton>
                        <IconButton
                            key={`face-direction-right`}
                            onClick={() => setHeadDirecion("Right")}
                            onMouseEnter={() => setHeadDirover("Right")}
                            onMouseLeave={() => setHeadDirover(null)}
                            disableRipple
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={22} height={23}>
                                <Image
                                    src={getHeadDirButton("Right")}
                                    alt={'Right'}
                                    width={22}
                                    height={23}
                                    draggable={false}
                                    loading="lazy"
                                />
                            </Box>
                        </IconButton>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Typography variant="body2" fontWeight={700} component="span">
                        Body Direction
                    </Typography>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <IconButton
                            key={`body-direction-left`}
                            onClick={() => setBodyDirection("Left")}
                            onMouseEnter={() => setBodyDirHover("Left")}
                            onMouseLeave={() => setBodyDirHover(null)}
                            disableRipple
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={22} height={23}>
                                <Image
                                    src={getBodyDirButton("Left")}
                                    alt={'Left'}
                                    width={22}
                                    height={23}
                                    draggable={false}
                                    loading="lazy"
                                />
                            </Box>
                        </IconButton>
                        <IconButton
                            key={`body-direction-right`}
                            onClick={() => setBodyDirection("Right")}
                            onMouseEnter={() => setBodyDirHover("Right")}
                            onMouseLeave={() => setBodyDirHover(null)}
                            disableRipple
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={22} height={23}>
                                <Image
                                    src={getBodyDirButton("Right")}
                                    alt={'Right'}
                                    width={22}
                                    height={23}
                                    draggable={false}
                                    loading="lazy"
                                />
                            </Box>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Character;
