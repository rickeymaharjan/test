import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import BaseLayout from "./layouts/BaseLayout"

import Members from "./pages/Members"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route path="members" element={<Members />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
