import { useEffect } from 'react';
import {fetchMedia} from './firebase';

function TestFirebaseLinks() {
  useEffect(() => {
    fetchMedia();
  }, []);

  return null;
}

export default TestFirebaseLinks;