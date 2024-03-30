import { useLocation } from "react-router-dom";

export default function FoodItems() {
  const location = useLocation();
  const { foodItemName } = location.state;

  return <div>{foodItemName}</div>;
}
