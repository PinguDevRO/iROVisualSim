import Image from 'next/image';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { COLORS } from '@/theme/colors';


const ItemTooltip = ({
    itemId,
    itemName,
}: {
    itemId: number;
    itemName: string;
}) => {
    return (
        <Tooltip
            followCursor
            slotProps={{
                tooltip: {
                    sx: {
                        color: COLORS.primary_background_text,
                        backgroundColor: COLORS.primary_background,
                        borderRadius: 2,
                    },
                },
            }}
            title={itemName}
        >
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={30} height={30}>
                <Image
                    src={`https://db.irowiki.org/image/item/${itemId}.png`}
                    alt={itemName}
                    width={24}
                    height={24}
                    draggable={false}
                    loading="lazy"
                />
            </Box>
        </Tooltip>
    )
};

export default ItemTooltip;
