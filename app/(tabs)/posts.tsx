import { PostComponent } from '@/components/Post';
import useBookmarks from '@/hooks/useBookmarks';
import usePosts from '@/hooks/usePosts';
import { usernameState } from '@/store';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';


export default function Posts() {
  const { posts, fetchingPosts } = usePosts();
  const username = useRecoilValue(usernameState);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  return (
    <SafeAreaView
      className='bg-white h-full px-3 pt-3'
    >
      {
        fetchingPosts ? <View className='h-full justify-center items-center'>
          <ActivityIndicator size='large' color='blue' />
        </View> :
          <FlatList
            data={posts}
            ListEmptyComponent={() => (
              <View className='h-full justify-center items-center bg-gray-50 rounded-lg'>
                <Image
                  source={require('../../assets/images/no-data.png')}
                  style={{ width: 200, height: 200 }}
                  className='rounded-lg'
                />
                <Text className='text-lg text-gray-700 pt-3 '>There isn't any posts</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PostComponent
                isBookmarked={bookmarks.find(bookmark => bookmark.id === item.id) ? true : false}
                onBookmark={() => {
                  if (bookmarks.find(bookmark => bookmark.id === item.id)) {
                    removeBookmark(item.id);
                  } else {
                    addBookmark(item);
                  }
                }}
                {...item}
              />

            )}
            ListHeaderComponent={() => (
              <View className='mb-6'>
                <Text className='text-xl text-gray-800 font-rubiksemibold'>Welcome, {username}</Text>
                <Text className='text-gray-500 text-base'>Here are some of the posts we've picked for you</Text>
              </View>
            )}
          />
      }
    </SafeAreaView>
  );
}
