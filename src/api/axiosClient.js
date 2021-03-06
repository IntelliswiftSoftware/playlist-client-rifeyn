import { create, isCancel } from 'axios';
import createHistory from 'history/createBrowserHistory';



const history = createHistory();

const client = create({
  timeout: 60000,
  crossDomain: true,
  // baseURL: contextAPIURL,
  // headers: { 'Key': 'value' }
});

let requestsCount = 0;
history.listen(() => {
  requestsCount = 0;
  //loadingActions.hideLoadingSymbol();
});

const afterResponse = (response) => {
  if (response.config.customparams.showLoading) {
    requestsCount -= 1;
  }
  if (requestsCount <= 0) {
    requestsCount = 0;
   // loadingActions.hideLoadingSymbol();
  }
};
export default client;

export const registerReqResInterceptors = () => {
  client.interceptors.request.use(
    (config) => {
      if (config.customparams.showLoading) {
       // loadingActions.showLoadingSymbol();
      }
      return config;
    },
    (error) => {
      if (!isCancel(error)) {
        throw error;
      }
    },
  );

  client.interceptors.response.use(
    (response) => {
      afterResponse(response);
      // successAction(response);
      return response;
    },
    (error) => {
      afterResponse(error);
      if (!isCancel(error)) {
        // errorAction(error);
        throw error;
      }
    },
  );
};
