import Image from 'next/image';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { HeadgearItemList } from '@/models/get-headgear';
import { GarmentItemList } from '@/models/get-garment';
import { COLORS } from '@/theme/colors';


const ItemTooltip = ({
    itemList
}: {
    itemList: HeadgearItemList[] | GarmentItemList[];
}) => {
    return itemList.length > 0 ? (
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
            title={
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    {itemList.map((x) => (
                        <span
                            key={`tooltip-text--${x.name}-${x.itemId}`}
                        >
                            {x.name} (ID: {x.itemId})
                        </span>
                    ))}
                </Box>
            }
        >
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={30} height={30}>
                <Image
                    src={`https://db.irowiki.org/image/item/${itemList[0].itemId}.png`}
                    alt={itemList[0].name}
                    width={24}
                    height={24}
                    draggable={false}
                    loading="lazy"
                />
            </Box>
        </Tooltip>
    ) : (
        <></>
    )
};

export default ItemTooltip;
