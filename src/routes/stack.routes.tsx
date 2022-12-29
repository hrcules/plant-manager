import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import colors from "../styles/colors";
import { Welcome } from "../screens/Welcome";
import { UserIdentification } from "../screens/UserIdentification";
import { Confirmation } from "../screens/Confirmation";

import { propsNavigationStack } from "./models";
import AuthRoutes from "./tab.routes";
import { PlantSave } from "../screens/PlantSave";

const stackRoutes = createNativeStackNavigator<propsNavigationStack>();

const AppRoutes: React.FC = () => {
  return (
    <stackRoutes.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <stackRoutes.Screen name="Welcome" component={Welcome} />
      <stackRoutes.Screen
        name="UserIdentification"
        component={UserIdentification}
      />

      <stackRoutes.Screen name="Confirmation" component={Confirmation} />

      <stackRoutes.Screen name="PlantSelect" component={AuthRoutes} />

      <stackRoutes.Screen name="PlantSave" component={PlantSave} />

      <stackRoutes.Screen name="MyPlants" component={AuthRoutes} />
    </stackRoutes.Navigator>
  );
};

export default AppRoutes;
