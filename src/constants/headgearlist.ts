export const headgearList = {
    "Upper": [0, 3, 4, 6],
    "Middle": [1, 3, 5, 6],
    "Lower": [2, 4, 5, 6],
};

export const headgearTranslation: { [key: number]: string } = {
    0: "Upper",
    1: "Middle",
    2: "Lower",
    3: "Upper/Middle",
    4: "Upper/Lower",
    5: "Middle/Lower",
    6: "Upper/Middle/Lower",
    7: "Garment",
};

export const GetHeadgearLocation = (location: number): string => {
    if (location in headgearTranslation){
        return headgearTranslation[location];
    }
    return "Unknown";
};
