
import axios from 'axios';

export const BCAPI_URL = process.env.BCAPI_URL_DEV ?
  'https://bcapi-filter-node.mybluemix.net/dev' :
  'https://bcapi-filter-node.mybluemix.net';

export const ETHERSCAN_TX_URL = 'https://etherscan.io/tx';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3100' : '';
export const HTTP = axios;

export default {

  getBlockByTxId(id) {
    return axios.get(`/api/blockinfo/${id}`, { timeout: 30000 });
  },

  getStageDetails(stage, projectId) {
    return axios.get(`${BCAPI_URL}/etapa${stage}?project_id=${projectId}`);
  },

  getProjectInvestments(projectId) {
    return axios.get(`${BCAPI_URL}/project_investments?project_id=${projectId.toLowerCase()}`);
  },
  getProjectMedias(projectId) {
    return axios.get(`${BCAPI_URL}/project_media?project_id=${projectId.toLowerCase()}`);
  },
  getBonds(projectId) {
    return axios.get(`${BCAPI_URL}/bond?project_id=${projectId.toLowerCase()}`);
  },
};
