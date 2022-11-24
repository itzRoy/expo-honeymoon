import { getDocs, collection, getCountFromServer, query, where, limit, orderBy, Timestamp, doc, getDoc, addDoc, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
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
        console.log('url from promise', url);
        imagesRef.push(url)
    } catch (err) {
        console.log(err.message)
    }

}



function firestoreTimeStamp() { return Timestamp.now() }


// api
const addItem = (obj, images) => {
    const imagesRefs = []
    Promise.all(images.map ( img => getImageUrl(img, imagesRefs)))
        .then(() => {
            console.log(imagesRefs)
            obj.gallery = imagesRefs
            obj.createdAt = firestoreTimeStamp()
        }).then(async() => {
            console.log('objjj', obj);
            try{
                const docRef = await addDoc(list, obj);
                console.log("Document written with ID: ", docRef.id);
            }catch(e){
                console.log(e);
            }
        }).catch(e => {
            console.log(e);
        })
}

const getHeader = async (setData, setCategories, setStatus) => {
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
        setStatus([...new Set(status.sort())])

    } catch (e) {
        console.log(e)
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
        console.log(e);
        // setError(e)
        setIsLoading(false)

    }
}

const getOneById = async (setIsLoading = () => { }) => {
    try {
        setIsLoading(true)
        const docRef = doc(db, 'list', 'O3k4dXXLcP3i4jBciVAn')
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data(), doc.id);
            setIsLoading(false)
            return { id: doc.id, data: docSnap.data() }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            setIsLoading(false)

        }
    } catch (e) {
        console.log(e);
        setIsLoading(false)

    }
}



export { getPageData, getOneById, addItem, getHeader }
