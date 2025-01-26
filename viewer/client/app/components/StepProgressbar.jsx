import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { isMobile } from '../utils';
import '../styles/stepProgressbar.scss';
import greenCube from 'assets/images/green-cube.png';

const PhaseIndicator = (props) => {
  return (
    <Step {...props}>
      {() => (
        <div className="phase-indicator step-content">
          <p className="phase-caption">{props.caption}</p>
          <div className="phase-bar"></div>
        </div>
      )}
    </Step>
  );
}

const CStep = (props) => {
  return (
    <Step {...props}>
      {(stepProps) => (
        <div className="cstep step-content" onClick={props.onClick}>
          <div className="step-img">
            <span className="step-icon">
              <img
                style={{ filter: `grayscale(0%)` }}
                width="20" height="24"
                src={greenCube}
              />
            </span>
          </div>
          <div className="step-caption">
            <p className="caption">{props.caption}</p>
          </div>
        </div>
      )}
    </Step>
  );
};

export default class StepProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.stepCaptions = [
      '1', 'Application',
      '2', 'Selection Process',
      '3', 'Project Details',
      '4', 'Feasibility Analysis',
      '5', 'Economic and Financial Analysis',
      '6', 'Customized Loan Plan',
      '7', 'Contract',
      '8', 'Action Plan',
      '9', 'Delivery of credit to the venture',
      '10', 'Follow up and Monitoring',
      '11', 'Result and impact metrics'
    ];
  }

  componentDidMount() {
    window.document.querySelector('.cstep:nth-child(1)').classList.add('step-clicked');
    window.document.querySelectorAll('.phase-indicator')
      .forEach(el => el.parentElement.style.zIndex = -1);
    window.addEventListener('resize', (event) => {
      this.forceUpdate();
    });
  }

  toggleClicked(stepObj) {
    window.document.querySelectorAll('.cstep')
      .forEach(el => el.classList.remove('step-clicked'));
    stepObj.classList.add('step-clicked');
  }

  onStepClick(event, index) {
    this.toggleClicked(event.target.closest('.cstep'));
    this.props.onStepClick(index);
  }

  render() {
    const mobile = isMobile();
    return (
      <div className="step-progressbar">
        <ProgressBar
          percent={100}
          filledBackground="var(--green)"
          height={3}
          hasStepZero={true}
        >
          <CStep caption={this.stepCaptions[mobile ? 0 : 1]} transition="scale" onClick={(event) => this.onStepClick(event, 1)}></CStep>
          <CStep caption={this.stepCaptions[mobile ? 2 : 3]} transition="scale" onClick={(event) => this.onStepClick(event, 2)}></CStep>
          <CStep caption={this.stepCaptions[mobile ? 4 : 5]} transition="scale" onClick={(event) => this.onStepClick(event, 3)}></CStep>
          <CStep caption={this.stepCaptions[mobile ? 6 : 7]} transition="scale" onClick={(event) => this.onStepClick(event, 4)}></CStep>
          <CStep caption={this.stepCaptions[mobile ? 8 : 9]} transition="scale" onClick={(event) => this.onStepClick(event, 5)}></CStep>
          <CStep caption={this.stepCaptions[mobile ? 10 : 11]} transition="scale" onClick={(event) => this.onStepClick(event, 6)}></CStep>
          <PhaseIndicator caption="Phase 2"></PhaseIndicator>
          <CStep caption={this.stepCaptions[mobile ? 12 : 13]} transition="scale" onClick={(event) => this.onStepClick(event, 7)}></CStep>
          <CStep caption={this.stepCaptions[mobile ? 14 : 15]} transition="scale" onClick={(event) => this.onStepClick(event, 8)}></CStep>
          <CStep caption={this.stepCaptions[mobile ? 16 : 17]} transition="scale" onClick={(event) => this.onStepClick(event, 9)}></CStep>
          <CStep caption={this.stepCaptions[mobile ? 18 : 19]} transition="scale" onClick={(event) => this.onStepClick(event, 10)}></CStep>
          <PhaseIndicator caption="Phase 3"></PhaseIndicator>
          <CStep caption={this.stepCaptions[mobile ? 20 : 21]} transition="scale" onClick={(event) => this.onStepClick(event, 11)}></CStep>
        </ProgressBar>
      </div>
    );
  }
}
