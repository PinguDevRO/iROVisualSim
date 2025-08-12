import { AxiosGet, AxiosResponse } from "./utils";

export interface GetHeadgearItemList {
    item_id: number;
    name: string;
};
export interface GetHeadgearResponse {
    accessory_id: number;
    location: number;
    items: GetHeadgearItemList[];
};

const GetHeadgears = async (): Promise<GetHeadgearResponse[] |  null> => {
    const url = process.env.NEXT_PUBLIC_IROWIKI_HEADGEAR_METADATA_URL ? process.env.NEXT_PUBLIC_IROWIKI_HEADGEAR_METADATA_URL : "";
    const response: AxiosResponse<GetHeadgearResponse[] | null> = await AxiosGet(`${url}?cache_bust=${Date.now()}`);
    if(response.status === 200){
        return response.data;
    }
    return null;
};

export default GetHeadgears;
