export interface ICreateTripCardProps {
  onClick: () => void;
}

const CreateTripCard: React.FC<ICreateTripCardProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-6 m-4 rounded-lg w-80 h-60 bg-gradient-to-br from-cyan-700 to-cyan-900 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 overflow-hidden cursor-pointer flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950 to-transparent opacity-70 pointer-events-none"></div>

      <h2 className="text-3xl text-white font-bold">Create New Trip</h2>

      <h2 className="text-3xl font-bold text-white">+</h2>
    </div>
  );
};

export default CreateTripCard;

