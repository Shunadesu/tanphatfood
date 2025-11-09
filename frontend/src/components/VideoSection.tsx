'use client'

import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  // YouTube video ID từ URL: https://www.youtube.com/watch?v=W8rao8YuatE
  const youtubeVideoId = 'W8rao8YuatE'
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`

  return (
    <section className="relative h-auto min-h-[50vh] md:min-h-[70vh] lg:min-h-screen bg-white flex items-center">
      <div className="container mx-auto px-4 max-w-7xl w-full">
        {/* Video Container */}
        <div className="w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
            {/* Video Background Image / YouTube Player */}
            <div className="relative w-full aspect-video">
              {!isPlaying ? (
                <>
                  {/* Thumbnail với Play Button */}
                  <img 
                    src="/images/bg-video.png" 
                    alt="Video về Tấn Phát Food" 
                    className="w-full h-full object-cover"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="group relative w-20 h-20 md:w-24 md:h-24 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl z-10"
                      aria-label="Phát video"
                    >
                      <FaPlay className="w-8 h-8 md:w-10 md:h-10 text-[#00652E] ml-1" />
                      <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-ping opacity-75" />
                    </button>
                  </div>
                </>
              ) : (
                /* YouTube Video Player */
                <iframe
                  src={youtubeEmbedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title="Video về Tấn Phát Food"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection

