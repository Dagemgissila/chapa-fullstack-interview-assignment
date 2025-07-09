import { CreditCard, Loader2, XCircle, Users, BarChart2 } from "lucide-react";

const iconMap = {
  total_payments: <CreditCard size={28} className="text-indigo-600" />,
  pending_payments: <Loader2 size={28} className="text-yellow-500" />,
  failed_payments: <XCircle size={28} className="text-red-600" />,
  total_transactions: <BarChart2 size={28} className="text-blue-500" />,
  active_users: <Users size={28} className="text-green-600" />,
};

const StatCard = ({ label, value, type }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-all border-1">
    <div className="bg-gray-100 p-3 rounded-full">{iconMap[type]}</div>
    <div>
      <h4 className="text-sm font-bold">{label}</h4>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default StatCard;
