import { useMemo } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import Box from '@mui/material/Box';
import ItemTooltip from '../ItemTooltip/ItemTooltip';
import { GarmentModel } from '@/models/get-garment';
import { useStore } from '@/store/useStore';


const GarmentTable = ({
    garmentData,
    queryFilter,
}: {
    garmentData: GarmentModel[] | undefined;
    queryFilter: string;
}) => {
    const selectedGarment = useStore((x) => x.garment);
    const setCharGarment = useStore((x) => x.update_char_garment);

    const filteredData = useMemo(() => {
        if (!garmentData) return [];
        if (!queryFilter) return garmentData;
        return garmentData.filter(x =>
            x.items.some((y) =>
                    y.name.toLowerCase().includes(queryFilter.toLowerCase())
            )
        );
    }, [garmentData, queryFilter]);

    return (
        <VirtuosoGrid
            style={{ height: 500, width: '100%' }}
            totalCount={filteredData.length}
            listClassName="virtuoso-grid-list"
            itemContent={(index) => {
                const x = filteredData[index];
                return (
                    <Box
                        key={`garment-${x.garmentId}-${index}`}
                        onClick={() => setCharGarment(x)}
                        sx={{
                            width: 40,
                            height: 40,
                            boxSizing: 'border-box',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: selectedGarment?.garmentId === x.garmentId ? '#fff495' : 'inherit',
                            border: '1px solid #b8c4dc',
                            borderRadius: 1,
                            '&:hover': {
                                border: '1px solid #515789',
                            },
                        }}
                    >
                        <ItemTooltip itemList={x.items} />
                    </Box>
                );
            }}
        />
    )
};

export default GarmentTable;
