import { useEffect, useState, useRef } from "react";
import "./AppVideoComponent.css";

const VideoComponent = ({ src, width = "100%", height = "auto" }) => {
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.25);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const volumeSliderRef = useRef(null);

  useEffect(() => {
    setIsClient(true);

    const handleVolumeSlider = (e) => {
      if (!volumeSliderRef.current || !videoRef.current) return;

      const rect = volumeSliderRef.current.getBoundingClientRect();
      const newVolume = Math.min(
        1,
        Math.max(0, (e.clientX - rect.left) / rect.width)
      );

      setVolume(newVolume);
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleVolumeSlider);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (e) => {
      handleVolumeSlider(e);
      document.addEventListener("mousemove", handleVolumeSlider);
      document.addEventListener("mouseup", handleMouseUp);
    };

    if (volumeSliderRef.current) {
      volumeSliderRef.current.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (volumeSliderRef.current) {
        volumeSliderRef.current.removeEventListener(
          "mousedown",
          handleMouseDown
        );
      }
      document.removeEventListener("mousemove", handleVolumeSlider);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const [controlsVisible, setControlsVisible] = useState(true);
  const timeoutRef = useRef(null);

  // Kontrolleri göster ve gizleme timeout'unu ayarla
  const showControls = () => {
    setControlsVisible(true);
    resetControlsTimeout();
  };

  const hideControls = () => {
    setControlsVisible(false);
  };

  const resetControlsTimeout = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(hideControls, 3000); // 3 saniye sonra gizle
  };

  useEffect(() => {
    // İlk render'da timeout'u başlat
    resetControlsTimeout();

    // Component unmount olduğunda timeout'u temizle
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // Video container için mouse event'leri
  const handleMouseEnter = () => {
    showControls();
  };

  const handleMouseLeave = () => {
    // Fare ayrıldığında hemen gizleme (opsiyonel)
    // resetControlsTimeout(); // Veya süreyi sıfırla
  };

  // Video etkileşimlerinde kontrolleri göster
  const handleVideoInteraction = () => {
    showControls();
  };

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    if (!duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);

    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget; // Doğru elementi alıyoruz
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };

  const toggleMute = () => {
    if (isMuted) {
      videoRef.current.volume = volume;
    } else {
      videoRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      } else if (videoContainerRef.current.webkitRequestFullscreen) {
        videoContainerRef.current.webkitRequestFullscreen();
      } else if (videoContainerRef.current.msRequestFullscreen) {
        videoContainerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!isClient) {
    return null;
  }

  return (
    <div
      className="video-container"
      ref={videoContainerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleVideoInteraction}
    >
      <video
        ref={videoRef}
        width={width}
        height={height}
        src={src}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        autoPlay={autoplay}
      ></video>

      <div
        className={`html5_video_overlay ${controlsVisible ? "" : "hidden"}`}
        onMouseMove={handleVideoInteraction}
      >
        <div
          className={`play_button ${isPlaying ? "pause" : "play"}`}
          onClick={togglePlay}
        ></div>

        <div className="control_container">
          <div className="fullscreen_button" onClick={toggleFullscreen}></div>

          <div className="time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <div
            className={`volume_icon ${isMuted ? "muted" : ""}`}
            onClick={toggleMute}
          ></div>

          <div className="volume_slider" ref={volumeSliderRef}>
            <div
              className="volume_handle"
              style={{ left: `${volume * 100}%` }}
            ></div>
          </div>

          <div
            className={`autoplay_checkbox ${autoplay ? "checked" : ""}`}
            onClick={toggleAutoplay}
          ></div>

          <div className="autoplay_label">Videoları otomatik olarak oynat</div>
        </div>

        <div className="progress_bar_wrapper">
          <div className="progress_bar_container" onClick={handleProgressClick}>
            <div className="progress_bar_background"></div>
            <div
              className="progress_bar"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
