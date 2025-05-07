import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import usePosts from '@/hooks/usePosts'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useToast } from 'react-native-toast-notifications'

const AddPost = () => {
    const toast = useToast();
    const { addPost, addingPost } = usePosts();

    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

    const handleAddPost = async () => {
        const specialCharStartPattern = /^[!@#\$%\^\&*\)\(+=._-]/; // Adjust pattern based on special characters
    
        if (!formData.title.trim() || !formData.body.trim()) {
            toast.show("Please fill in all fields", {
                type: 'danger'
            });
            return;
        }
    
        if (specialCharStartPattern.test(formData.title.charAt(0))) {
            toast.show("Title cannot start with a special character", {
                type: 'danger'
            });
            return;
        }
    
        if (specialCharStartPattern.test(formData.body.charAt(0))) {
            toast.show("Body cannot start with a special character", {
                type: 'danger'
            });
            return;
        }
    
        // Optional: Add length checks if needed
        const maxLength = 280; // Adjust as per your requirements
        if (formData.title.length > maxLength) {
            toast.show(`Title cannot be longer than ${maxLength} characters`, {
                type: 'danger'
            });
            return;
        }
    
        if (formData.body.length > maxLength+200) {
            toast.show(`Body cannot be longer than ${maxLength+200} characters`, {
                type: 'danger'
            });
            return;
        }
    
        addPost(formData);
    }

    return (
        <SafeAreaView className='p-3 px-5 h-full justify-center'>
            <View>
                <Text className='text-xl font-rubiksemibold text-gray-800'>Create Post</Text>
                <Text className='text-gray-600 text-base'>Fill in the form below to create a post</Text>
            </View>
            <View className='mb-5 mt-8'>
                <CustomInput
                    value={formData.title}
                    label='Post Title'
                    placeholder='Enter post title'
                    onChangeText={(val) => setFormData({ ...formData, title: val })}
                />
                <CustomInput
                    value={formData.body}
                    label='Body'
                    placeholder='Enter post body'
                    onChangeText={(val) => setFormData({ ...formData, body: val })}
                    multiline
                    numberOfLines={4}
                    containerStyles='mt-3'
                />

            </View>
            <CustomButton
                title='Submit Post'
                handlePress={handleAddPost}
                isLoading={addingPost}
                containerStyles='mt-8'
            />
        </SafeAreaView>
    )
}

export default AddPost
