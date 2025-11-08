// components/ComplaintCard.js
import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { formatPublishDate } from "../lib/utils"; // Assuming utils is in lib

const ComplaintCard = ({ complaint }) => {
  const statusConfig = {
    Pending: {
      colors: ["hsl(40, 95%, 55%)", "hsl(30, 95%, 50%)"], // Warning to Orange
      text: "hsl(24, 95%, 30%)",
      label: "Pending",
      icon: "hourglass-outline",
    },
    Resolved: {
      colors: ["hsl(150, 70%, 50%)", "hsl(160, 70%, 40%)"], // Success to Teal
      text: "hsl(150, 100%, 20%)",
      label: "Resolved",
      icon: "checkmark-circle-outline",
    },
    "In Progress": {
      colors: ["hsl(210, 95%, 58%)", "hsl(200, 95%, 50%)"], // Info to Blue
      text: "hsl(210, 100%, 25%)",
      label: "In Progress",
      icon: "sync-outline",
    },
  };

  const config = statusConfig[complaint.status] || statusConfig.Pending;
  const title =
    complaint.user?.username
      ? `${complaint.user.username} raised a complaint`
      : "Complaint";

  return (
    <Link href={`/complaint/${complaint._id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {/* Status Badge */}
            <LinearGradient colors={config.colors} style={styles.badge}>
              <Ionicons
                name={config.icon}
                size={12}
                color={COLORS.white}
                style={{ marginRight: 4 }}
              />
              <Text style={styles.badgeText}>{config.label}</Text>
            </LinearGradient>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailText} numberOfLines={1}>
              <Text style={styles.detailLabel}>Cause:</Text> {complaint.cause}
            </Text>
            <Text style={styles.detailText} numberOfLines={1}>
              <Text style={styles.detailLabel}>Impact:</Text> {complaint.impact}
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateContainer}>
              <Ionicons
                name="calendar-outline"
                size={14}
                color={COLORS.mutedForeground}
              />
              <Text style={styles.dateText}>
                {formatPublishDate(complaint.createdAt)}
              </Text>
            </View>
          </View>
        </View>

        {/* Tap to see full details footer */}
        <LinearGradient
          colors={["hsla(195, 85%, 50%, 0.05)", "hsla(280, 70%, 60%, 0.05)"]}
          style={styles.cardFooter}
        >
          <Text style={styles.footerText}>Tap to see full details →</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Link>
  );
};

// Styles for this component
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24, // --radius
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.foreground,
    flex: 1,
    marginRight: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.mutedForeground,
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: "600",
    color: COLORS.foreground,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "hsl(220, 15%, 94%)", // muted
    borderRadius: 20,
  },
  dateText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.mutedForeground,
  },
  cardFooter: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.primary,
  },
});

export default ComplaintCard;