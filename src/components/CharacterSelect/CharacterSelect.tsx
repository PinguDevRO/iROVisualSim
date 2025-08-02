import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { get_jobname_by_id, get_base_job_mount } from '@/constants/joblist';
import { SxProps } from '@mui/material';
import { useStore, Character } from '@/store/useStore';

const MainModalStyle: SxProps = {
    display: 'flex',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1010,
    height: 620,
    bgcolor: '#F2F2F2',
    border: '1px solid #000',
    borderRadius: 2,
    gap: 2,
    paddingX: 2,
    paddingY: 3,
};

const CreationModalStyle: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: '#F2F2F2',
    border: '1px solid #000',
    borderRadius: 2,
    gap: 3,
    padding: 2,
};

type NameModalType = "Rename" | "Create";

const CharacterSelect = () => {

    const maxPage = 2;
    const maxChar = 15;
    const nameModalTypeRef = useRef<NameModalType>("Create");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [hover, setHover] = useState<number | null>(null);
    const [renameHover, setRenameHover] = useState<boolean>(false);
    const [deleteHover, setDeleteHover] = useState<boolean>(false);
    const [loadHover, setLoadHover] = useState<boolean>(false);
    const [leftArrowHover, setLeftArrowHover] = useState<boolean>(false);
    const [rightArrowHover, setRightArrowHover] = useState<boolean>(false);
    const [closeButtonHover, setCloseButtonHover] = useState<boolean>(false);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    const open = useStore((x) => x._characterModal);
    const close = useStore((x) => x.close_character_modal);
    const characters = useStore((x) => x.characterList);
    const load_character = useStore((x) => x.load_character);
    const update_character_name = useStore((x) => x.update_char_name);
    const create_character = useStore((x) => x.create_character);
    const deleteCharacter = useStore((x) => x.delete_character);
    const load_all_characters = useStore((x) => x.load_character_modal);

    useEffect(() => {
        load_all_characters();
    }, []);

    const getCharacterJobName = (): string => {
        if (selectedCharacter !== null && selectedCharacter.exist) {
            const job = parseInt(selectedCharacter.character.job[0]);
            return get_jobname_by_id(job);
        }
        return 'Unknown';
    };

    const handleOnCharacterLoad = () => {
        if (selectedCharacter !== null && selectedCharacter.exist) {
            load_character(selectedCharacter.position);
            close();
        }
    };

    const handleOnCharacterRename = () => {
        if(selectedCharacter !== null && selectedCharacter.exist) {
            update_character_name(selectedCharacter.position, name);
            setSelectedCharacter(null);
            handleOnModalClose();
        }
    };

    const handleOnCharacterCreation = () => {
        if (selectedCharacter !== null && !selectedCharacter.exist) {
            create_character(selectedCharacter.position, name);
            setSelectedCharacter(null);
            handleOnModalClose();
        }
    };

    const handleOnCharacterDeletion = () => {
        if (selectedCharacter !== null && selectedCharacter.exist) {
            deleteCharacter(selectedCharacter.position);
            setSelectedCharacter(null);
        }
    };

    const handleOnPageChange = (value: number) => {
        const newPage = page + value;
        if (newPage <= maxPage && newPage >= 1) {
            setPage(newPage);
        }
    };

    const handleOnNameModalOpen = () => {
        nameModalTypeRef.current = "Create";
        setModalOpen(true);
    };

    const handleOnRenameModalOpen = () => {
        if(selectedCharacter !== null && selectedCharacter.exist) {
            nameModalTypeRef.current = "Rename";
            setName(selectedCharacter.name ? selectedCharacter.name : '');
            setModalOpen(true);
        }
    };

    const handleOnModalClose = () => {
        setName('');
        setModalOpen(false);
    };

    const CloseButtonBackground = (isHover: boolean): string => {
        if (isHover) return '/game_interface/bt_close2_over.png';
        return '/game_interface/bt_close2_normal.png';
    };

    const LeftArrowBackground = (isHover: boolean): string => {
        if (isHover) return '/game_interface/bt_left_over.png';
        return '/game_interface/bt_left_off.png';
    };

    const RightArrowBackground = (isHover: boolean): string => {
        if (isHover) return '/game_interface/bt_right_over.png';
        return '/game_interface/bt_right_off.png';
    };

    const InfoHoverBackground = (isHover: boolean): string => {
        if (isHover) return '/game_interface/bt_info_over.png';
        return '/game_interface/bt_info_normal.png';
    };

    const LoadHoverBackground = (isHover: boolean): string => {
        if (isHover) return '/game_interface/bt_gamestart_over.png';
        return '/game_interface/bt_gamestart_off.png';
    };

    const CharacterBackground = (isSelected: boolean, isHover: boolean): string => {
        if (isSelected) return '/game_interface/img_slot_select.gif';
        if (isHover) return '/game_interface/img_slot_over.png';
        return '/game_interface/img_slot_normal.png';
    };

    const NoCharacterBackground = (isSelected: boolean, isHover: boolean): string => {
        if (isSelected) return '/game_interface/img_slot2_select.png';
        if (isHover) return '/game_interface/img_slot2_over.png';
        return '/game_interface/img_slot2_normal.png';
    };

    const SelectBackground = (isChar: boolean, isSelected: boolean, isHover: boolean): string => {
        if (isChar) {
            return CharacterBackground(isSelected, isHover);
        }
        return NoCharacterBackground(isSelected, isHover);
    };

    return (
        <Modal
            open={open}
            aria-labelledby="character-modal"
            aria-describedby="character-modal-desc"
        >
            <Box sx={MainModalStyle}>
                <Modal
                    open={modalOpen}
                    aria-labelledby="character-modal"
                    aria-describedby="character-modal-desc"
                >
                    <Box sx={CreationModalStyle}>
                        <Typography
                            variant='body2'
                            fontSize={16}
                            fontWeight={700}
                        >
                            Select Character Name
                        </Typography>
                        <TextField
                            id="character-name-input"
                            label="Character Name"
                            fullWidth
                            value={name}
                            autoComplete="off"
                            inputProps={{
                                maxLength: 30,
                            }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setName(event.target.value);
                            }}
                        />
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                            gap={4}
                        >
                            <Button
                                variant='outlined'
                                disabled={name.length <= 0}
                                onClick={() => nameModalTypeRef.current === 'Create' ? handleOnCharacterCreation() : handleOnCharacterRename()}
                            >
                                {nameModalTypeRef.current === 'Create' ? 'Create' : 'Rename'}
                            </Button>
                            <Button
                                variant='outlined'
                                onClick={handleOnModalClose}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Modal>
                <IconButton
                    sx={{
                        p: 0,
                        m: 0,
                        width: 17,
                        height: 18,
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                        position: 'absolute',
                        top: '0.3%',
                        left: '96%',
                        transform: 'translateX(-50%)',
                        zIndex: 13,
                    }}
                    onMouseEnter={() => setCloseButtonHover(true)}
                    onMouseLeave={() => setCloseButtonHover(false)}
                    onClick={() => close()}
                >
                    <Image
                        src={CloseButtonBackground(closeButtonHover)}
                        alt={'Close Button'}
                        width={17}
                        height={18}
                        draggable={false}
                        loading="eager"
                    />
                </IconButton>
                <Box
                    display="grid"
                    gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
                    alignItems="center"
                    justifyContent="center"
                >
                    {characters.slice((page - 1) * maxChar, page * maxChar).map((val, idx) => (
                        <IconButton
                            key={`char-select-page-${page}-slot-${idx}`}
                            sx={{
                                p: 0,
                                m: 0,
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                            onMouseEnter={() => setHover(idx)}
                            onMouseLeave={() => setHover(null)}
                            onClick={() => setSelectedCharacter(val)}
                        >
                            <Box sx={{ position: 'relative', width: 157, height: 195 }}>
                                <Image
                                    src={SelectBackground(val.exist, selectedCharacter !== null && selectedCharacter.position === (page - 1) * maxChar + idx, idx === hover)}
                                    alt={`char select ${idx + 1}`}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    draggable={false}
                                    loading="eager"
                                />
                                {val.character_url !== null ? (
                                    <>
                                        <Image
                                            src={val.character_url}
                                            alt={`char select ${idx + 1}`}
                                            fill
                                            style={{
                                                objectFit: 'cover',
                                                pointerEvents: 'none',
                                                transform: 'translateY(-15px)'
                                            }}
                                            draggable={false}
                                            loading="eager"
                                        />
                                        <Image
                                            src={`/job/icon_jobs_${get_base_job_mount(Number(val.character.job[0]))}.png`}
                                            alt={`char select ${idx + 1}`}
                                            width={25}
                                            height={25}
                                            style={{
                                                position: 'absolute',
                                                top: '8%',
                                                left: '85%',
                                                transform: 'translateX(-50%)',
                                            }}
                                            draggable={false}
                                            loading="eager"
                                        />
                                        <Typography
                                            variant='body2'
                                            sx={{
                                                width: 120,
                                                position: 'absolute',
                                                top: selectedCharacter !== null && selectedCharacter.position === (page - 1) * maxChar + idx ? "84%" : idx === hover ? "86%" : "85%",
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                color: '#433e5a',
                                                fontSize: 11,
                                                fontWeight: 'bold',
                                                fontFamily: 'Tahoma',
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            {val.name}
                                        </Typography>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </Box>
                        </IconButton>
                    ))}
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box sx={{ position: 'relative', width: 173, height: 575 }}>
                        <Image
                            src={'/game_interface/img_info.png'}
                            alt={'char information'}
                            fill
                            style={{ objectFit: 'contain' }}
                            draggable={false}
                            loading="eager"
                        />
                        <Box
                            display="flex"
                            flexDirection="column"
                            sx={{
                                width: "60%",
                                position: 'absolute',
                                top: '15.5%',
                                left: '65%',
                                transform: 'translateX(-50%)',
                                zIndex: 13,
                                gap: 0.335
                            }}
                        >
                            <Typography
                                variant='body2'
                                sx={{
                                    textWrap: "nowrap",
                                    color: '#000000',
                                    fontSize: 10,
                                    fontFamily: 'Arial',
                                    letterSpacing: '0.05em',
                                    zIndex: 13,
                                }}
                            >
                                {selectedCharacter !== null && selectedCharacter.exist ? 'iRO Wiki' : ''}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    textWrap: "nowrap",
                                    color: '#000000',
                                    fontSize: 10,
                                    fontFamily: 'Arial',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {selectedCharacter !== null && selectedCharacter.exist ? getCharacterJobName() : ''}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    textWrap: "nowrap",
                                    color: '#000000',
                                    fontSize: 10,
                                    fontFamily: 'Arial',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {selectedCharacter !== null && selectedCharacter.exist ? '275' : ''}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    textWrap: "nowrap",
                                    color: '#000000',
                                    fontSize: 10,
                                    fontFamily: 'Arial',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {selectedCharacter !== null && selectedCharacter.exist ? '9999999999' : ''}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    textWrap: "nowrap",
                                    color: '#000000',
                                    fontSize: 10,
                                    fontFamily: 'Arial',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {selectedCharacter !== null && selectedCharacter.exist ? '185000' : ''}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    textWrap: "nowrap",
                                    color: '#000000',
                                    fontSize: 10,
                                    fontFamily: 'Arial',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {selectedCharacter !== null && selectedCharacter.exist ? '14200' : ''}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    textWrap: "nowrap",
                                    color: '#000000',
                                    fontSize: 10,
                                    fontFamily: 'Arial',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {selectedCharacter !== null && selectedCharacter.exist ? '200' : ''}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    textWrap: "nowrap",
                                    color: '#000000',
                                    fontSize: 10,
                                    fontFamily: 'Arial',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {selectedCharacter !== null && selectedCharacter.exist ? '200' : ''}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    textWrap: "nowrap",
                                    color: '#000000',
                                    fontSize: 10,
                                    fontFamily: 'Arial',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {selectedCharacter !== null && selectedCharacter.exist ? '200' : ''}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    textWrap: "nowrap",
                                    color: '#000000',
                                    fontSize: 10,
                                    fontFamily: 'Arial',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {selectedCharacter !== null && selectedCharacter.exist ? '200' : ''}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    textWrap: "nowrap",
                                    color: '#000000',
                                    fontSize: 10,
                                    fontFamily: 'Arial',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {selectedCharacter !== null && selectedCharacter.exist ? '200' : ''}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    textWrap: "nowrap",
                                    color: '#000000',
                                    fontSize: 10,
                                    fontFamily: 'Arial',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {selectedCharacter !== null && selectedCharacter.exist ? '200' : ''}
                            </Typography>
                        </Box>
                        <IconButton
                            sx={{
                                p: 0,
                                m: 0,
                                width: 131,
                                height: 24,
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                                position: 'absolute',
                                top: '52%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 10
                            }}
                            disabled={selectedCharacter === null}
                            onMouseEnter={() => setDeleteHover(true)}
                            onMouseLeave={() => setDeleteHover(false)}
                            onClick={() => selectedCharacter !== null && selectedCharacter.exist ? handleOnCharacterDeletion() : handleOnNameModalOpen()}
                        >
                            <Image
                                src={InfoHoverBackground(deleteHover)}
                                alt={'char deletion'}
                                width={131}
                                height={24}
                                draggable={false}
                                loading="eager"
                            />
                            <Typography
                                variant='body2'
                                sx={{
                                    position: 'absolute',
                                    top: '20%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    color: '#000000',
                                    fontSize: 12,
                                    fontFamily: 'Arial',
                                }}
                            >
                                {selectedCharacter !== null && selectedCharacter.exist ? 'Delete' : 'Create'}
                            </Typography>
                        </IconButton>
                        <IconButton
                            sx={{
                                display: selectedCharacter !== null && selectedCharacter.exist ? 'inline' : 'none',
                                p: 0,
                                m: 0,
                                width: 131,
                                height: 24,
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                                position: 'absolute',
                                top: '58%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 10
                            }}
                            disabled={selectedCharacter === null}
                            onMouseEnter={() => setRenameHover(true)}
                            onMouseLeave={() => setRenameHover(false)}
                            onClick={() => handleOnRenameModalOpen()}
                        >
                            <Image
                                src={InfoHoverBackground(renameHover)}
                                alt={'char rename'}
                                width={131}
                                height={24}
                                draggable={false}
                                loading="eager"
                            />
                            <Typography
                                variant='body2'
                                sx={{
                                    position: 'absolute',
                                    top: '20%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    color: '#000000',
                                    fontSize: 12,
                                    fontFamily: 'Arial',
                                }}
                            >
                                Rename
                            </Typography>
                        </IconButton>
                        <IconButton
                            sx={{
                                display: selectedCharacter !== null && selectedCharacter.exist ? 'inline' : 'none',
                                p: 0,
                                m: 0,
                                width: 165,
                                height: 110,
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                                position: 'absolute',
                                top: '67%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 10
                            }}
                            onMouseEnter={() => setLoadHover(true)}
                            onMouseLeave={() => setLoadHover(false)}
                            onClick={() => handleOnCharacterLoad()}
                        >
                            <Image
                                src={LoadHoverBackground(loadHover)}
                                alt={'char load'}
                                width={165}
                                height={110}
                                draggable={false}
                                loading="eager"
                            />
                            <Typography
                                variant='body2'
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    textWrap: "nowrap",
                                    color: '#F2F2F2',
                                    fontSize: 16,
                                    fontWeight: 700,
                                    fontFamily: 'Tahoma',
                                }}
                            >
                                Start Game
                            </Typography>
                        </IconButton>
                        <Typography
                            variant='body2'
                            sx={{
                                position: 'absolute',
                                top: '89%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                textWrap: "nowrap",
                                color: '#000000',
                                fontSize: 12,
                                fontFamily: 'Arial',
                                zIndex: 13,
                            }}
                        >
                            Character List
                        </Typography>
                        <IconButton
                            sx={{
                                p: 0,
                                m: 0,
                                width: 21,
                                height: 28,
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                                position: 'absolute',
                                top: '92.6%',
                                left: '20%',
                                transform: 'translateX(-50%)',
                                zIndex: 13,
                            }}
                            onMouseEnter={() => setLeftArrowHover(true)}
                            onMouseLeave={() => setLeftArrowHover(false)}
                            onClick={() => handleOnPageChange(-1)}
                        >
                            <Image
                                src={LeftArrowBackground(leftArrowHover)}
                                alt={'Left Arrow'}
                                width={21}
                                height={28}
                                draggable={false}
                                loading="eager"
                            />
                        </IconButton>
                        <IconButton
                            sx={{
                                p: 0,
                                m: 0,
                                width: 21,
                                height: 28,
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                                position: 'absolute',
                                top: '92.6%',
                                left: '80%',
                                transform: 'translateX(-50%)',
                                zIndex: 13,
                            }}
                            onMouseEnter={() => setRightArrowHover(true)}
                            onMouseLeave={() => setRightArrowHover(false)}
                            onClick={() => handleOnPageChange(1)}
                        >
                            <Image
                                src={RightArrowBackground(rightArrowHover)}
                                alt={'Right Arrow'}
                                width={21}
                                height={28}
                                draggable={false}
                                loading="eager"
                            />
                        </IconButton>
                        <Typography
                            variant='body2'
                            sx={{
                                position: 'absolute',
                                top: '92.6%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                textWrap: "nowrap",
                                color: '#F2F2F2',
                                fontSize: 20,
                                fontWeight: 700,
                                fontFamily: 'Arial',
                                zIndex: 13,
                            }}
                        >
                            {page} / {maxPage}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
};

export default CharacterSelect;
