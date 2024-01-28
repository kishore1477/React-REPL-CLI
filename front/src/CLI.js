import React, { useState } from 'react';
import { Box, Text, useInput, render } from 'ink';
import SelectInput from 'ink-select-input';

const CLI = () => {
  const [input, setInput] = useState('');
  const [showCommands, setShowCommands] = useState(false);

  const handleSelect = item => {
    switch (item.value) {
      case 'show-commands':
        setShowCommands(true);
        break;
      case 'first':
        console.log('Executing command: First');
        // Execute the command associated with 'first'
        break;
      case 'second':
        console.log('Executing command: Second');
        // Execute the command associated with 'second'
        break;
      case 'third':
        console.log('Executing command: Third');
        // Execute the command associated with 'third'
        break;
      default:
        break;
    }
  };

  const items = [
    {
      label: 'Show available commands',
      value: 'show-commands'
    },
    {
      label: 'First',
      value: 'first'
    },
    {
      label: 'Second',
      value: 'second'
    },
    {
      label: 'Third',
      value: 'third'
    }
  ];

  useInput((input, key) => {
    if (key.return) {
      if (input === 'help') {
        setShowCommands(true);
      } else {
        console.log(`Executing command: ${input}`);
        // Execute other commands
      }
    }
  });

  const handleInputChange = (value) => {
    setInput(value.trim());
  };

  return (
    <Box flexDirection="column">
      <Text>Welcome to the CLI interface!</Text>
      <Text>Type a command and press Enter:</Text>
      <Box>
        <Text>$</Text>
        {/* <TextInput value={input} onChange={handleInputChange} /> */}
      </Box>
      {showCommands && (
        <SelectInput items={items} onSelect={handleSelect} />
      )}
    </Box>
  );
};

export default CLI;
