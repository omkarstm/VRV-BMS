import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Maintenance Requests',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Utility Expenses',
        data: [300, 400, 350, 450],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        pointHoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ['Occupied', 'Vacant'],
    datasets: [
      {
        label: 'Units Status',
        data: [75, 25],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1>Building Management Dashboard</h1>
      {/* <div className="bento-layout">
        <div className="card summary">
          <h2>Overview</h2>
          <p><strong>Occupied Units:</strong> 50</p>
          <p><strong>Vacant Units:</strong> 10</p>
          <p><strong>Pending Maintenance:</strong> 5 requests</p>
        </div>

        <div className="card graph">
          <h2>Maintenance Requests</h2>
          <Bar data={barData} />
        </div>

        <div className="card graph">
          <h2>Utility Expenses</h2>
          <Line data={lineData} />
        </div>

        <div className="card graph">
          <h2>Units Status</h2>
          <Doughnut data={doughnutData} />
        </div>

        <div className="card details">
          <h2>Key Metrics</h2>
          <ul>
            <li><strong>Total Revenue:</strong> $15,000</li>
            <li><strong>Monthly Expenses:</strong> $4,500</li>
            <li><strong>Rental Growth:</strong> 8% this month</li>
            <li><strong>Tenant Satisfaction:</strong> 85%</li>
          </ul>
        </div>

        <div className="card details">
          <h2>Recent Activity</h2>
          <ul>
            <li>John Doe paid rent for Unit 101.</li>
            <li>Maintenance request #12 resolved.</li>
            <li>Unit 305 marked as vacant.</li>
            <li>Jane Smith moved into Unit 204.</li>
          </ul>
        </div>

        <div className="card stats">
          <h2>Quick Stats</h2>
          <p><strong>Average Rent:</strong> $1,500/unit</p>
          <p><strong>Occupied Rate:</strong> 83%</p>
          <p><strong>Annual Revenue:</strong> $180,000</p>
        </div>
      </div> */}
      <div className='layout'>
        <div className='upper-layout'>
          <div className="card graph">
            <h2>Maintenance Requests</h2>
            <Bar data={barData} />
          </div>
          <div className='right-side-container'>
            <div className="card stats">
              <h2>Quick Stats</h2>
              <p><strong>Average Rent:</strong> $1,500/unit</p>
              <p><strong>Occupied Rate:</strong> 83%</p>
              <p><strong>Annual Revenue:</strong> $180,000</p>
            </div>
            <div className='card'>
              <h2>Recent Activity</h2>
              <ul>
                <li>John Doe paid rent for Unit 101.</li>
                <li>Maintenance request #12 resolved.</li>
                <li>Unit 305 marked as vacant.</li>
                <li>Jane Smith moved into Unit 204.</li>
              </ul>
            </div>
          </div>

        </div>
        <div className='lower-layout'>
        <div className="card graph">
          <h2>Utility Expenses</h2>
          <Line data={lineData} />
        </div>
        </div>
        {/* <div>
          <div className="card graph">
            <h2>Utility Expenses</h2>
            <Line data={lineData} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
