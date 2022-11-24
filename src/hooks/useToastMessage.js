import {useEffect} from 'react';
import Toast from 'react-native-toast-message';

const useToastMessage = (message, type = 'success') => {
  useEffect(() => {
    if (message) {
      Toast.show({
        type: 'customToast',
        text1: message,
      });
    }
  }, [message, type]);
};

export default useToastMessage;
