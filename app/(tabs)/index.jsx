// app/(tabs)/index.js
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useAuthStore } from "../../store/authStore";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../../assets/styles/home.styles"; // We still use this for the header
import { API_URL } from "../../constants/api";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import ComplaintCard from "../../components/ComplaintCard"; // <-- 1. IMPORT YOUR NEW CARD

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const { token } = useAuthStore();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // --- All your data-fetching logic is still the same ---
  const fetchComplaints = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) { setRefreshing(true); } 
      else if (pageNum > 1) { setIsFetchingMore(true); } 
      else { setLoading(true); }

      const response = await fetch(
        `${API_URL}/v1/complaints?page=${pageNum}&limit=5`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch complaints");

      const uniqueComplaints =
        refresh || pageNum === 1
          ? data.complaints
          : [...complaints, ...data.complaints].filter(
              (v, i, a) => a.findIndex((t) => t._id === v._id) === i
            );

      setComplaints(uniqueComplaints);
      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.log("Error fetching complaints", error);
    } finally {
      if (refresh) { setRefreshing(false); setLoading(false); } 
      else if (pageNum > 1) { setIsFetchingMore(false); } 
      else { setLoading(false); }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchComplaints(1, true);
    }, [])
  );

  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing && !isFetchingMore) {
      await fetchComplaints(page + 1);
    }
  };
  
  // --- 2. RENDERITEM IS NOW MUCH SIMPLER ---
  const renderItem = ({ item }) => (
    <ComplaintCard complaint={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={complaints}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        // --- 3. UPDATED STYLES & REMOVED numColumns ---
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchComplaints(1, true)}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        // --- 4. THIS IS YOUR NEW HEADER ---
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>ResolveX 💡</Text>
            <Text style={styles.headerSubtitle}>
              Recent complaints from your area
            </Text>
            <View style={styles.headerActions}>
              <Text style={styles.headerTotal}>
                {complaints.length} Submitted Complaints
              </Text>
              <TouchableOpacity style={styles.filterButton}>
                <Ionicons name="filter" size={18} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        }
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
          ) : null
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator style={{ marginTop: 50 }} size="large" color={COLORS.primary} />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="shield-checkmark-outline" size={60} color={COLORS.textSecondary} />
              <Text style={styles.emptyText}>No complaints yet</Text>
            </View>
          )
        }
      />
    </View>
  );
}