import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

export interface AppBottomSheetProps {
  /** Controls whether the sheet is visible */
  isOpen: boolean;
  /** Called when the sheet is dismissed (drag down / backdrop tap) */
  onClose: () => void;
  /** Snap points – defaults to ['40%', '80%'] */
  snapPoints?: (string | number)[];
  /** Starting snap index – defaults to 0 */
  initialSnapIndex?: number;
  /** Optional title rendered in the handle area */
  title?: string;
  /** Content rendered inside the sheet */
  children?: React.ReactNode;
}

export interface AppBottomSheetRef {
  expand: () => void;
  collapse: () => void;
  close: () => void;
  snapToIndex: (index: number) => void;
}

const AppBottomSheet = React.forwardRef<AppBottomSheetRef, AppBottomSheetProps>(
  (
    {
      isOpen,
      onClose,
      snapPoints: snapPointsProp,
      initialSnapIndex = 0,
      title,
      children,
    },
    ref,
  ) => {
    const sheetRef = useRef<BottomSheet>(null);

    // Expose imperative handle to parent
    React.useImperativeHandle(ref, () => ({
      expand: () => sheetRef.current?.expand(),
      collapse: () => sheetRef.current?.collapse(),
      close: () => sheetRef.current?.close(),
      snapToIndex: (index: number) => sheetRef.current?.snapToIndex(index),
    }));

    const snapPoints = useMemo(
      () => snapPointsProp ?? ['40%', '80%'],
      [snapPointsProp],
    );

    // Open / close reactively when `isOpen` changes
    React.useEffect(() => {
      if (isOpen) {
        sheetRef.current?.snapToIndex(initialSnapIndex);
      } else {
        sheetRef.current?.close();
      }
    }, [isOpen, initialSnapIndex]);

    const handleSheetChange = useCallback(
      (index: number) => {
        if (index === -1) onClose();
      },
      [onClose],
    );

    // Dimmed backdrop with fade + press-to-close
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.45}
          pressBehavior="close"
        />
      ),
      [],
    );

    // Custom drag handle
    const renderHandle = useCallback(
      () => (
        <View style={styles.handleContainer}>
          <View style={styles.pill} />
          {title ? <Text style={styles.title}>{title}</Text> : null}
        </View>
      ),
      [title],
    );

    return (
      <BottomSheet
        ref={sheetRef}
        index={-1} // start closed; controlled via snapToIndex / close
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChange}
        backdropComponent={renderBackdrop}
        handleComponent={renderHandle}
        backgroundStyle={styles.background}
        style={styles.sheet}
      >
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

AppBottomSheet.displayName = 'AppBottomSheet';

export default AppBottomSheet;

const styles = StyleSheet.create({
  sheet: {
    // Subtle shadow on iOS; elevation on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 16,
  },
  background: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  pill: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB', // neutral-300
    marginBottom: 4,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827', // gray-900
    letterSpacing: -0.2,
    alignSelf: 'flex-start',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
  },
});