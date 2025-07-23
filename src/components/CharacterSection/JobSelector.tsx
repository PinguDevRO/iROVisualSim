import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import JobTooltip from '../JobTooltip/JobTooltip';
import {
    novice_job,
    first_job,
    second_job,
    transcendence_job,
    third_job,
    fourth_job,
    expanded_first_job,
    expanded_second_job,
    expanded_third_job,
    expanded_fourth_job,
    special_job,
    is_same_class,
    is_same_mount_class,
} from '@/constants/joblist';
import { useStore } from '@/store/useStore';

const JobSelector = () => {

    const selectedJob = useStore((x) => x.character.job)[0];
    const setSelectedJob = useStore((x) => x.update_char_job);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedJob([event.target.value]);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={1}>
            <Typography variant="body2" fontWeight={700} component="span">
                    Class Selection
            </Typography>
            <FormControl fullWidth size="small">
                <Select
                    id="select-job-name"
                    value={selectedJob}
                    onChange={handleChange}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d8d8d8',
                        },
                    }}
                >
                    <MenuItem disabled value="">
                        <em>Novice Job</em>
                    </MenuItem>
                    {novice_job.map((x) => (
                        <MenuItem
                            key={x.id}
                            value={is_same_mount_class(x.id, parseInt(selectedJob)).toString()}
                        >
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, parseInt(selectedJob))} />
                                {x.name}
                            </Box>
                        </MenuItem>
                    ))}
                    <MenuItem disabled value="">
                        <em>First Class</em>
                    </MenuItem>
                    {first_job.map((x) => (
                        <MenuItem
                            key={x.id}
                            value={is_same_mount_class(x.id, parseInt(selectedJob)).toString()}
                        >
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, parseInt(selectedJob))} />
                                {x.name}
                            </Box>
                        </MenuItem>
                    ))}
                    <MenuItem disabled value="">
                        <em>Second Class</em>
                    </MenuItem>
                    {second_job.map((x) => (
                        <MenuItem
                            key={x.id}
                            value={is_same_mount_class(x.id, parseInt(selectedJob)).toString()}
                        >
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, parseInt(selectedJob))} />
                                {x.name}
                            </Box>
                        </MenuItem>
                    ))}
                    <MenuItem disabled value="">
                        <em>Transcended Class</em>
                    </MenuItem>
                    {transcendence_job.map((x) => (
                        <MenuItem
                            key={x.id}
                            value={is_same_mount_class(x.id, parseInt(selectedJob)).toString()}
                        >
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, parseInt(selectedJob))} />
                                {x.name}
                            </Box>
                        </MenuItem>
                    ))}
                    <MenuItem disabled value="">
                        <em>Third Class</em>
                    </MenuItem>
                    {third_job.map((x) => (
                        <MenuItem
                            key={x.id}
                            value={is_same_mount_class(x.id, parseInt(selectedJob)).toString()}
                        >
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, parseInt(selectedJob))} />
                                {x.name}
                            </Box>
                        </MenuItem>
                    ))}
                    <MenuItem disabled value="">
                        <em>Fourth Class</em>
                    </MenuItem>
                    {fourth_job.map((x) => (
                        <MenuItem
                            key={x.id}
                            value={is_same_mount_class(x.id, parseInt(selectedJob)).toString()}
                        >
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, parseInt(selectedJob))} />
                                {x.name}
                            </Box>
                        </MenuItem>
                    ))}
                    <MenuItem disabled value="">
                        <em>Expanded First Class</em>
                    </MenuItem>
                    {expanded_first_job.map((x) => (
                        <MenuItem
                            key={x.id}
                            value={is_same_mount_class(x.id, parseInt(selectedJob)).toString()}
                        >
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, parseInt(selectedJob))} />
                                {x.name}
                            </Box>
                        </MenuItem>
                    ))}
                    <MenuItem disabled value="">
                        <em>Expanded Second Class</em>
                    </MenuItem>
                    {expanded_second_job.map((x) => (
                        <MenuItem
                            key={x.id}
                            value={is_same_mount_class(x.id, parseInt(selectedJob)).toString()}
                        >
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, parseInt(selectedJob))} />
                                {x.name}
                            </Box>
                        </MenuItem>
                    ))}
                    <MenuItem disabled value="">
                        <em>Expanded Third Class</em>
                    </MenuItem>
                    {expanded_third_job.map((x) => (
                        <MenuItem
                            key={x.id}
                            value={is_same_mount_class(x.id, parseInt(selectedJob)).toString()}
                        >
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, parseInt(selectedJob))} />
                                {x.name}
                            </Box>
                        </MenuItem>
                    ))}
                    <MenuItem disabled value="">
                        <em>Expanded Fourth Class</em>
                    </MenuItem>
                    {expanded_fourth_job.map((x) => (
                        <MenuItem
                            key={x.id}
                            value={is_same_mount_class(x.id, parseInt(selectedJob)).toString()}
                        >
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, parseInt(selectedJob))} />
                                {x.name}
                            </Box>
                        </MenuItem>
                    ))}
                    <MenuItem disabled value="">
                        <em>Special Class</em>
                    </MenuItem>
                    {special_job.map((x) => (
                        <MenuItem
                            key={x.id}
                            value={is_same_mount_class(x.id, parseInt(selectedJob)).toString()}
                        >
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, parseInt(selectedJob))} />
                                {x.name}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
};

export default JobSelector;
