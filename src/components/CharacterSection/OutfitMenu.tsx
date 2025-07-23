import { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { third_job, is_3rdjob_using_jobmount, is_valid_job_with_mount } from '@/constants/joblist';
import { useStore } from "@/store/useStore";


const OutfitMenuList = () => {

    const currentJob = parseInt(useStore((x) => x.character.job)[0]);
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

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
        >
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            size="small"
                            disabled={!(third_job.some((x) => x.id === currentJob) || is_3rdjob_using_jobmount(currentJob))}
                            checked={outfitState === 1 ? true : false}
                            onChange={(state) => setOutfitState(state.target.checked ? 1 : 0)}
                        />
                    }
                    label="jRO Costume"
                />
            </FormGroup>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            size="small"
                            disabled={!is_valid_job_with_mount(currentJob)}
                            checked={jobMountState === 1 ? true : false}
                            onChange={handleOnJobMount}
                        />
                    }
                    label="Job Mount"
                />
            </FormGroup>
        </Box>
    );
};

export default OutfitMenuList;
