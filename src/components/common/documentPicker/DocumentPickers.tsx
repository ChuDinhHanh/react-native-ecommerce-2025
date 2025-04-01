import {useState} from 'react';
import {View} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

const DocumentPickers = () => {
  const [attachsments, setAttachsments] = useState<DocumentPickerResponse[]>(
    [],
  );

  const handlePickerDocument = async () => {
    DocumentPicker.pick({
      allowMultiSelection: true,
      type: [
        DocumentPicker.types.images,
        DocumentPicker.types.pdf,
        DocumentPicker.types.docx,
      ],
    })
      .then(res => {
        attachsments
          ? setAttachsments([...attachsments, ...res])
          : setAttachsments(res);
      })
      .catch(error => {
        console.log(error);
      });
    return attachsments;
  };

  return <View></View>;
};

export default DocumentPickers;
