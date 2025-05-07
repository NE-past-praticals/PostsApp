import { PostComponent } from '@/components/Post';
import useBookmarks from '@/hooks/useBookmarks';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Bookmarks() {
    const { bookmarks, removeBookmark, fetchingBookmarks } = useBookmarks();

    return (
        <SafeAreaView
            className='bg-white h-full px-3 pt-3'
        >
            {fetchingBookmarks ? <View className='h-full justify-center items-center'>
                <ActivityIndicator size='large' color='blue' />
            </View> :
                <FlatList
                    data={bookmarks}
                    ListEmptyComponent={() => (
                        <View className='h-full justify-center items-center bg-gray-50 rounded-lg'>
                            <Image
                                source={require('../../assets/images/no-data.png')}
                                style={{ width: 200, height: 200 }}
                                className='rounded-lg'
                            />
                            <Text className='text-lg text-gray-700 pt-3 '>You don't have any bookmarks</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <PostComponent
                            isBookmarked={true}
                            onBookmark={() => removeBookmark(item.id)}
                            {...item}
                        />
                    )}
                    ListHeaderComponent={() => (
                        <View className='mb-6'>
                            <Text className='text-xl text-gray-800 font-rubiksemibold'>Bookmarks</Text>
                            <Text className='text-gray-500 text-base'>Here are the posts you have bookmarked</Text>
                        </View>
                    )}
                />
            }
        </SafeAreaView>
    );
}
