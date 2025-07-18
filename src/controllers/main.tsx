'use client';

import { useEffect, useState } from "react";
import HeadgearToModel, { HeadgearModel } from "@/models/get-headgear";
import GarmentToModel, { GarmentModel } from "@/models/get-garment";

import GetHeadgears from "@/services/get-headgear";
import GetGarments from "@/services/get-garment";
import PostRender from "@/services/post-render";

import MainScreen from "@/screens/MainScreen";
import { useStore } from "@/store/useStore";

export interface EndpointStatus {
    loading: boolean;
    error: boolean;
};

export type EndpointName = "getHeadgearData" | "getGarmentData" | "postRenderData";

export interface Model {
    headgearData: HeadgearModel[] | undefined;
    garmentData: GarmentModel[] | undefined;
    lastUpdate: Date | undefined;
};

const MainController = () => {

    const [model, setModel] = useState<Partial<Model>>();
    const [endpoints, setEndpoints] = useState<Partial<Record<EndpointName, EndpointStatus>>>();

    const character = useStore((x) => x.character);
    const setCharacterUrl = useStore((x) => x.update_char_url);

    useEffect(() => {
        loadHeadgearData();
        loadGarmentData();
        postRenderData();
    }, []);

    const updateModel = (partialModel: | Partial<Model> | ((model: Partial<Model> | undefined) => Partial<Model>)) => {
        setModel((prev) => {
            const newModel = typeof partialModel === "function" ? partialModel(prev) : partialModel;
            return {
                ...prev,
                lastUpdate: new Date(),
                ...newModel,
            };
        });
    };

    const setEndpointStatus = (
        endpoint: EndpointName,
        status: Partial<EndpointStatus>
    ) => {
        setEndpoints((prev) => ({
            ...prev,
            [endpoint]: { ...prev?.[endpoint], ...status },
        }));
    };

    const buildStatusEndpoint = (name: EndpointName) => ({
        loading() {
            setEndpointStatus(name, {
                loading: true,
                error: false,
            });
        },
        error() {
            setEndpointStatus(name, {
                loading: false,
                error: true,
            });
        },
        done() {
            setEndpointStatus(name, { loading: false });
        },
    });

    const loadHeadgearData = async () => {
        const statusEndpoint = buildStatusEndpoint("getHeadgearData");
        try {
            statusEndpoint.loading();
            const response = await GetHeadgears();
            const headgearData = response !== null ? HeadgearToModel(response) : undefined;
            updateModel({ headgearData });
        } catch {
            statusEndpoint.error();
            updateModel({ headgearData: undefined });
        } finally {
            statusEndpoint.done();
        }
    };

    const loadGarmentData = async () => {
        const statusEndpoint = buildStatusEndpoint("getGarmentData");
        try {
            statusEndpoint.loading();
            const response = await GetGarments();
            const garmentData = response !== null ? GarmentToModel(response) : undefined;
            updateModel({ garmentData });
        } catch {
            statusEndpoint.error();
            updateModel({ garmentData: undefined });
        } finally {
            statusEndpoint.done();
        }
    };

    const postRenderData = async () => {
        const statusEndpoint = buildStatusEndpoint("postRenderData");
        try {
            statusEndpoint.loading();
            const response = await PostRender(character);
            setCharacterUrl(response);
        } catch {
            statusEndpoint.error();
            setCharacterUrl(null);
        } finally {
            statusEndpoint.done();
        }
    };

    return (
        <MainScreen
            model={model}
            endpoints={endpoints}
        />
    );

};

export default MainController;
