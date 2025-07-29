import { useMemo } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import Box from '@mui/material/Box';
import ItemTooltip from '../ItemTooltip/ItemTooltip';
import { HeadgearModel } from '@/models/get-headgear';
import { headgearList } from '@/constants/headgearlist';
import { useStore } from '@/store/useStore';

const HeadgearUpperTable = ({
    headgearData,
    queryFilter,
}: {
    headgearData: HeadgearModel[] | undefined;
    queryFilter: string;
}) => {
    const selectedUpper = useStore((x) => x.headgear_upper);
    const setSelectedHeadgear = useStore((x) => x.update_char_headgear);

    const filterValues = headgearList["Upper"];
    const filteredData = useMemo(() => {
        if (!headgearData) return [];

        if (!queryFilter) {
            return headgearData.filter((x) => filterValues.includes(x.location));
        }

        return headgearData.filter(
            (x) =>
                filterValues.includes(x.location) &&
                x.items.some((y) =>
                    y.name.toLowerCase().includes(queryFilter.toLowerCase())
                )
        );
    }, [headgearData, queryFilter, filterValues]);

    return (
        <VirtuosoGrid
            style={{ height: 550, width: '100%' }}
            totalCount={filteredData.length}
            listClassName="virtuoso-grid-list"
            itemContent={(index) => {
                const x = filteredData[index];
                return (
                    <Box
                        key={`headgear-upper-${x.accessoryId}-${index}`}
                        onClick={() => setSelectedHeadgear(x)}
                        sx={{
                            width: 40,
                            height: 40,
                            boxSizing: 'border-box',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: selectedUpper?.accessoryId === x.accessoryId && selectedUpper?.location === x.location ? '#fff495' : 'inherit',
                            border: '1px solid #b8c4dc',
                            borderRadius: 1,
                            '&:hover': {
                                border: '1px solid #515789',
                            },
                        }}
                    >
                        <ItemTooltip accessoryId={x.accessoryId} location={x.location} itemList={x.items} />
                    </Box>
                );
            }}
        />
    )
};

export default HeadgearUpperTable;
