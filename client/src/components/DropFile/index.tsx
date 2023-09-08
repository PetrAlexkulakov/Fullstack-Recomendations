/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import ErrorComponent from '../ErrorComponent';
import { FieldErrors, UseFormSetError, ValidateResult } from 'react-hook-form';

const DropFile = ({selectedFile, setSelectedFile, inputProps, setError, errors }: {
    selectedFile: File | null,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    inputProps: any,
    setError: UseFormSetError<any>,
    errors: FieldErrors<any>,
  }) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    const acceptedFormats = ['jpg', 'png', 'jpeg'];
    const fileExtension = acceptedFiles[0]?.name.split('.').pop()?.toLowerCase() as string;
    if (!acceptedFormats.includes(fileExtension)) {
      setError('file', { type: 'manual', message: 'Wrong file extension' })
    } else {
      setError('file', {})
    }
    setSelectedFile(acceptedFiles[0])
  }, [setError, setSelectedFile]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} className="dropzone">
        <input 
          {...getInputProps()} 
          {...inputProps} 
        />
        {selectedFile ? (
          <p className='btn border-black'>
            Файл выбран: {selectedFile.name}
          </p>
        ) : (
        <p className='btn border-black'>Перетащите сюда файл или нажмите, чтобы выбрать файл.</p>
        )}
      </div>
      {errors.file && (
        <ErrorComponent>{errors.file.message as ValidateResult}</ErrorComponent>
      )}
    </>
  );
};

export default DropFile;
