import { Alert, Button, Image, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import styles from './imagePicker.styles';
const ImagePickerComp = ({ image, setImage }) => {
    const [modalVisible, setModalVisible] = useState(false)
//    ImagePicker.launchCameraAsync().then(result => console.log(result)).catch(e => console.log(e))
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            // aspect: [9, 14],
            allowsMultipleSelection: true,
            quality: 1,
            
        });
        setModalVisible(!modalVisible)
        if (!result.canceled) {
            setImage(prev => [...prev, ...result.assets.map((i) => i.uri)]);
        }
    };

    const launchCamera = () => {
        ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        })
        .then(result => {
            setModalVisible(!modalVisible);
            if(!result.canceled){
            setImage(prev => [...prev, ...result.assets.map((i) => i.uri)])}
    })
        .catch(e => console.log(e))
    }
    return (
        <><View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                } }>
                <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.centeredView}>
                    <Pressable style={styles.modalView}>
                    <TouchableOpacity onPress={launchCamera} android_ripple>
                            <Text style={styles.modalText}>Take a Photo</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.btnWraper} onPress={pickImage} android_ripple>
                            <Text style={styles.modalText}>Choose from gallery</Text>
                        </TouchableOpacity>
                        <Pressable>
                        </Pressable>
                    </Pressable>
                </Pressable>


            </Modal>
        </View><View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>
                {image && image.map((img, i) => {
                    return <Pressable key={i} style={styles.container} onPress={() => setImage(prev => prev.filter(i => i != img))}>
                        <View>
                            <Image
                                source={{ uri: img }}
                                style={styles.imageStyle} />
                        </View>
                    </Pressable>;
                })}
                <Pressable onPress={() => setModalVisible(!modalVisible)} style={[styles.container, styles.dashed]}>
                    <Text style={styles.dashedText}>select</Text>
                </Pressable>

            </View></>

    );
}
export default ImagePickerComp
