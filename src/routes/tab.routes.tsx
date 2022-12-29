import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PlantSelect } from "../screens/PlantSelect";
import { MyPlants } from "../screens/MyPlants";

import colors from "../styles/colors";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.heading,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="Nova Planta"
        component={PlantSelect}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Minhas Plantas"
        component={MyPlants}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthRoutes;
