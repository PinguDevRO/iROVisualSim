import { AxiosGet, AxiosResponse } from "./utils";

export interface GetHeadgearResponse {
    item_id: number;
    accessory_id: number;
    name: string;
    location: number;
}

const GetHeadgears = async (): Promise<GetHeadgearResponse[] |  null> => {
    const url = process.env.NEXT_PUBLIC_IROWIKI_HEADGEAR_METADATA_URL ? process.env.NEXT_PUBLIC_IROWIKI_HEADGEAR_METADATA_URL : "";
    const response: AxiosResponse<GetHeadgearResponse[] | null> = await AxiosGet(url);
    if(response.status === 200){
        return response.data;
    }
    return null;
};

export default GetHeadgears;
