import { Post } from "@/types";
import { Text, TouchableOpacity, View } from "react-native";
import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface PostComponentProps extends Post {
    isBookmarked: boolean;
    onBookmark: () => void;
}

export const PostComponent = ({ isBookmarked, onBookmark, ...item }: PostComponentProps) => {
    const router = useRouter();
    return (
        <View className='p-3  rounded-lg mb-3 border border-gray-200 shadow-sm'>
            <Text className='text-lg font-semibold'>{item.title}</Text>
            <Text className='text-base text-gray-500 mb-3'>{item.body}</Text>
            {!item.isCustom && <View className='flex flex-row items-center justify-between mt-3'>
                <CustomButton
                    handlePress={() => router.push(`/post/${item.id}`)}
                    title='Go to post'
                    containerStyles=' w-[80%]'
                    variant='outline'
                    titleStyles='text-base'
                />
                {/* bookmark */}
                <TouchableOpacity
                    onPress={onBookmark}
                    className={`ml-3 rounded-md border p-2 border-violet-400 shrink-0
                        ${isBookmarked ? 'bg-violet-400' : 'bg-white'}
                            `}

                >
                    <Ionicons
                        name='bookmark-outline'
                        size={20}
                        color={isBookmarked ? 'white' : 'violet'}
                        className='mt-3'
                    />
                </TouchableOpacity>
            </View>}
            {
                item.isCustom && <Text className='font-semibold text-violet-700'>Added By You</Text>
            }
        </View>
    );
};
