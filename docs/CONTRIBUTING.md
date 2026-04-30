# Contributing to Base64 to File

*Read this in [Spanish](CONTRIBUTING-es.md).*

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to this project. 

## Code of Conduct
This project and everyone participating in it is governed by a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior.

## How Can I Contribute?

### Reporting Bugs
If you find a bug, please create an issue providing as much detail as possible:
- Steps to reproduce the bug.
- Expected behavior.
- Actual behavior.
- Screenshots or sample Base64 strings (make sure they don't contain personal data!).

### Suggesting Enhancements
Enhancement suggestions are welcome! Please create an issue describing your idea, why it would be useful, and how it should work.

### Pull Requests
1. Fork the repo and create your branch from `main`.
2. Make your changes in your branch.
3. If you've added code that should be tested, add tests in the `tests/` directory.
4. Ensure the test suite passes (`npm run test`).
5. Ensure your code follows the existing style and architecture.
6. Issue that pull request!

## Local Development Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/jaiver/base64-to-file.git
   cd base64-to-file
   ```

2. **Install dependencies:**
   This project uses `npm` as the package manager.
   ```bash
   npm install
   ```

3. **Start the dev server:**
   ```bash
   npm run dev
   ```

4. **Run the tests:**
   We use Vitest for unit testing our `core/` logic.
   ```bash
   npm run test
   ```

## Architecture Overview
Please read [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) to understand how the code is structured before making significant changes.
