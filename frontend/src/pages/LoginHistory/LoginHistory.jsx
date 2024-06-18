import React, { useEffect, useState } from 'react';
import { getLoginHistory } from '../../axios/user';

const LoginHistory = () => {
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoginHistory = async () => {
      try {
        const response = await getLoginHistory();
        setLoginHistory(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLoginHistory();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Login History</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Success</th>
            <th>Timestamp</th>
            <th>IP Address</th>
            <th>User Agent</th>
          </tr>
        </thead>
        <tbody>
          {loginHistory.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.success ? 'Yes' : 'No'}</td>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
              <td>{entry.ip}</td>
              <td>{entry.userAgent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoginHistory;
