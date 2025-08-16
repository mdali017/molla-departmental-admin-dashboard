import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  // PieChart,
  // Pie,
  // Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  // Eye,
  DollarSign,
} from "lucide-react";

const Dashboard: React.FC = () => {
  // Revenue Analytics Data
  const revenueData = [
    { date: "12 Aug", revenue: 8000, order: 4000 },
    { date: "13 Aug", revenue: 9500, order: 5500 },
    { date: "14 Aug", revenue: 7800, order: 4200 },
    { date: "15 Aug", revenue: 11000, order: 6000 },
    { date: "16 Aug", revenue: 14521, order: 8000 },
    { date: "17 Aug", revenue: 12000, order: 7000 },
    { date: "18 Aug", revenue: 10500, order: 6500 },
    { date: "19 Aug", revenue: 11800, order: 7200 },
  ];

  // Conversion Rate Data
  const conversionData = [
    { name: "Product Views", value: 25000, color: "#f97316" },
    { name: "Add to Cart", value: 12000, color: "#fb923c" },
    { name: "Proceed to Checkout", value: 8500, color: "#fdba74" },
    { name: "Completed Purchases", value: 6200, color: "#fed7aa" },
    { name: "Abandoned Carts", value: 3000, color: "#ffedd5" },
  ];

  // Top Categories Data
  const categoriesData = [
    { name: "Electronics", value: 1200000, color: "#f97316" },
    { name: "Fashion", value: 950000, color: "#fb923c" },
    { name: "Home & Kitchen", value: 750000, color: "#fdba74" },
    { name: "Beauty & Personal Care", value: 500000, color: "#fed7aa" },
  ];

  // Active Users by Country
  const userCountries = [
    { country: "United States", percentage: 36 },
    { country: "United Kingdom", percentage: 24 },
    { country: "Indonesia", percentage: 17.5 },
    { country: "Russia", percentage: 15 },
  ];

  // Traffic Sources
  const trafficSources = [
    { source: "Direct Traffic", percentage: 40, color: "#f97316" },
    { source: "Organic Search", percentage: 30, color: "#fb923c" },
    { source: "Social Media", percentage: 15, color: "#fdba74" },
    { source: "Referral Traffic", percentage: 10, color: "#fed7aa" },
    { source: "Email Campaigns", percentage: 5, color: "#ffedd5" },
  ];

  type StatCardProps = {
    title: string;
    value: string | number;
    change: string | number;
    changeType: "positive" | "negative";
    icon: React.ElementType;
    bgColor?: string;
  };

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    change,
    changeType,
    icon: Icon,
    bgColor = "bg-white",
  }) => (
    <div
      className={`${bgColor} rounded-lg shadow-sm p-6 border border-gray-100`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Icon className="w-5 h-5 text-orange-600" />
          </div>
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div
          className={`flex items-center space-x-1 text-sm font-medium ${
            changeType === "positive" ? "text-green-600" : "text-red-600"
          }`}
        >
          {changeType === "positive" ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{change}</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">vs last week</p>
    </div>
  );

  const ProgressBar: React.FC<{ percentage: number; color?: string }> = ({ percentage, color = "bg-orange-500" }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  return (
    <div className=" bg-gray-50 p-6 overflow-hidden">
      <div className="[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Sales"
            value="$983,410"
            change="+3.34%"
            changeType="positive"
            icon={DollarSign}
            bgColor="bg-orange-50"
          />
          <StatCard
            title="Total Orders"
            value="58,375"
            change="-2.89%"
            changeType="negative"
            icon={ShoppingCart}
          />
          <StatCard
            title="Total Visitors"
            value="237,782"
            change="+8.02%"
            changeType="positive"
            icon={Users}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Analytics */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Analytics
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 bg-orange-300 rounded-full border-2 border-orange-300"
                    style={{ backgroundColor: "transparent" }}
                  ></div>
                  <span className="text-sm text-gray-600">Order</span>
                </div>
                <select className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  <option>Last 8 Days</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-1">Revenue</div>
              <div className="text-2xl font-bold text-gray-900">$14,521</div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="order"
                    stroke="#fb923c"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#fb923c", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Target */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Monthly Target
              </h3>
              <button className="text-gray-400 hover:text-gray-600">
                <div className="w-1 h-1 bg-current rounded-full mb-1"></div>
                <div className="w-1 h-1 bg-current rounded-full mb-1"></div>
                <div className="w-1 h-1 bg-current rounded-full"></div>
              </button>
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-gray-200"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-orange-500"
                    strokeWidth="3"
                    strokeDasharray="85, 100"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">85%</div>
                    <div className="text-xs text-green-600 font-medium">
                      +8.02%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-orange-500 font-medium text-sm mb-1">
                Great Progress! 🎉
              </div>
              <div className="text-xs text-gray-500">
                Our achievement increased by $200,000; <br />
                let's reach 100% next month.
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-gray-500 mb-1">Target</div>
                <div className="text-lg font-bold text-gray-900">$600,000</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Revenue</div>
                <div className="text-lg font-bold text-gray-900">$510,000</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Users */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Active User
              </h3>
              <button className="text-gray-400 hover:text-gray-600">
                <div className="w-1 h-1 bg-current rounded-full mb-1"></div>
                <div className="w-1 h-1 bg-current rounded-full mb-1"></div>
                <div className="w-1 h-1 bg-current rounded-full"></div>
              </button>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-bold text-gray-900">2,758</div>
              <div className="flex items-center text-sm">
                <span className="text-green-600 font-medium">+8.02%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Users</div>
            </div>

            <div className="space-y-3">
              {userCountries.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {country.country}
                  </span>
                  <div className="flex items-center space-x-2 flex-1 mx-3">
                    <ProgressBar percentage={country.percentage} />
                    <span className="text-sm font-medium text-gray-900 min-w-max">
                      {country.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Conversion Rate
              </h3>
              <select className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                <option>This Week</option>
              </select>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-4">
              {conversionData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">
                    {item.name
                      .split(" ")
                      .map((word) => word.charAt(0))
                      .join("")}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {(item.value / 1000).toFixed(0)}k
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    {index === 4 ? "-5%" : "+15%"}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData}>
                  <Bar dataKey="value" fill="#f97316" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Top Categories
              </h3>
              <button className="text-orange-600 text-sm font-medium hover:text-orange-700">
                See All
              </button>
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="relative w-24 h-24">
                <svg
                  className="w-24 h-24 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#fed7aa"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeDasharray="70 30"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Total Sales</div>
                    <div className="text-lg font-bold text-gray-900">
                      $3,400,000
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {categoriesData.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-gray-600">{category.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    ${(category.value / 1000000).toFixed(1)}M
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Traffic Sources
              </h3>
              <button className="text-gray-400 hover:text-gray-600">
                <div className="w-1 h-1 bg-current rounded-full mb-1"></div>
                <div className="w-1 h-1 bg-current rounded-full mb-1"></div>
                <div className="w-1 h-1 bg-current rounded-full"></div>
              </button>
            </div>

            <div className="mb-6">
              <div className="flex space-x-1 h-2 rounded-full overflow-hidden">
                {trafficSources.map((source, index) => (
                  <div
                    key={index}
                    className="h-full"
                    style={{
                      backgroundColor: source.color,
                      width: `${source.percentage}%`,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {trafficSources.map((source, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: source.color }}
                    ></div>
                    <span className="text-gray-600">{source.source}</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {source.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
