/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { enqueueSnackbar } from 'notistack'
import { HeadgearModel } from '@/models/get-headgear';
import { GarmentModel } from '@/models/get-garment';
import { useStore, Character } from "@/store/useStore";


const ActionButton = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const state = useStore.getState();
    const load_char = useStore((x) => x.load_character);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const loadCharacter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const data = JSON.parse(text);
                if (isValidFullState(data)) {
                    useStore.setState({ _hasHydrated: false, character_url: null, ...data });
                    load_char()
                    enqueueSnackbar("Character successfully loaded!", { variant: "success" });
                }
                else {
                    enqueueSnackbar("Invalid character file!", { variant: "error" });
                }
            } catch {
                enqueueSnackbar("Error while reading your character data!", { variant: "error" });
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const saveCharacter = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _hasHydrated, character_url, ...data } = state;
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'character.json';
        a.click();

        enqueueSnackbar("Downloading character data...", { variant: "success" });

        URL.revokeObjectURL(url);
    };

    const isValidFullState = (obj: any): obj is {
        character: Character;
        headgear_upper: HeadgearModel | null;
        headgear_middle: HeadgearModel | null;
        headgear_lower: HeadgearModel | null;
        garment: GarmentModel | null;
        cash_mount_checked: number;
        regular_mount_checked: number;
    } => {
        if (typeof obj !== 'object' || obj === null) return false;

        const c = obj.character;
        if (
            !c ||
            typeof c.gender !== 'number' ||
            !Array.isArray(c.job) ||
            !c.job.every((j: unknown): j is string => typeof j === 'string') ||
            typeof c.head !== 'number' ||
            typeof c.headPalette !== 'number' ||
            typeof c.headdir !== 'number' ||
            !Array.isArray(c.headgear) ||
            !c.headgear.every((h: unknown): h is number => typeof h === 'number') ||
            typeof c.garment !== 'number' ||
            typeof c.bodyPalette !== 'number' ||
            typeof c.action !== 'number' ||
            typeof c.canvas !== 'string' ||
            typeof c.outfit !== 'number'
        ) {
            return false;
        }

        const isValidHeadgearModel = (h: any) =>
            h === null ||
            (
                typeof h === 'object' &&
                typeof h.accessoryId === 'number' &&
                typeof h.location === 'number' &&
                Array.isArray(h.items) &&
                h.items.every(
                    (i: any) =>
                        typeof i.itemId === 'number' &&
                        typeof i.name === 'string'
                )
            );

        if (
            !isValidHeadgearModel(obj.headgear_upper) ||
            !isValidHeadgearModel(obj.headgear_middle) ||
            !isValidHeadgearModel(obj.headgear_lower)
        ) {
            return false;
        }

        const g = obj.garment;
        if (
            g !== null &&
            (
                typeof g !== 'object' ||
                typeof g.garmentId !== 'number' ||
                !Array.isArray(g.items) ||
                !g.items.every(
                    (i: any) =>
                        typeof i.itemId === 'number' &&
                        typeof i.name === 'string'
                )
            )
        ) {
            return false;
        }

        if (
            typeof obj.cash_mount_checked !== 'number' ||
            typeof obj.regular_mount_checked !== 'number'
        ) {
            return false;
        }

        return true;
    };


    return (
        <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
        >
            <Typography variant="body2" fontWeight={700} component="span">
                Load/Save Character
            </Typography>
            <Box
                width="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                gap={2}
            >
                <input
                    type="file"
                    accept=".json,application/json"
                    onChange={loadCharacter}
                    style={{ display: 'none' }}
                    ref={inputRef}
                />
                <Button
                    variant="outlined"
                    onClick={handleButtonClick}
                    color="error"
                    sx={{
                        width: "100%",

                    }}
                >
                    <Typography variant="body2" fontWeight={400} component="span">
                        Load
                    </Typography>
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => saveCharacter()}
                    color="error"
                    sx={{
                        width: "100%",

                    }}
                >
                    <Typography variant="body2" fontWeight={400} component="span">
                        Save
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default ActionButton;
