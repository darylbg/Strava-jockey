import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardSummary() {

    const navigate = useNavigate();

    const testSummary = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/admin/dashboard/summary", 
                {withCredentials: true}
            );
            console.log(response);
        } catch (error) {
            if (error.response?.status === 401) {
                console.log("Unauthorized. Redirecting to login...");
                navigate("/admin"); // Redirect to login page
              } else {
                console.error("An error occurred:", error);
              }
        }
    }
  return (
    <div>
      welcome to dashboard summary page
      <button onClick={testSummary}>test page</button>
    </div>
  )
}
