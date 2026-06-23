# Async-Race

- **Deploy URL:** ******************\_\_******************
- **Calculated Score:** ************\_\_\_\_************

To run and test this application locally, you must run both the mock backend server and this frontend application simultaneously in separate terminal windows. **Do not clone the backend inside this frontend directory.**

### 1. Setup the Backend Server

Open a **brand new, separate terminal window**, navigate to your general projects or workspace directory (outside of this project), and run:

```bash
git clone [https://github.com/mikhama/async-race-api.git](https://github.com/mikhama/async-race-api.git)
cd async-race-api
npm install
npm start
```

### 2. **Setup the Frontend Application**

Switch back to your original terminal window (inside this cloned Async-race frontend folder) and run:

```bash
npm install
npm run dev
```

This ensures the backend is listening on port 3000, and the frontend boots up right after on port 5173. Use this exact structure.
