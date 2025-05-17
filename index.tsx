import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import Colors from "@/constants/colors";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>FitTrack</Text>
          <Text style={styles.subtitle}>Your personal fitness journey starts here</Text>
        </View>

        <Image
          source={{ uri: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" }}
          style={styles.image}
        />

        <View style={styles.features}>
          <FeatureItem title="Personalized Workout Plans" />
          <FeatureItem title="Nutrition Guidance" />
          <FeatureItem title="Progress Tracking" />
        </View>

        <View style={styles.buttons}>
          <Button
            title="Log In"
            onPress={() => router.push("/login")}
            style={styles.button}
          />
          <Button
            title="Sign Up"
            onPress={() => router.push("/signup")}
            variant="outline"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function FeatureItem({ title }: { title: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureDot} />
      <Text style={styles.featureText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.subtext,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 16,
    marginVertical: 32,
  },
  features: {
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.primary,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  buttons: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 16,
  },
});
