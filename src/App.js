// import base scss & other styles module here
import './assets/css/index.scss';
import 'react-toastify/dist/ReactToastify.css';

// import essential modules here
import {
  BrowserRouter,
  Routes as Switch,
  Route
} from 'react-router-dom';
import PreviewReport from './Components/PreviewReport/PreviewReport'
import { origin } from './helpers/getOrigin';
import { AlertMessages } from './FlashMessages/AlertMessages';
import { ToastContainer } from 'react-toastify';

// import components here
import { Report } from './Components/Report/Report';

export const App = () => {
  origin();
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact element={<Report />} />
          <Route path="/preview-report" exact element={<PreviewReport />} />
          <Route path="/full-report" exact element={<Report />} />
          <Route path="/summary-report" exact element={<Report />} />
          <Route path="/repair-list" exact element={<Report />} />
          <Route path="/pdf-report" exact element={<Report />} />
          <Route path="/media" exact element={<Report />} />
          <Route path="*" exact element={<AlertMessages title="404" message="Page not found" />} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}
