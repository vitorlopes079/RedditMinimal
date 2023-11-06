import  {useEffect} from "react"
import { useLocation } from 'react-router-dom';

function AppTracking() {
    const location = useLocation();
  
    useEffect(() => {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }, [location]);
  
    return null; // This component doesn't render anything to the DOM
  }

  export default AppTracking;