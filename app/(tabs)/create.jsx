import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/create.styles"; // Use the new stylesheet
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { API_URL } from "../../constants/api";
import { LinearGradient } from "expo-linear-gradient";

export default function Create() {
  const [complaint, setComplaint] = useState("");
  const [cause, setCause] = useState("");
  const [impact, setImpact] = useState("");
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const router = useRouter();
  const { token } = useAuthStore();

  const handleGetLocation = async () => {
    setLocationLoading(true);
    Alert.alert("Getting Location", "Fetching your current location...");
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "We need location access.");
        setLocationLoading(false);
        return;
      }
      let locationData = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });

      if (geocode && geocode.length > 0) {
        const address = `${geocode[0].name}, ${geocode[0].city}`;
        const coords = {
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude
        };
        setLocation(address); // <-- This saves just the string
        Alert.alert("Location Found", address);
      }
    } catch (error) {
      Alert.alert("Error", "Could not fetch location.");
    } finally {
      setLocationLoading(false);
    }
  };

  // --- THIS IS THE LOGIC THAT WAS MISSING ---

  const selectImage = () => {
    Alert.alert("Upload Photo", "Choose an option", [
      { text: "Take Photo...", onPress: () => takePhotoWithCamera() },
      { text: "Choose from Gallery...", onPress: () => pickImageFromGallery() },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const pickImageFromGallery = async () => {
    try {
      let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setImageBase64(base64);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "There was a problem selecting your image");
    }
  };

  const takePhotoWithCamera = async () => {
    try {
      let { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "We need camera permissions");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setImageBase64(base64);
        }
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "There was a problem taking your photo");
    }
  };
  
  // --- END OF MISSING LOGIC ---

  const handleSubmit = async () => {
    if (!complaint || !cause || !impact || !imageBase64) {
      Alert.alert("Error", "Please fill in all fields and upload a proof image.");
      return;
    }
    setLoading(true);
    try {
      let imageDataUrl = `data:image/jpeg;base64,${imageBase64}`;
      const response = await fetch(`${API_URL}/v1/complaints`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          description: complaint,
          cause: cause,
          impact: impact,
          location: location, // <-- This sends just the string
          proofImage: imageDataUrl,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      Alert.alert("Success", "Your complaint has been submitted!");
      setComplaint(""); setCause(""); setImpact(""); setLocation(null); setImage(null); setImageBase64(null);
      router.push("/profile");
    } catch (error) {
      console.error("Error creating complaint:", error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // --- This is the NEW UI, translated from your web code ---
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Stunning Header */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.accent, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Add Complaint</Text>
              <Text style={styles.headerSubtitle}>Help us understand the issue</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Beautiful Form */}
        <View style={styles.formContainer}>
          {/* Your Complaint */}
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <LinearGradient colors={[COLORS.primary, COLORS.accent]} style={styles.labelDot} />
              <Text style={styles.label}>Your Complaint</Text>
            </View>
            <TextInput
              placeholder="Describe your complaint in detail..."
              placeholderTextColor={COLORS.mutedForeground}
              style={[styles.textInput, styles.textArea]}
              value={complaint}
              onChangeText={setComplaint}
              multiline
            />
          </View>

          {/* What Caused the Problem */}
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <LinearGradient colors={[COLORS.secondary, COLORS.accent]} style={styles.labelDot} />
              <Text style={styles.label}>What Caused the Problem?</Text>
            </View>
            <TextInput
              placeholder="Explain the root cause..."
              placeholderTextColor={COLORS.mutedForeground}
              style={[styles.textInput, styles.textArea]}
              value={cause}
              onChangeText={setCause}
              multiline
            />
          </View>

          {/* How Has This Affected You */}
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <LinearGradient colors={[COLORS.accent, COLORS.primary]} style={styles.labelDot} />
              <Text style={styles.label}>How Has This Affected You?</Text>
            </View>
            <TextInput
              placeholder="Describe the impact on you..."
              placeholderTextColor={COLORS.mutedForeground}
              style={[styles.textInput, styles.textArea]}
              value={impact}
              onChangeText={setImpact}
              multiline
            />
          </View>

          {/* Location Button */}
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <LinearGradient colors={[COLORS.info, COLORS.primary]} style={styles.labelDot} />
              <Text style={styles.label}>Location of Incident</Text>
            </View>
            <TouchableOpacity onPress={handleGetLocation} disabled={locationLoading}>
              <LinearGradient
                colors={['#3b82f6', '#06b6d4']} // blue-500 to cyan-500
                style={styles.button}
              >
                {locationLoading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <>
                    <Ionicons name="location-outline" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
                    <Text style={styles.buttonText}>GET CURRENT LOCATION</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
            {location && (
              <Text style={styles.locationText}>Location: {location.address}</Text>
            )}
          </View>

          {/* Photo Upload */}
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <LinearGradient colors={[COLORS.accent, COLORS.secondary]} style={styles.labelDot} />
              <Text style={styles.label}>Photo for Proof</Text>
            </View>
            {/* The 'onPress' here was missing the 'selectImage' call */}
            <TouchableOpacity onPress={selectImage} style={styles.imagePicker}>
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <View style={styles.imagePickerPlaceholder}>
                  <Ionicons name="cloud-upload-outline" size={40} color={COLORS.primary} />
                  <Text style={styles.imagePickerText}>Tap to upload photo</Text>
                  <Text style={styles.imagePickerSubtext}>PNG, JPG up to 10MB</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity onPress={handleSubmit} disabled={loading} style={{ marginTop: 10, marginBottom: 80 }}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.accent, COLORS.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons name="send-outline" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Submit Complaint</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}