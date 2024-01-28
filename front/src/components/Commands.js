import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Help from './Help';
import About from './About';

const commands = {
    help: <Help/>,
   
    about: <About/>,
    "fetch-price": async (pair) => {
      try {
        console.log("Fetching price... Please wait.");
        // Check if pair is provided
        if (!pair) {
          return (
            <div>
              <p>Please provide a cryptocurrency pair.</p>
            </div>
          );
        }

        // Fetch price from API using Axios
        const response = await axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=${pair.toUpperCase()}`);
        console.log('response', response)
        if (response?.status === 200) {
          // Extract price from response data
          const price = response?.data?.price;

          // Return JSX with the current price and link to cryptocurrency pairs
          return (
            <div>
              {price ? <p>
                The current price of {pair.toUpperCase()} is {price}.
              </p> : <p>
                Unable to fetch the price of {pair.toUpperCase()} .
              </p>}

              <p>
                You can get cryptocurrency pairs from:{" "}
                <a href="https://coinranking.com/exchange/-zdvbieRdZ+binance/markets">
                  https://coinranking.com/exchange/-zdvbieRdZ+binance/markets
                </a>
              </p>
            </div>
          );
        }

      } catch (error) {
        // Handle errors
        console.error('Error fetching price:', error);
        return (
          <div>
            <p> <span style={{ color: 'red' }}>{error?.message}</span> Occured while  fetching price. Please try again. </p>
          </div>
        );
      }
    },
    upload: async () => {

      try {
        // Create a promise to handle file selection
        const filePromise = new Promise((resolve, reject) => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".csv"; 
          input.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file && file.name.endsWith('.csv')) {
              resolve(file);
            } else {
              reject(new Error("No file selected"));
            }
          });
          input.click();
        });

        // Wait for the file to be selected
        const file = await filePromise;

        // Create FormData object and append the file
        const formData = new FormData();
        formData.append('file', file);

        // Upload the file using Axios
        const response = await axios.post('https://5000-kishore1477-merncli-tvqvbg9kf5v.ws-us107.gitpod.io/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response?.status === 200) {
          return (
            <div>
              {response?.data?.message}
            </div>
          );
        } else {
          return (
            <div>
              {response?.response?.data?.message}
            </div>
          );
        }
      } catch (error) {
        // console.error('Error uploading file:', error);
        return <div>
          <p>{error?.response?.data?.message}</p>
          <p>Error uploading file: ${error.message}</p>
        </div>
      }
    },
    draw: async (args) => {
      try {
        const [filename, ...columns] = args.split(" ");
        console.log("file ", filename)
        console.log("columns ", columns)
        if (!filename || columns?.length === 0) {
          return "Please provide file name as well as columns.";
        }
        const data = {
          filename, columns
        }
        const response = await axios.post(`https://5000-kishore1477-merncli-tvqvbg9kf5v.ws-us107.gitpod.io/api/drawChart`, data);
        console.log('response of drawchart', response)
        const chartData = response?.data?.data
        if (response?.status === 200) {
          const keys = Object.keys(chartData[0]);
          const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
          // Exclude the index key if it exists
          const dataKeys = keys.filter(key => key !== 'index');
          return (
            <div style={{ width: '100%', marginTop: "18px" }}>
              <LineChart width={730} height={350} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="index" />
                <YAxis />
                <Tooltip />
                <Legend />
                {dataKeys.map((key, index) => (
                  <Line key={index} type="monotone" dataKey={key} stroke={getRandomColor()} />
                ))}
              </LineChart>
            </div>
          );
        }
      } catch (error) {
        return <div>
          <p>{error?.response?.data?.message}</p>
          <p>Error uploading file: ${error.message}</p>
        </div>
      }




      // Validate file and columns (for demonstration purposes, we'll assume they are valid)

      // Render line chart

    },
    delete: async (file) => {
      try {
        // Fetch price from API using Axios
        const response = await axios.delete(`https://5000-kishore1477-merncli-tvqvbg9kf5v.ws-us107.gitpod.io/api/delete/${file}`);
        console.log('response', response)
        if (response?.status === 200) {
          return (
            <div>
              {response?.data?.message}
            </div>
          );
        } else {
          return (
            <div>
              {response?.response?.data?.message}
            </div>
          );
        }

      } catch (error) {
        console.error('Error fetching price:', error);
        return (
          <div>
            <p>{error?.response?.data?.message}</p>
            <p> <span style={{ color: 'red' }}>{error?.message}</span> Occured while deleting the file {file}.  Please try again. </p>
          </div>
        );
      }
    }
  };

  export {
    commands
  }