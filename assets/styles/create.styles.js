// assets/styles/create.styles.js

import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const newStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(220, 25%, 97%)', // --background
  },
  // --- Header ---
  headerContainer: {
    borderBottomLeftRadius: 32, // rounded-b-[3rem] is ~32
    borderBottomRightRadius: 32,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 20,
    overflow: 'hidden',
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    paddingTop: 60, // Add space for status bar
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '900', // 'font-black'
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  
  // --- Form ---
  formContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  formGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.foreground,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 16, // rounded-2xl
    padding: 12,
    fontSize: 15,
    color: COLORS.foreground,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top', // For Android
  },
  
  // --- Location ---
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18, // py-6
    borderRadius: 16, // rounded-2xl
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationText: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.mutedForeground,
    textAlign: 'center',
  },
  
  // --- Image Picker ---
  imagePicker: {
    borderWidth: 2,
    borderColor: 'hsla(195, 85%, 50%, 0.3)', // border-primary/30
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerPlaceholder: {
    alignItems: 'center',
  },
  imagePickerText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.foreground,
  },
  imagePickerSubtext: {
    fontSize: 12,
    color: COLORS.mutedForeground,
    marginTop: 4,
  },
  previewImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});

export default newStyles;