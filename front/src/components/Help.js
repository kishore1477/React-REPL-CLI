import React from 'react'

const Help = () => {
    const cellStyle = {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
      };
      const availableCommands = [
        {
          name:"about", 
          desc:"Display information about the application"
        },
        {
          name:"fetch-api [coin]", 
          desc:"Fetch data for a specified cryptocurrency",
        },
        {
          name:"upload", 
          desc:"Upload a file CSV Only",
        },
        {
          name:"delete [filename]", 
          desc:"Delete a file",
        },
        {
          name:"draw [filename][columns]", 
          desc:"Draw a chart from a file where columns must be equal to the column of excel file",
        },
      ]
    return (
        <div>
          <p>Available commands:</p>
          <table style={{ borderCollapse: 'collapse', width: '100%', color: "white" }}>
            <thead>
              <tr>
                <th style={cellStyle}>S#</th>
                <th style={cellStyle}>Command Name</th>
                <th style={cellStyle}>Description</th>
                
              </tr>
            </thead>
            <tbody>
              {availableCommands?.map((p, i) => {
                return <tr key={i}>
                  <td style={cellStyle}>{i + 1}</td>
                  <td style={cellStyle}>{p?.name}</td>
                  <td style={cellStyle}>
                  {p.desc}
                  </td>
                
                </tr>

              })}



            </tbody>
          </table>
        </div>
      );
}

export default Help