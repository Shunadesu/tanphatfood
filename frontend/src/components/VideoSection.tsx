'use client'

import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative h-auto py-8 min-h-[70vh] md:min-h-screen bg-white flex items-center">
      <div className="container mx-auto px-4 max-w-7xl w-full">
        {/* Video Container */}
        <div className="w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
            {/* Video Background Image */}
            <div className="relative w-full aspect-video">
              <img 
                src="/images/bg-video.png" 
                alt="Video về Tấn Phát Food" 
                className="w-full h-full object-cover"
              />
              
              {/* Play Button Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="group relative w-20 h-20 md:w-24 md:h-24 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl"
                  >
                    <FaPlay className="w-8 h-8 md:w-10 md:h-10 text-[#00652E] ml-1" />
                    <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-ping opacity-75" />
                  </button>
                </div>
              )}

              {/* Video Player (Placeholder - bạn có thể thay bằng video thực) */}
              {isPlaying && (
                <div className="absolute inset-0 bg-black">
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-white">Video sẽ được load ở đây</p>
                    {/* Bạn có thể thêm iframe YouTube hoặc video player ở đây */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection

