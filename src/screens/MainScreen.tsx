'use client';

import {
    EndpointName,
    EndpointStatus,
    Model
} from '@/controllers/main';
import { SnackbarProvider } from 'notistack'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Loading from '@/components/Loading/Loading';
import ItemSection from '@/components/ItemSection/ItemSection';
import CharacterSection from '@/components/CharacterSection/CharacterSection';
import CharacterSelect from '@/components/CharacterSelect/CharacterSelect';
import { COLORS } from "@/theme/colors";

const MainScreen = ({
    model,
    endpoints,
}: {
    model: Partial<Model> | undefined;
    endpoints: Partial<Record<EndpointName, EndpointStatus>> | undefined;
}) => {

    const handleLoading = () => {
        for (const key in endpoints) {
            if (endpoints[key as EndpointName]?.loading) {
                return true;
            }
        }
        return false;
    };

    return (
        <SnackbarProvider
            autoHideDuration={5000}
            maxSnack={3}
            dense
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <CharacterSelect />
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        'xs': "1fr",
                        'md': "1fr 1fr"
                    },
                    gap: 2,
                    padding: 2,
                    alignItems: 'stretch',
                    height: '100%', 
                    boxSizing: 'border-box',
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
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        height: '100%', 
                        padding: 2,
                        borderRadius: 2,
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
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        height: '100%', 
                        padding: 2,
                        borderRadius: 2,
                        justifyContent: 'center',
                        minWidth: 0,
                        maxWidth: 700
                    }}
                >
                    {handleLoading() ? (
                        <Loading />
                    ) : (
                        <ItemSection headgearData={model?.headgearData} garmentData={model?.garmentData} />
                    )}
                </Paper>
            </Box>
        </SnackbarProvider>
    )
};

export default MainScreen;
