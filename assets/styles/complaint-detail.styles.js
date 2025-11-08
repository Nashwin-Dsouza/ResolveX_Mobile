// assets/styles/complaint-detail.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(220, 25%, 97%)', // --background
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  
  // --- Info Card ---
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24, // --radius
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.mutedForeground,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.foreground,
    marginTop: 2,
  },
  
  // --- Details Card ---
  detailsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 20,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary, // Using gradient-from-primary
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 15,
    color: COLORS.foreground,
    lineHeight: 22,
    marginBottom: 20,
  },
  highlightBox: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  highlightLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  highlightValue: {
    fontSize: 14,
    marginTop: 2,
  },
  // Cause box
  causeBox: {
    backgroundColor: 'hsl(40, 95%, 95%)', // from-amber-50
    borderColor: 'hsla(35, 90%, 80%, 0.5)', // border-amber-200/50
  },
  causeLabel: {
    color: 'hsl(30, 80%, 30%)', // text-amber-900
  },
  causeValue: {
    color: 'hsl(30, 70%, 25%)', // text-amber-800
  },
  // Impact box
  impactBox: {
    backgroundColor: 'hsl(340, 100%, 97%)', // from-rose-50
    borderColor: 'hsla(340, 80%, 85%, 0.5)', // border-rose-200/50
  },
  impactLabel: {
    color: 'hsl(340, 70%, 30%)', // text-rose-900
  },
  impactValue: {
    color: 'hsl(340, 60%, 25%)', // text-rose-800
  },
  
  // --- Attachments ---
  attachmentsHeader: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.foreground,
    marginBottom: 16,
  },
  attachmentCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  attachmentIconContainer: {
    width: 64, // w-20
    height: 64, // h-20
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachmentInfo: {
    flex: 1,
  },
  attachmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.foreground,
    marginBottom: 4,
  },
  attachmentImage: {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: 10,
    marginTop: 8,
  },

  // --- Filed Date ---
  filedDateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filedDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.mutedForeground,
    marginLeft: 8,
  },
});

export default styles;