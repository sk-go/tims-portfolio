import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const messagesFile = join(process.cwd(), 'guestbook-messages.json');

// Initialize messages file if it doesn't exist
if (!existsSync(messagesFile)) {
  const defaultMessages = [
    { name: 'Sasho', message: 'Alles Gute zum Geburtstag, Eggo! 🎉' },
    { name: 'Anonym', message: 'Happy Birthday! Hoffe du hast einen tollen Tag! 🎂' }
  ];
  writeFileSync(messagesFile, JSON.stringify(defaultMessages, null, 2));
}

export async function handler(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Get all messages
      const data = readFileSync(messagesFile, 'utf8');
      const messages = JSON.parse(data);
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(messages)
      };
    } else if (event.httpMethod === 'POST') {
      // Add a new message
      const { name, message } = JSON.parse(event.body);
      
      if (!name || !message) {
        return {
          statusCode: 400,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Name and message are required' })
        };
      }

      const data = readFileSync(messagesFile, 'utf8');
      const messages = JSON.parse(data);
      
      const newMessage = { name, message };
      messages.push(newMessage);
      
      writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      };
    } else {
      return {
        statusCode: 405,
        headers,
        body: 'Method not allowed'
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
} 