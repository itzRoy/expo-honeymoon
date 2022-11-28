import { getDocs, collection, getCountFromServer, query, where, limit, orderBy, Timestamp, doc, getDoc, addDoc, setDoc, deleteDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { Alert } from "react-native"
import { db, storage, storageRef } from "./firebase"
// utils
const list = collection(db, 'list')

const objSchema = {
    owner: 'owner name2',
    phone: '78 838 432',
    address: 'nahr ibrahim',
    size: '250',
    price: 300000,
    category: 'land', //villa building land ...

    status: 'on hold', // 'sold, onhold, not sold, rent'
}

// helpers
const getCount = async (ref) => {
    const result = (await getCountFromServer(ref)).data().count
    return result
}

export const toDateTime = (secs) => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs)
    const format = t.toString().split(' ').splice(1, 4).join('-')
   return format
}

const getImageUrl = async (uri, imagesRef) => {
    let filename = uri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    const imgRef = ref(storage, `images/${new Date().getTime()}-${filename}`);
    const metadata = {
        contentType: type,
        size: 1024
    };
    try {
        let img = await fetch(uri)
        let bytes = await img.blob()
        const snap = await uploadBytes(imgRef, bytes, metadata)

        const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
        imagesRef.push(url)
    } catch (e) {
        Alert.alert(e);
    }

}



function firestoreTimeStamp() { return { seconds: Math.floor(Date.now() / 1000 + 7200)} }


// api
const addItem = (obj, images, setIsLoading, navigation) => {
    setIsLoading(true)
    const imagesRefs = []
    Promise.all(images.map(img => getImageUrl(img, imagesRefs)))
        .then(() => {
            obj.gallery = imagesRefs
            obj.createdAt = firestoreTimeStamp()
        }).then(async () => {
            try {
                const docRef = await addDoc(list, obj);
                setIsLoading(false)
                navigation.replace('viewPage', { id: docRef.id });
            } catch (e) {
                setIsLoading(false)
                Alert.alert(e);
            }
        }).catch(e => {
            setIsLoading(false)
            Alert.alert(e);
        })
}

const getHeader = async (setData, setCategories) => {
    try {
        let result = []
        let categories = []
        let status = []
        const data = await getDocs(list)
        data.forEach(doc => {
            result.push(doc.data().address)
            categories.push(doc.data().category)
            status.push(doc.data().status)

        })
        setData(['all', ...new Set(result.sort())])
        setCategories([...new Set(categories.sort())])

    } catch (e) {
        Alert.alert(e);
    }

}

const getPageData = async (setData, setIsLoading = () => { }, setError = () => { }, address) => {
    if (!address) return
    const result = []
    const myQuery = query(
        list,
        where('address', '==', address),
    )
    setIsLoading(true)
    try {
        const data = await getDocs(address === 'all' ? list : myQuery)
        const resultCount = await getCount(address === 'all' ? list : myQuery)
        data.forEach(doc => {
            result.push({ id: doc.id, data: doc.data() })
        })
        setIsLoading(false)
        return setData({ resultCount, data: result.sort((a, b) => b.data.createdAt.seconds - a.data.createdAt.seconds) })
    } catch (e) {
        Alert.alert(e);
        setIsLoading(false)

    }
}

const getOneById = async (id, setData, setSlides, setIsLoading = () => { }) => {
    setIsLoading(true)
    try {
        const docRef = doc(db, 'list', id)
        const docSnap = await getDoc(docRef)
        setData({ id: doc.id, data: docSnap.data() })
        setSlides(docSnap.data().gallery.map((image, key) => (
            {
                image, 
                key,
            }
            )))
        setIsLoading(false)
    }catch (e) {
        setIsLoading(false)
        Alert.alert(e);
    }
}

const deleteById = async (id, setIsLoading, setModalVisible, navigation) => {
    setModalVisible(false)
    setIsLoading(true)
    const docRef = doc(db, 'list', id)
    try{
        await deleteDoc(docRef)
        setIsLoading(false)
        navigation.replace('dataPage')
    }catch(e){
        setIsLoading(false)
        Alert.alert(e)
    }
}

export { getPageData, getOneById, addItem, getHeader, deleteById }
