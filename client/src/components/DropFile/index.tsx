import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const DropFile = ({selectedFile, setSelectedFile, inputProps }: {
    selectedFile: File | null,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inputProps: any
  }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDrop = useCallback((acceptedFiles: any) => {
    setSelectedFile(acceptedFiles[0])
  }, [setSelectedFile]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} {...inputProps} />
      {selectedFile ? (
        <p className='btn border-black'>
          Файл выбран: {selectedFile.name}
        </p>
      ) : (
      <p className='btn border-black'>Перетащите сюда файл или нажмите, чтобы выбрать файл.</p>
      )}
    </div>
  );
};

export default DropFile;
