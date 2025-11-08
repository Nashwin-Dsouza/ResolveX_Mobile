// assets/styles/profile.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(220, 25%, 97%)', // --background
  },

  // --- Profile Card ---
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24, // --radius
    margin: 16,
    marginTop: 40,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 20,
  },
  profileBg: {
    height: 128, // h-32
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  profileContent: {
    padding: 24,
    marginTop: -64, // -mt-16
  },
  avatarContainer: {
    width: 96, // w-24
    height: 96, // h-24
    borderRadius: 48,
    borderWidth: 4,
    borderColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 16,
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 36,
    fontWeight: '900',
  },
  profileTextContainer: {
    marginBottom: 24,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.foreground,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.mutedForeground,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'hsla(195, 85%, 50%, 0.05)',
    borderWidth: 1,
    borderColor: 'hsla(195, 85%, 50%, 0.2)',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.mutedForeground,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  // --- Complaints List ---
  complaintsContainer: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 100,
  },
  complaintsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  complaintsTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.foreground,
  },
  countBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  countText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  complaintCard: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  complaintCardLeft: {
    flex: 1,
    marginRight: 10,
  },
  complaintCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.foreground,
    marginBottom: 2,
  },
  complaintCardDept: {
    fontSize: 14,
    color: COLORS.mutedForeground,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.mutedForeground,
    marginTop: 20,
  }
});

export default styles;