'use client';

import {
    EndpointName,
    EndpointStatus,
    Model
} from '@/controllers/main';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Loading from '@/components/Loading/Loading';
import JobTable from '@/components/JobTable/JobTable';
import ItemSection from '@/components/ItemSection/ItemSection';
import CharacterSection from '@/components/CharacterSection/CharacterSection';
import MiscSection from '@/components/MiscSection/MiscSection';
import { COLORS } from "@/theme/colors";

const MainScreen = ({
    model,
    endpoints,
}: {
    model: Partial<Model> | undefined;
    endpoints: Partial<Record<EndpointName, EndpointStatus>> | undefined;
}) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    'xs': "1fr",
                    'md': "1fr 1fr"
                },
                gap: 2,
                padding: 2,
                boxSizing: 'border-box',
                minWidth: 0,
                borderRadius: {
                    'xs': 0,
                    'md': 2,
                },
                background: COLORS.third_background,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    padding: 2,
                    borderRadius: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 0,
                    maxWidth: 700
                }}
            >
                <JobTable />
            </Paper>
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    padding: 2,
                    borderRadius: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 0,
                    maxWidth: 700
                }}
            >
                <CharacterSection />
            </Paper>
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    padding: 2,
                    borderRadius: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 0,
                    maxWidth: 700
                }}
            >
                {endpoints === undefined || (endpoints?.getGarmentData?.loading || endpoints?.getHeadgearData?.loading) ? (
                    <Loading />
                ) : (
                    <ItemSection headgearData={model?.headgearData} garmentData={model?.garmentData} />
                )}
            </Paper>
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    padding: 2,
                    borderRadius: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 0,
                    maxWidth: 700
                }}
            >
                <MiscSection />
            </Paper>
        </Box>
    )
};

export default MainScreen;
