import { CSSProperties } from 'react';

function headerStyle(url: string): CSSProperties {
  return {
    backgroundImage: ` linear-gradient(0deg, #05050F 0%, rgba(11, 11, 14, 0.95) 22%, rgba(7, 6, 10, 0.75) 58%, rgba(7, 6, 10, 0.65) 100%), url(${url})`,
    minHeight: '60vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };
}

export { headerStyle };
