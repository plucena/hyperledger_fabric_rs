import React from 'react';
import Loading from 'react-loading-components';
import { Card, Alert, CardBody } from 'reactstrap';
import BlockInfo from './BlockInfo.jsx';
import ApiService, {ETHERSCAN_TX_URL} from '../services/Api';
import StepProgressbar from './StepProgressbar.jsx';
import ComboForm from './ComboForm.jsx';

import '../styles/main.scss';

const SUMMARIES = [
  'This step consists of the registration of the project, its managers and participants.',
  'This step consists of the collection, sorting, analysis and prioritization of documents. The project proposal is analyzed and qualified regarding the level of execution complexity.',
  'This step consists of receiving the complementary documents and other information about the project.  Application of questionnaire,s reports of expert advice on economic and financial matters. Subject video with information about the project, cooperative, participants and products to be launched on the platform. ODS involved in the project are identified and registered.',
  'This stage consists of the analysis of project feasibility, technical consistency and project coherence with the objectives of Moeda Seeds\' Program.',
  'This step consists of the detailed economic and financial records of the project. Report of economic and market analysis, with check of questionnaires of technical visits.',
  'This step consists of building the customized loan. After economic and financial analysis, a coherent loan plan is built for the project. The parcels and values, rates, grace period and duration are registered.',
  'This step consists in the agreement between the parties, in signing the loan agreement between Moeda Seeds and the project.',
  'This step consists in defining and recording the actions that will be taken with the loan. Record of goals and technicians involved. Report of activities, dates of deliveries, responsible and other information. Photos and divulgation material is also collected.',
  'This step consists of transaction from Moeda Seeds account to the Project account. Through the blockchain transaction in the Stellar Public network, the project portfolio receives the loan amount, represented by MDABRL. Tickets and payment cards of the parcels are also issued and registered.',
  'This step consists in tracking the goals. Proof of execution and service objectives are collected, as well as bids, invoices and receipts. Questionnaires are applied to evaluate the progress of the project. The conclusions of goals attendance, payment of the installments, and percentage of the project are recorded.',
  'This final step consists of the conclusion and final evaluation of the impact of the project. Questionnaires are applied to follow-up effects, intermediate and final evaluation of the project. The conclusions, reached SDGs, and payment of the final installment are recorded. As a result, it provides a summary of the social impact generated.'
];

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.onStepClick = this.onStepClick.bind(this);

    this.state = {
      isLoading: false,
      project: {
        id: '',
        name: ''
      },
      stage: {
        id: 1,
        data: {},
        summary: ''
      },
      err: {}
    };
  }

  componentDidMount() {
    let {project} = this.state;
    project.id = (this.props.projectId || '7A1E1A65-7D0F-446D-801F-EDBF7E77407E').toUpperCase();

    this.setState({
      project,
      isLoading: true
    });
    this.fetchData(this.state.stage.id, this.state.project.id)
      .then(res => {
        const data = res.data;
        let { project, stage } = this.state;
        project.name = data['Project Name (en)'] || '';
        stage.data = data;
        stage.summary = SUMMARIES[stage.id-1];
        this.setState({ stage, project, isLoading: false });
      })
      .catch(err => this.setState({ err: err, isLoading: false }));
  }

  onSelect(project) {
    this.setState({
      project,
      isLoading: true
    });
    this.fetchData(this.state.stage.id, project.id)
      .then(res => {
        let { stage } = this.state;
        stage.data = res.data;
        stage.summary = SUMMARIES[stage.id-1];
        this.setState({ stage, isLoading: false });
      })
      .catch(err => this.setState({ err: err, isLoading: false }));
  }

  onStepClick(index) {
    let { stage } = this.state;
    stage.id = index;
    this.setState({ stage, isLoading: true });
    this.fetchData(index, this.state.project.id)
      .then(res => {
        stage.data = res.data;
        stage.summary = SUMMARIES[stage.id-1];
        this.setState({ stage, isLoading: false });
      })
      .catch(err => this.setState({ err: err, isLoading: false }));
  }

  fetchData(stageId, projectId) {
    return ApiService.getStageDetails(stageId, projectId)
      .then(res => {
        if (stageId === 9) {
          return Promise.all([
            ApiService.getProjectInvestments(projectId),
            ApiService.getBonds(projectId),
          ])
            .then(result => {
              const invs = result[0].data.Investments || [];
              const dibs = result[1].data || [];

              dibs.forEach(dib => {
                const idx = invs.findIndex(v => v['Transaction Hash'] === dib['Tx hash']);
                if (idx > -1) dib['Tx hash relative to investment ' + (idx+1)] = ETHERSCAN_TX_URL +'/'+ dib['Tx hash'];
                delete dib['Tx hash'];
              });

              res.data['Investments'] = invs;
              res.data['MDA-DIB (Moeda Development Impact Bonds)'] = dibs;
              return res;
            });
        }
        if (stageId === 10) {
          return ApiService.getProjectMedias(projectId)
            .then(({ data }) => {
              res.data['Medias'] = data.Medias || [];
              return res;
            });
        }
        return res;
      });
  }

  displayInfo() {
    if (this.state.err.message) {
      return <Alert color='danger'>{this.state.err.message}</Alert>;
    } else {
      if (this.state.stage.data && Object.keys(this.state.stage.data).length > 0) {
        return (
          <Card border='dark' className='mb-3 shadow-sm'>
            <CardBody>
              <BlockInfo summary={this.state.stage.summary} data={this.state.stage.data}></BlockInfo>
            </CardBody>
          </Card>
        );
      }
      return <Alert color='danger'>Not found</Alert>;
    }
  }

  render() {
    return (
      <main className="container-fluid">
        <header className="row justify-content-md-center">
          <ComboForm project={this.state.project} onSelect={this.onSelect}></ComboForm>
        </header>

        <div className="row justify-content-md-center">
          <div className="col-md-12 col-lg-10">
            <StepProgressbar onStepClick={this.onStepClick}></StepProgressbar>
            <div className="pt-3">
              {this.state.isLoading ?
                <p style={{ textAlign: 'center' }}><Loading type='tail_spin' fill='#000' width={48} height={48} /></p> :
                this.displayInfo()}
            </div>
          </div>
        </div>
      </main>
    );
  }
}
