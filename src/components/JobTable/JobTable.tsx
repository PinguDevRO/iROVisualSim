'use client';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
    is_same_class,
} from '@/constants/joblist';
import { useStore } from '@/store/useStore';

const JobTable = () => {

    const selectedJob = Number(useStore((x) => x.character.job)[0]);
    const setSelectedJob = useStore((x) => x.update_char_job);

    return (
        <TableContainer component={Paper}>
            <Table size="small" sx={{ tableLayout: { 'xs': "auto", 'md': 'fixed' } }} aria-label="job-table">
                <TableBody>
                    <TableRow>
                        {novice_job.map((x) => (
                            <TableCell
                                key={x.id}
                                align="center"
                                colSpan={13}
                                onClick={() => setSelectedJob([x.id.toString()])}
                            >
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, selectedJob)} />
                                </Box>
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {first_job.map((x) => (
                            <TableCell
                                key={x.id}
                                align="center"
                                colSpan={x.colspan ? x.colspan : 2}
                                onClick={() => setSelectedJob([x.id.toString()])}
                            >
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, selectedJob)} />
                                </Box>
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {second_job.map((x) => (
                            <TableCell
                                key={x.id}
                                align="center"
                                onClick={() => setSelectedJob([x.id.toString()])}
                            >
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, selectedJob)} />
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {transcendence_job.map((x) => (
                            <TableCell
                                key={x.id}
                                align="center"
                                onClick={() => setSelectedJob([x.id.toString()])}
                            >
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, selectedJob)} />
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {third_job.map((x) => (
                            <TableCell
                                key={x.id}
                                align="center"
                                onClick={() => setSelectedJob([x.id.toString()])}
                            >
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, selectedJob)} />
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {fourth_job.map((x) => (
                            <TableCell
                                key={x.id}
                                align="center"
                                onClick={() => setSelectedJob([x.id.toString()])}
                            >
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, selectedJob)} />
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {expanded_first_job.map((x) => (
                            <TableCell
                                key={x.id}
                                align="center"
                                colSpan={x.colspan ? x.colspan : 1}
                                onClick={() => setSelectedJob([x.id.toString()])}
                            >
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, selectedJob)} />
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {expanded_second_job.map((x) => (
                            <TableCell
                                key={x.id}
                                align="center"
                                onClick={() => setSelectedJob([x.id.toString()])}
                            >
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, selectedJob)} />
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {expanded_third_job.map((x) => (
                            <TableCell
                                key={x.id}
                                align="center"
                                onClick={() => setSelectedJob([x.id.toString()])}
                            >
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, selectedJob)} />
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {expanded_fourth_job.map((x) => (
                            <TableCell
                                key={x.id}
                                align="center"
                                onClick={() => setSelectedJob([x.id.toString()])}
                            >
                                <JobTooltip jobId={x.id} jobName={x.name} isSelected={is_same_class(x.id, selectedJob)} />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default JobTable;
