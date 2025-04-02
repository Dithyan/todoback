import TodoList from "../Components/TodoList";


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 p-5 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-white opacity-10 blur-3xl rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-2xl bg-white bg-opacity-20 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-300 animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg mb-6">
          📝 Manage Your Tasks
        </h1>
        <TodoList />
      </div>
    </div>
  );
}
