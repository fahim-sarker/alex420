import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { MainContext } from "../Context/ChartInfoContext";

const renderCustomizedLabel = ({ x, y, width, value }) => {
  const radius = 10;
  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#DBA514" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
      >
        {value.split(" ")[0]}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-yellow-100 border border-yellow-300 p-2 rounded shadow text-yellow-900">
        <p className="font-semibold text-sm">{label}</p>
        <p>
          Cost:{" "}
          <span className="font-bold text-yellow-700">
            ${payload[0].value.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const Monthlysalescostcharts = () => {
  const [data, setData] = useState([]);
  const { selectdate } = useContext(MainContext);

  const tokenData = JSON.parse(localStorage.getItem("usertoken"));
  const token = tokenData?.token;

  useEffect(() => {
    const fetchRevenueByMonth = async () => {
      const dateObj = selectdate ? new Date(selectdate) : new Date();
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth(); 
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const requests = Array.from({ length: daysInMonth }, (_, i) => {
        const day = String(i + 1).padStart(2, "0");
        const monthStr = String(month + 1).padStart(2, "0");
        const dateStr = `${year}-${monthStr}-${day}`;

        return axios
          .get(`/api/dashboard/bar/products/total-cost-month-statistics-chart?date=${dateStr}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            const revenue = res.data?.data?.revenue || 0;
            return {
              name: `${day} ${dateObj.toLocaleString("default", { month: "short" })}`,
              revenue,
            };
          })
          .catch(() => ({
            name: `${day} ${dateObj.toLocaleString("default", { month: "short" })}`,
            revenue: 0,
          }));
      });

      const results = await Promise.all(requests);
      setData(results);
    };

    fetchRevenueByMonth();
  }, [selectdate, token]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis  tickFormatter={(value) => `$${(value / 1)}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="revenue" fill="#DBA514" minPointSize={10}>
          <LabelList dataKey="name" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Monthlysalescostcharts;
