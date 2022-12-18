import { Button, Image, Pressable, Text, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import styles from './imagePicker.styles';
const ImagePickerComp = ({ image, setImage }) => {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    console.log(status, requestPermission);
    ImagePicker.launchCameraAsync({}).then(result => console.log(result))
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            // aspect: [9, 14],
            allowsMultipleSelection: true,
            selectionLimit: 5,
            quality: 1,

        });
        if (!result.canceled) {
            setImage(prev => [...prev, ...result.assets.map((i) => i.uri)]);
        }
    };
    return (
        <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>
            {image && image.map((img, i) => {
                return <Pressable key={i} style={styles.container} onPress={() => setImage(prev => prev.filter(i => i != img))}>
                <View >
                    <Image
                        source={{ uri: img }}
                        style={styles.imageStyle} />
                </View>
                </Pressable>
})}
            <Pressable onPress={pickImage} style={[styles.container, styles.dashed]}>
                        <Text style={styles.dashedText}>select</Text>
                </Pressable>
            
        </View>

    );
}
export default ImagePickerComp
