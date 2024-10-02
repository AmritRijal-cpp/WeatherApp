import { useEffect } from 'react';
import { Text, type TextProps, StyleSheet, ActivityIndicator } from 'react-native';
import {
    useFonts,
    NotoSans_100Thin,
    NotoSans_100Thin_Italic,
    NotoSans_200ExtraLight,
    NotoSans_200ExtraLight_Italic,
    NotoSans_300Light,
    NotoSans_300Light_Italic,
    NotoSans_400Regular,
    NotoSans_400Regular_Italic,
    NotoSans_500Medium,
    NotoSans_500Medium_Italic,
    NotoSans_600SemiBold,
    NotoSans_600SemiBold_Italic,
    NotoSans_700Bold,
    NotoSans_700Bold_Italic,
    NotoSans_800ExtraBold,
    NotoSans_800ExtraBold_Italic,
    NotoSans_900Black,
    NotoSans_900Black_Italic,
} from '@expo-google-fonts/noto-sans';


export type ThemedTextProps = TextProps & {
    type?: 'default' | 'bold' | 'thin';
};

export function ThemedText({
    style,
    type = 'default',
    ...rest
}: ThemedTextProps) {

    const [loadedFonts] = useFonts({
        NotoSans_100Thin,
        NotoSans_100Thin_Italic,
        NotoSans_200ExtraLight,
        NotoSans_200ExtraLight_Italic,
        NotoSans_300Light,
        NotoSans_300Light_Italic,
        NotoSans_400Regular,
        NotoSans_400Regular_Italic,
        NotoSans_500Medium,
        NotoSans_500Medium_Italic,
        NotoSans_600SemiBold,
        NotoSans_600SemiBold_Italic,
        NotoSans_700Bold,
        NotoSans_700Bold_Italic,
        NotoSans_800ExtraBold,
        NotoSans_800ExtraBold_Italic,
        NotoSans_900Black,
        NotoSans_900Black_Italic,
    });
    if(!loadedFonts) {
        return <ActivityIndicator size="small" />;
    }

    return (
        <Text
            style={[
                type === 'default' ? styles.default : undefined,
                type === 'bold' ? styles.bold : undefined,
                type === 'thin' ? styles.thin : undefined,
                style
            ]}
            {...rest}
        />
    );
}
const styles = StyleSheet.create({
    default: {
        fontFamily: 'NotoSans_400Regular',
        fontSize: 16,
        fontWeight: '500',
    },
    bold: {
        fontFamily: 'NotoSans_400Regular',
        fontSize: 16,
        fontWeight: 'bold',
    },
    thin: {
        fontFamily: 'NotoSans_400Regular',
        fontSize: 16,
        fontWeight: '100',
    }
});