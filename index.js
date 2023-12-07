class GoalsWidget {
    constructor(props) {
        this.props = props;
        this.steps = props.steps || [];
        this.currentStepIndex = 0;

        this.container = props.container;
        this.createStyles();
        this.render();
    }

    createStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            body {
                display: block;
                margin: 0;
                padding: 0;
                background: #eee;
            }
            .main-container {
                background: #FEFEFE;
                border-radius: 16px;
                width: 390px;
                height: 402px;
                padding-bottom: 28px;
            }
            .stepper-indicator {
                display: flex;
                justify-content: space-between;
                padding-top: 40px;
                margin-left: 40px;
                margin-right: 40px;
            }
            .stepper-step {
                width: 73.75px;
                height: 6px;
                border-radius: 100px;
                background-color: #ccc;
            }
            .stepper-step.active {
                background-color: #000;
            }
            .goalswidget-title {
                color: #000000;
                font-size: 19px;
                padding-bottom: 33px;
                padding-top: 20px;
                padding-left: 40px;
            }
            .goals-container {
                // margin: 40px;
            }
            .goals-option {
                border: 1px solid #D1CDCD;
                background: linear-gradient(to bottom, #FFFFFF 0%, #F2F2F2 100%);
                border-radius: 10px;
                margin-left: 40px;
                margin-right: 40px;
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                // width: 362px;
                height: 62px;
                padding-left: 17px;
                cursor: pointer;
            }
            .goals-option:hover {
                border: 1px solid #A49999;
            }
            .goals-option-text {
                color: #000000;
                font-size: 15px;
            }
            .goals-selected {
                border: 1px solid #3845EB;
                // background: #F2F3F4;
            }
            .goals-checkbox {
                width: 20px;
                height: 20px;
                border: 1px solid #000;
                border-radius: 4px;
                margin-right: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
            }
            .goals-nextDiv {
                margin-top: 12px;
                margin-left: 40px;
                display: flex;
                gap: 10px;
                justify-content: center;
                align-items: center;
                text-align: center;
                width: 117px !important;
                height: 40px !important;
                background: #2837A5;
                border-radius: 4px;
                padding: 8px 16px;
                border: none;
                cursor: pointer;
            }
            .goals-nextText {
                color: #FFFFFF;
                font-size: 14px;
                font-weight: 700;
            }
            .goals-nextStep {
                margin: 0;
                padding: 0;
                color: #FFFFFF;
                font-size: 14px;
                padding-top: 157px;
                margin-left: 24px;
            }
            .goals-next-step-heading {
                color: #000000;
                font-size: 19px;
                margin-top: 20px;
            }
            .goals-next-step-description {
                width: 348px;
                color: #000000;
                font-size: 19px;
                margin-top: 26px;
            }
            .goals-divHide {
                display: none;
            }
            @media (max-width: 768px) {
                .main-container {
                    width: 100%;
                }
                .goals-next-step-description {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }

    render() {
        this.container.innerHTML = '';

        const mainContainer = document.createElement("div");
        mainContainer.className = "main-container";

        // Stepper indicator
        const stepperIndicator = document.createElement("div");
        stepperIndicator.className = "stepper-indicator";
        for (let i = 0; i < this.steps.length; i++) {
            const stepIndicator = document.createElement("div");
            stepIndicator.className = `stepper-step ${i <= this.currentStepIndex ? 'active' : ''}`;
            stepperIndicator.appendChild(stepIndicator);
        }
        mainContainer.appendChild(stepperIndicator);

        const stepContainer = document.createElement("div");
        stepContainer.className = "step-container";
        mainContainer.appendChild(stepContainer);

        const currentStep = this.steps[this.currentStepIndex];

        const title = document.createElement("h2");
        title.textContent = currentStep.question;
        title.className = 'goalswidget-title';
        stepContainer.appendChild(title);

        let isAnyOptionSelected = false;

        currentStep.options.forEach((option, index) => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "goals-option";
            optionDiv.addEventListener("click", () => {
                this.toggleRadioButton(index);
            });

            const optionText = document.createElement("div");
            optionText.className = "goals-option-text";
            optionText.textContent = option.text;
            optionDiv.appendChild(optionText);

            if (currentStep.options[index].selected) {
                optionDiv.classList.add('goals-selected');
                isAnyOptionSelected = true;
            }

            stepContainer.appendChild(optionDiv);
        });

        if (isAnyOptionSelected) {
            const nextDiv = document.createElement("div");
            nextDiv.className = "goals-nextDiv";

            const nextText = document.createElement('p');
            nextText.textContent = 'Next';
            nextText.className = 'goals-nextText';

            const rightArrow = document.createElement('img');
            rightArrow.src = this.props.rightArrow;

            nextDiv.addEventListener('click', () => {
                this.nextStep();
            });

            nextDiv.appendChild(nextText);
            nextDiv.appendChild(rightArrow);
            stepContainer.appendChild(nextDiv);
        }

        this.container.appendChild(mainContainer);
    }

    nextStep() {
        if (this.currentStepIndex < this.steps.length - 1) {
            this.currentStepIndex++;
            this.render();
        } else {
            // Handle completion or submission logic
            console.log('Stepper completed!');
        }
    }

    toggleRadioButton(index) {
        const currentStep = this.steps[this.currentStepIndex];
        currentStep.options.forEach((option) => {
            option.selected = false;
        });

        currentStep.options[index].selected = true;
        this.render();
    }
}
