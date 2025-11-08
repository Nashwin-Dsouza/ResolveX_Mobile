import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../constants/colors";

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(220, 25%, 97%)', // Match overall app background
  },
  // ... inside StyleSheet.create({ ...
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // Make sure these colors are from your new constants file
    backgroundColor: COLORS.card, // Or 'hsl(220, 15%, 94%)' (muted)
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border, // 'hsl(220, 15%, 88%)'
    paddingHorizontal: 15,
    height: 56,
  },
// ...
  topSection: {
    height: height * 0.35, // Take up about 35% of the screen height
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  gradientBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  resolveXContainer: {
    zIndex: 1,
    alignItems: 'center',
  },
  resolveXTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 1,
  },
  resolveXSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },

  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24, // --radius
    marginHorizontal: 24,
    padding: 30,
    marginTop: -50, // Overlap with the top section
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 15,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.foreground,
    textAlign: 'center',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: COLORS.mutedForeground,
    textAlign: 'center',
    marginBottom: 30,
  },

  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.foreground,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 15,
    height: 56,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.foreground,
    height: '100%',
  },
  passwordToggle: {
    paddingLeft: 10,
  },

  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
  },
  loginButtonGradient: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },

  signupTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  signupText: {
    fontSize: 14,
    color: COLORS.mutedForeground,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default styles;