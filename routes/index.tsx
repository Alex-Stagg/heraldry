import Export from "../components/Export.tsx";
import SetHeraldry from "../islands/SetHeraldry.tsx";

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-slate-200 min-h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Welcome to Heraldry</h1>
        <SetHeraldry />
      </div>
    </div>
  );
}
