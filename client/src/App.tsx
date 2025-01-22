import { useState, useEffect } from 'react'
import './App.css'

interface DemoTableRow {
  0: number;
  1: string;
}

function App() {
  const [dbStatus, setDbStatus] = useState<string>('checking...');
  const [tableData, setTableData] = useState<DemoTableRow[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check DB connection
    fetch('/api/check-db-connection')
      .then(res => res.text())
      .then(status => setDbStatus(status))
      .catch(err => setDbStatus('error connecting'));

    // Fetch table data
    fetch('/api/demotable')
      .then(res => res.json())
      .then(response => {
        // Check if response.data exists, otherwise use the response directly
        const data = response.data || response;
        if (Array.isArray(data)) {
          setTableData(data);
        } else {
          setError('Invalid data format received');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  console.log(tableData)

  return (
    <div className="App">
      <h1>Database Connection Status: {dbStatus}</h1>
      
      <h2>DemoTable Data</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App