import { useEffect, useState } from 'react';

const VideoComponent = ({ src, width = "100%", height = "auto" }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Bileşen sadece istemci tarafında yükleniyor
  }, []);

  if (!isClient) {
    return null; // İstemciye geçene kadar video render edilmez
  }

  return (
    <video loop muted autoPlay width={width} height={height} src={src}></video>
  );
};

export default VideoComponent;
