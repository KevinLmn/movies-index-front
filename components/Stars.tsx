import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Stars = ({ count }: { count: number }) => {
    const numbersOfStars = Math.round(count / 2);
    const starsArray = Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon key={index} icon={faStar} style={{color: index + 1 <= numbersOfStars ? "orange" : "black"}} />
    ));
  
    return <div>{starsArray}</div>;
  };
  
  export default Stars;