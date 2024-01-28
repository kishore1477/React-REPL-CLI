import React, { useState } from 'react'
import { ReactTerminal } from "react-terminal";
import axios from 'axios'
import useAxios from 'axios-hooks'
// import 'terminal-in-react/lib/css/index.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const TerminalCLI = () => {
  // const commands = {
  //     whoami: <h1>Hello h1</h1>,
  //     cd: (directory) => `changed path to ${directory}`
  //   };
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const handleFileUpload = async (event) => {
    setLoading(true);
    try {
      const formdata = new FormData()
      formdata.append('file', event.target.files[0])
      const response = await axios.post('https://5000-kishore1477-merncli-tvqvbg9kf5v.ws-us107.gitpod.io/api/upload', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response?.status === 200) {
        setResponseMessage(response.data.message);
      } else {
        setResponseMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setResponseMessage('Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const chartData = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }]
  const commands = {
    sum: (args) => {
      // Extract numbers from the command arguments
      const [num1, num2] = args.split(" ").map(Number);

      // Check if both arguments are numbers
      if (!isNaN(num1) && !isNaN(num2)) {
        // Calculate the sum
        const sum = num1 + num2;
        return `Sum of ${num1} and ${num2} is ${sum}`;
      } else {
        // Invalid input
        return "Invalid input. Please provide two numbers.";
      }
    },
    help: () => {
      // Display list of available commands
      return (
        <div>
          <p>Available commands:</p>
          <ol>
            <li>sum [num1] [num2]: Add two numbers</li>
            <li>about: Display information about the application</li>
            <li>fetch-api [coin]: Fetch data for a specified cryptocurrency</li>
            <li>upload file: Upload a file</li>
            <li>delete file [filename]: Delete a file</li>
            <li>draw file [filename]: Draw a chart from a file</li>
          </ol>
        </div>
      );
    },
    about: () => {
      return (
        <div>
          <p>CLI Version 1.0</p>
          <p>
            This is a front-end CLI created as a part of the Full Stack Hiring
            test. It simulates various command-line functionalities.
          </p>
        </div>
      );
    },
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
          input.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
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
        console.error('Error uploading file:', error);
        return <div>
          <p>{error?.response?.data?.message}</p>
          <p>Error uploading file: ${error.message}</p>
        </div>
      }
    },
    draw: (file, columns) => {
      // Check if chart data is available
      if (!file || !columns) {
        return "Please provide file name and column.";
      }

      // Validate file and columns (for demonstration purposes, we'll assume they are valid)

      // Render line chart
      return (
        <div style={{ width: "100%", height: "300px" }}>
          <LineChart width={500} height={300} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>

        </div>
      );
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
  //   const handleCommand = (command) => {
  //     console.log("command is ", command)
  //     // Handle the command and return the output
  //     switch (command) {
  //       case 'hello':
  //         return 'Hello, world!';
  //       default:
  //         return `Command not found: ${command}`;
  //     }
  //   };
  const handleErrorMsg = (error) => {
    console.log("error is ", error)
    return `${error} Command not found. Please enter a correct command or check the existing commands by using the 'help' command`
  }
  return (
    <div>
      <div>Welcome to React REPL CLI </div>
      <ReactTerminal
        commands={commands}
        welcomeMessage="Welcome to the terminal! Type 'hello' to greet."
        //   commandCallback={handleCommand}
        themes={{
          "my-custom-theme": {
            themeBGColor: "#272B36",
            themeToolbarColor: "#DBDBDB",
            themeColor: "#FFFEFC",
            themePromptColor: "#a917a8"
          }
        }}
        prompt='(main)$'
        theme="my-custom-theme"
        errorMessage={handleErrorMsg}
        showControlBar={true}
        showControlButtons={true}
      />
    </div>
  )
}

export default TerminalCLI