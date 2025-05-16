import Cards from "../components/Cards";
import Registrations from "../components/Registrations";
import Action from "../components/Action";
import { useAppContext } from "../context/AppContext";

export default function Dashboard() {
    const { students, isLoading } = useAppContext();
  return (
    <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
          {isLoading ? <p>Loading students...</p> : <p>{students.length} students loaded</p>}
      <Cards />
      <Registrations />
      <Action />
    </div>
  );
}
