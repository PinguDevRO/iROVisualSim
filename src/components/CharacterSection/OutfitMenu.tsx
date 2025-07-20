import { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useStore } from "@/store/useStore";


const OutfitMenuList = () => {

    const outfitState = useStore((x) => x.character.outfit);
    const jobMountState = useStore((x) => x.regular_mount_checked);
    const cashMountState = useStore((x) => x.cash_mount_checked);
    const setOutfitState = useStore((x) => x.update_char_outfit);
    const setJobMountState = useStore((x) => x.update_regular_mount);
    const setCashMountState = useStore((x) => x.update_cash_mount);

    const handleOnJobMount = (state: ChangeEvent<HTMLInputElement>) => {
        if (cashMountState === 1 && state.target.checked) {
            setCashMountState(0);
        }
        setJobMountState(state.target.checked ? 1 : 0);
    };

    const handleOnCashMount = (state: ChangeEvent<HTMLInputElement>) => {
        if (jobMountState === 1 && state.target.checked) {
            setJobMountState(0);
        }
        setCashMountState(state.target.checked ? 1 : 0);
    };

    return (
        <Box
            display="flex"
            flexDirection="row"
            flex={1}
            alignItems="start"
            justifyContent="center"
        >
            <FormGroup>
                <Typography variant="body2" fontWeight={700} component="span" align="left">
                    Costume
                </Typography>
                <FormControlLabel control={<Checkbox checked={outfitState === 1 ? true : false} onChange={(state) => setOutfitState(state.target.checked ? 1 : 0)} />} label="jRO Costume" />
            </FormGroup>
            <FormGroup>
                <Typography variant="body2" fontWeight={700} component="span" align="left">
                    Mount
                </Typography>
                <FormControlLabel control={<Checkbox checked={jobMountState === 1 ? true : false} onChange={handleOnJobMount} />} label="Job Mount" />
                <FormControlLabel control={<Checkbox checked={cashMountState === 1 ? true : false} onChange={handleOnCashMount} />} label="Cash Mount" />
            </FormGroup>
        </Box>
    );
};

export default OutfitMenuList;
