
import { IActivityListCardProps } from "../_types/IActivityListCardProps";

const ActivityListCard: React.FC<IActivityListCardProps> = ({ activityList }) => {
    return (
      <div className="activity-list-card relative p-6 m-4 rounded-lg w-80 h-40 bg-gradient-to-br from-green-700 to-green-900 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-green-950 to-transparent opacity-70 pointer-events-none"></div>
  
        <h3 className="text-2xl font-bold text-left text-white mb-2 z-10 relative">
          {activityList.name}
        </h3>
  
        <button className="absolute bottom-4 left-4 bg-green-800 border-2 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300">
          View Activities
        </button>
      </div>
    );
  };
  
  export default ActivityListCard;