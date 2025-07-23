import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Button from '../../atoms/Button/Button';
import Modal from '../../atoms/Modal/Modal';
import Image from 'next/image';

interface ImageCropperModalProps {
  isOpen: boolean;
  imgSrc: string | null;
  onClose: () => void;
  onCropDone: (croppedFile: File | null) => void;
}

const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imgSrc,
  onClose,
  onCropDone
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  useEffect(() => {
    if (!isOpen) {
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  }, [isOpen]);

  const onImageLoaded = (image: HTMLImageElement) => {
    imgRef.current = image;
    setCrop({ unit: '%', x: 0, y: 0, width: 90, height: 90 });
    return false; // Return false to stop ReactCrop from setting aspect
  };

  const onCropComplete = useCallback((c: PixelCrop) => {
    setCompletedCrop(c);
  }, []);

  const handleCrop = async () => {
    if (imgRef.current && completedCrop) {
      const croppedImageFile = await getCroppedImg(imgRef.current, completedCrop);
      onCropDone(croppedImageFile);
      onClose();
    }
  };

  const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop): Promise<File | null> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return Promise.resolve(null);

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "profile.png", { type: "image/png" });
          resolve(file);
        } else {
          resolve(null);
        }
      }, 'image/png');
    });
  };

  if (!isOpen || !imgSrc) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-xl shadow-xl p-6 w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <h2 className="text-xl font-bold mb-4">Recortar Imagem</h2>
        <div className="flex-grow flex items-center justify-center overflow-auto">
          <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={onCropComplete} aspect={1}>
            <Image
              ref={imgRef}
              src={imgSrc}
              onLoad={e => onImageLoaded(e.currentTarget as HTMLImageElement)}
              alt="Crop me"
              width={500}
              height={500}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </ReactCrop>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            size="small"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="primary"
            size="small"
            onClick={handleCrop}
          >
            Recortar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageCropperModal; 