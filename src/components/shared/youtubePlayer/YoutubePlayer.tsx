import YouTube, { YouTubeProps } from 'react-youtube';
import Video from '../../../types/Video';

function YoutubePlayer({ video }: { video: Video }) {
  const opts: YouTubeProps['opts'] = {
    height: '260px',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <>
      {video ? <YouTube title='Trailer' className='mt-5' opts={opts} videoId={video.key} /> : ''}
    </>
  );
}

export default YoutubePlayer;
