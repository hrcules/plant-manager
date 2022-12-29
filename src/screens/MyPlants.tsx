import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";

import { Header } from "../components/Header";
import { PlantCardSecundary } from "../components/PlantCardSecundary";
import { Load } from "../components/Load";

import waterDrop from "../assets/waterdrop.png";

import fonts from "../styles/fonts";
import colors from "../styles/colors";

import { PlantProps, loadPlant, removePlant } from "../libs/storage";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../routes/models";

export function MyPlants() {
  const navigation = useNavigation<propsStack>();

  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRegisterPlant() {
    navigation.navigate("PlantSelect");
  }

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        style: "cancel",
      },
      {
        text: "Sim ☹️",
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Não foi possível remover! 😔");
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();

      if (plantsStoraged.length === 0) {
        setMyPlants([]);
        setLoading(false);
      } else {
        const nextTime = formatDistance(
          new Date(plantsStoraged[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          { locale: pt }
        );

        setNextWatered(
          `Não esqueça de regar a ${plantsStoraged[0].name} à aproximadamente ${nextTime}`
        );

        setMyPlants(plantsStoraged);
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <Header salutation="Minhas" title="Plantinhas" />

      {myPlants.length === 0 ? (
        <View style={styles.content}>
          <Text style={styles.emoji}>🥰</Text>
          <Text style={styles.registrationText}>
            Que tal cadastrar suas plantinhas para cuidarmos delas?
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.spotlight}>
            <Image source={waterDrop} style={styles.spotlightImage} />
            <Text style={styles.spotlightText}>{nextWatered}</Text>
          </View>

          <View style={styles.plants}>
            <Text style={styles.plantsTitle}>Próximas regadas</Text>

            <FlatList
              data={myPlants}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <PlantCardSecundary
                  data={item}
                  handleRemove={() => handleRemove(item)}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flex: 1 }}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: "justify",
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 30,
  },
  registrationText: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 15,
    color: colors.heading,
  },
  emoji: {
    fontSize: 85,
  },
  footer: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 50,
  },
});
