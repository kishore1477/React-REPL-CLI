import React, { useState } from 'react'
import { ReactTerminal } from "react-terminal";
import { commands } from './Commands';
const TerminalCLI = () => {
  const handleErrorMsg = (error) => {
    console.log("error is ", error)
    return `${error} Command not found. Please enter a correct command or check the existing commands by using the 'help' command`
  }
  return (
    <div>
      <div>Welcome to React REPL CLI </div>
      <ReactTerminal
        commands={commands}
        welcomeMessage="Welcome to the terminal! Type 'help' to show avialabe commands."
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