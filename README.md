# Terminal Donation App

**Terminal Donation App** is a fun and interactive terminal-based application that allows users to securely make donations via **mobile money** or **card** directly from their terminal. The app provides a seamless way to navigate donation campaigns and contribute to meaningful causes.

---

## Features

- Navigate through available campaigns using intuitive controls.
- Securely input donation details and contribute via mobile money or card.
- Interactive UI with real-time feedback, using spinners and colorful prompts.
- Handles graceful shutdowns and errors during the donation process.

---

## Prerequisites

1. **Node.js** (v18+ recommended)  
2. **TypeScript** (installed globally or via `npx`).
3. A `.env` file with the following variables:

```plaintext
NODE_ENV=development
CHECKOUT_URL=<Your API URL>
CHECKOUT_API_KEY=<Your API Key>
MERCHANT_PRODUCT_ID=<Your Product ID>
TRANSFLOW_ID=<Your Transaction Flow ID>
WEB_SOCKET_URL=<Your WebSocket URL>
FAILURE_REDIRECT_URL=<URL for failed transactions>
SUCCESS_REDIRECT_URL=<URL for successful transactions>

## Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd terminal-donation-app

2.  **Install Dependencies:**
    ```bash
    npm install
3.  **Set Up Environment Variables:**

4.  **Compile TypeScript (if applicable):**
      ```bash
    npx tsc

4.  **Compile TypeScript (if applicable):**
    ```bash
       npx tsc

## Usage
Start the donation application by executing the following command:
  npx ts-node src/index.ts terminal.donate


## Controls
While navigating donation campaigns:

n: Go to the next campaign.
p: Go to the previous campaign.
d: Select the current campaign for donation and proceed to input payment details.
q: Quit the application.

## Contributing

Contributions are welcome! If you want to add features or fix bugs:
Fork the repository.
Create a new branch.
Submit a pull request.