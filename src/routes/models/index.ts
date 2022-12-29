import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type propsNavigationStack = {
  Welcome: undefined;
  UserIdentification: undefined;
  Confirmation: {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: "smile" | "hug";
    nextScreen: string;
  };
  PlantSelect: undefined;
  PlantSave: {
    plant: {
      id: string;
      name: string;
      about: string;
      water_tips: string;
      photo: string;
      environments: [string];
      frequency: {
        times: number;
        repeat_every: string;
      };
      hour: string;
      dateTimeNotification: Date;
    };
  };
  MyPlants: undefined;
};

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
