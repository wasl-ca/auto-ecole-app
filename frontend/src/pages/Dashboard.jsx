import Cards from "../components/Cards";
import Registrations from "../components/Registrations";
import Action from "../components/Action";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Cards />
      <Registrations />
      <Action />
    </div>
  );
}
