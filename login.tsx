import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useRouter } from "expo-router";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Colors from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading, error } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      Alert.alert("Login Error", error);
    }
  }, [error]);

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      await login(email, password);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to continue your fitness journey</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            error={emailError}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            error={passwordError}
          />

          <Button
            title="Log In"
            onPress={handleLogin}
            isLoading={isLoading}
            style={styles.button}
          />

          <Text style={styles.demoText}>
            Demo credentials: john@example.com / password123
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text
              style={styles.footerLink}
              onPress={() => router.push("/signup")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
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
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.subtext,
  },
  form: {
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
  demoText: {
    marginTop: 16,
    fontSize: 14,
    color: Colors.light.subtext,
    textAlign: "center",
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  footerLink: {
    color: Colors.light.primary,
    fontWeight: "500",
  },
});
