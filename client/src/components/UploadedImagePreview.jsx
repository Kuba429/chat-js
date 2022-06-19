export default function UploadedImagePreview({
    fileBase64,
    removeUploadedImage,
}) {
    return (
        <div className="uploaded-image-preview">
            <img src={fileBase64} />
            <div onClick={removeUploadedImage} className="overlay">
                Click to remove
            </div>
        </div>
    );
}
