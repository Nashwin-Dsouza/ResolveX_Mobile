// app/(tabs)/profile.js
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { Image } from 'expo-image';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Stack, useRouter, Link } from 'expo-router';
import styles from '../../assets/styles/profile.styles'; // We'll create this
import { API_URL } from '../../constants/api';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../constants/colors';

// Helper for formatting "Member Since"
const formatJoinDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export default function Profile() {
  const { token, user, logout } = useAuthStore();
  const router = useRouter();

  const [stats, setStats] = useState({ memberSince: '', totalIssues: 0 });
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      // Fetch stats and complaints in parallel
      const [statsResponse, complaintsResponse] = await Promise.all([
        fetch(`${API_URL}/v1/users/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/v1/complaints/user?page=1&limit=5`, { // Just get the latest 5
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const statsData = await statsResponse.json();
      const complaintsData = await complaintsResponse.json();

      if (statsResponse.ok) {
        setStats(statsData);
      }
      if (complaintsResponse.ok) {
        setComplaints(complaintsData.complaints);
      }
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    // You might need to adjust this navigation depending on your auth flow
  };

  // --- New RenderItem for the small summary card ---
  const renderItem = ({ item }) => (
    <Link href={`/complaint/${item._id}`} asChild>
      <TouchableOpacity style={styles.complaintCard}>
        <View style={styles.complaintCardLeft}>
          <Text style={styles.complaintCardTitle} numberOfLines={1}>
            {item.user.username}
          </Text>
          <Text style={styles.complaintCardDept} numberOfLines={1}>
            {item.department_name}
          </Text>
        </View>
        <View style={[
          styles.statusBadge,
          {
            backgroundColor: item.status === "Pending" 
              ? 'hsla(40, 95%, 55%, 0.2)' 
              : 'hsla(150, 70%, 50%, 0.2)',
            borderColor: item.status === "Pending"
              ? 'hsl(40, 95%, 55%)'
              : 'hsl(150, 70%, 50%)'
          }
        ]}>
          <Text style={[
            styles.statusText,
            {
              color: item.status === "Pending" 
                ? 'hsl(40, 95%, 35%)' 
                : 'hsl(150, 70%, 30%)'
            }
          ]}>
            {item.status}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Hides the header bar */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* --- Stunning User Profile Card --- */}
      <View style={styles.profileCard}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.accent, COLORS.secondary]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.profileBg}
        />

        <View style={styles.profileContent}>
          <View style={styles.avatarContainer}>
            <LinearGradient 
              colors={[COLORS.primary, COLORS.accent]}
              style={styles.avatarFallback}
            >
              <Text style={styles.avatarText}>
                {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
              </Text>
            </LinearGradient>
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{user?.username}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <View style={styles.statHeader}>
                <Ionicons name="shield-checkmark-outline" size={14} color={COLORS.primary} />
                <Text style={styles.statTitle}>Member Since</Text>
              </View>
              <Text style={styles.statValue}>
                {loading ? '...' : formatJoinDate(stats.memberSince)}
              </Text>
            </View>
            <View style={styles.statBox}>
              <View style={styles.statHeader}>
                <Ionicons name="trending-up-outline" size={14} color={COLORS.secondary} />
                <Text style={styles.statTitle}>Total Issues</Text>
              </View>
              <Text style={styles.statValue}>
                {loading ? '...' : stats.totalIssues}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleLogout}>
            <LinearGradient
              colors={['hsl(150, 70%, 50%)', 'hsl(160, 70%, 40%)']}
              style={styles.logoutButton}
            >
              <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* --- Complaints Section --- */}
      <View style={styles.complaintsContainer}>
        <View style={styles.complaintsHeader}>
          <Text style={styles.complaintsTitle}>Your Submitted Complaints</Text>
          <LinearGradient
            colors={[COLORS.primary, COLORS.accent]}
            style={styles.countBadge}
          >
            <Text style={styles.countText}>{loading ? '...' : stats.totalIssues}</Text>
          </LinearGradient>
        </View>

        {loading ? (
          <ActivityIndicator style={{marginTop: 20}} size="large" color={COLORS.primary} />
        ) : (
          <FlatList
            data={complaints}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            scrollEnabled={false} // List is inside a ScrollView
            ListEmptyComponent={
              <Text style={styles.emptyText}>You haven't submitted any complaints yet.</Text>
            }
          />
        )}
      </View>
    </ScrollView>
  );
}