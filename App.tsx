import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import getDailyQuote from './src/getDailyQuote';
import theme from './src/theme';

function formatToday(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export default function App() {
  const today = useMemo(() => new Date(), []);
  const quote = useMemo(() => getDailyQuote(today), [today]);

  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 900,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(rise, {
        toValue: 0,
        duration: 900,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [fade, rise]);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>QUOTE OF THE DAY</Text>
          <Text style={styles.date}>{formatToday(today)}</Text>
        </View>

        <Animated.View
          style={[
            styles.card,
            { opacity: fade, transform: [{ translateY: rise }] },
          ]}
        >
          <Text style={styles.mark}>“</Text>
          <Text style={styles.quote}>{quote.text}</Text>
          <View style={styles.divider} />
          <Text style={styles.author}>{quote.author}</Text>
        </Animated.View>

        <View style={styles.footer}>
          <View style={styles.dot} />
          <Text style={styles.footerText}>A new quote every day</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safe: {
    flex: 1,
    paddingHorizontal: theme.spacing(3),
    justifyContent: 'space-between',
  },
  header: {
    marginTop: theme.spacing(5),
    alignItems: 'center',
  },
  eyebrow: {
    color: theme.colors.accent,
    fontSize: 12,
    letterSpacing: 4,
    fontWeight: '600',
  },
  date: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    marginTop: theme.spacing(1),
    letterSpacing: 0.4,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.surfaceBorder,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing(3.5),
    paddingVertical: theme.spacing(5),
    marginVertical: theme.spacing(3),
  },
  mark: {
    color: theme.colors.accentSoft,
    fontSize: 96,
    lineHeight: 96,
    height: 64,
    fontWeight: '700',
    marginBottom: theme.spacing(1),
  },
  quote: {
    color: theme.colors.textPrimary,
    fontSize: 27,
    lineHeight: 38,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.pill,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  author: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.accent,
    marginRight: theme.spacing(1),
  },
  footerText: {
    color: theme.colors.textMuted,
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
