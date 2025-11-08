// app/complaint/[id].jsx

import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  useWindowDimensions, // <-- 1. Import hook
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";
import styles from "../../assets/styles/complaint-detail.styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image"; // Keep this for the user avatar
import { formatPublishDate } from "../../lib/utils";
import COLORS from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import RenderHTML from "react-native-render-html"; // <-- 2. Import RenderHTML

export default function ComplaintDetail() {
  const { id } = useLocalSearchParams();
  const { token } = useAuthStore();
  const router = useRouter();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions(); // <-- 3. Call hook at top level

  // --- This data-fetching logic is the same ---
  useEffect(() => {
    const fetchComplaintDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/v1/complaints/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setComplaint(data);
      } catch (error) {
        Alert.alert("Error", "Could not load complaint details.");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaintDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  if (!complaint) {
    return (
      <Text style={{ textAlign: "center", marginTop: 50 }}>
        Complaint not found.
      </Text>
    );
  }

  // --- This is the NEW, CORRECTED UI ---
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: complaint.user.username,
          headerTransparent: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
          headerBackTitle: "Back",
        }}
      />

      <View style={styles.content}>
        {/* Info Card with Icons (To/From/Subject) */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <LinearGradient
              colors={["hsla(195, 85%, 50%, 0.2)", "hsla(280, 70%, 60%, 0.2)"]}
              style={styles.infoIconContainer}
            >
              <Ionicons
                name="document-text-outline"
                size={20}
                color={COLORS.primary}
              />
            </LinearGradient>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>To</Text>
              <Text style={styles.infoValue}>{complaint.department_name}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <LinearGradient
              colors={["hsla(340, 75%, 55%, 0.2)", "hsla(280, 70%, 60%, 0.2)"]}
              style={styles.infoIconContainer}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.secondary}
              />
            </LinearGradient>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>From</Text>
              <Text style={styles.infoValue}>{complaint.user.username}</Text>
            </View>
          </View>

          <View style={[styles.infoRow, { marginBottom: 0 }]}>
            <LinearGradient
              colors={["hsla(280, 70%, 60%, 0.2)", "hsla(195, 85%, 50%, 0.2)"]}
              style={styles.infoIconContainer}
            >
              <Ionicons
                name="alert-circle-outline"
                size={20}
                color={COLORS.accent}
              />
            </LinearGradient>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Subject</Text>
              <Text style={styles.infoValue}>
                {complaint.classified_intent}
              </Text>
            </View>
          </View>
        </View>

        {/* --- 4. THIS IS THE CORRECTED "EMAIL BODY" CARD --- */}
        <View style={styles.detailsCard}>
          <RenderHTML
            contentWidth={width - 74}
            source={{ html: complaint.emailBody }}
            renderersProps={{
              img: {
                enableExperimentalPercentWidth: true,
              },
            }}
            defaultTextProps={{ selectable: true }}
            tagsStyles={{
              p: {
                color: COLORS.foreground,
                fontSize: 15,
                lineHeight: 22,
                marginBottom: 10,
              },
              h3: {
                color: COLORS.primary,
                fontSize: 18,
                fontWeight: "900",
                marginBottom: 5,
                marginTop: 10,
              },
              img: {
                width: "100%",
                height: "auto",
                borderRadius: 10,
                marginTop: 8,
                resizeMode: "contain",
              },
              hr: {
                marginVertical: 15,
                borderColor: COLORS.border,
                borderTopWidth: 1,
              },
            }}
          />
        </View>

        {/* Filed Date */}
        <View style={styles.filedDateContainer}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={COLORS.mutedForeground}
          />
          <Text style={styles.filedDateText}>
            Filed on {formatPublishDate(complaint.createdAt)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
