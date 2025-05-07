import CustomButton from '@/components/CustomButton';
import { bookmarksState, usernameState } from '@/store';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, View, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
    const [username, setUsername] = useRecoilState(usernameState);
    const router = useRouter();
    const [bookmarks, setBookmarks] = useRecoilState(bookmarksState)


    return (
        <SafeAreaView className='bg-white h-full'>
            <View className='px-6 flex-1 items-center h-full justify-center'>
                <Ionicons
                    name='person-circle-outline'
                    size={70}
                    color='#8A2BE2'
                    className='mt-8'
                />
                <Text className='text-center text-2xl font-semibold text-gray-700 mt-5'>{username}</Text>
                <Text className='text-center text-gray-500 mt-2'>{bookmarks.length} bookmarks</Text>
                <CustomButton
                    handlePress={async () => {
                        await AsyncStorage.removeItem('bookmarks');
                        setBookmarks([]);
                        setUsername('');
                        router.push("/");
                    }}
                    title='Logout'
                    containerStyles='mt-8 border-red-500'
                    variant='outline'
                    titleStyles='text-red-500'
                />
            </View>
        </SafeAreaView>
    )
}