import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate("Home")}>
        <Image source={require("../assets/Home.png")} style={styles.sidebarIcon} />
        <Text style={styles.sidebarText}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate("MapaBiomas")}>
        <Image source={require("../assets/folha.jpeg")} style={styles.sidebarIcon} />
        <Text style={styles.sidebarText}>Jogue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate("Notificacoes")}>
        <Image source={require("../assets/NavNotificação.png")} style={styles.sidebarIcon} />
        <Text style={styles.sidebarText}>Ranking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate("Menu")}>
        <Image source={require("../assets/Menu.png")} style={styles.sidebarIcon} />
        <Text style={styles.sidebarText}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 80,
    backgroundColor: "#166b21ff",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    elevation: 10,
    zIndex: 99,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  sidebarItem: {
    alignItems: "center",
    marginVertical: 20,
  },
  sidebarIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  sidebarText: {
    fontSize: 10,
    color: "white",
    marginTop: 4,
  },
});

export default NavBar;
