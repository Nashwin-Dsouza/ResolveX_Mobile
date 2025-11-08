// assets/styles/home.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(220, 25%, 97%)', // --background
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  
  // --- New Header ---
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "900", // 'font-black'
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.mutedForeground,
    textAlign: "center",
    marginBottom: 24,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.foreground,
  },
  filterButton: {
    padding: 8,
    backgroundColor: 'hsla(195, 85%, 50%, 0.1)', // primary/10
    borderRadius: 30,
  },

  // --- List States ---
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.foreground,
    marginTop: 16,
    marginBottom: 8,
  },
  footerLoader: {
    marginVertical: 20,
  },
});

export default styles;