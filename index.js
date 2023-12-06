class GoalsWidget {
    constructor(props) {
        this.props = props;
        this.options = props.options || [];
        this.container = props.container;
        this.heading = props.heading;
        this.rightArrow = props.rightArrow;
        this.handShake = props.handShake;
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
                // background: #F7F7F8;
            }
            .main-container{
                background: #FEFEFE;
                border-radius: 16px;
                width: 410px;
                height:400px;
                padding-bottom: 28px;
            }
            .goalswidget-title {
                color: #000000;
                font-size: 19px;
                padding-bottom: 33px;
                padding-top: 40px;
                padding-left: 24px;
            }
            .goals-container {
                // margin: 40px;
            }
            .goals-option {
                border: 1px solid #D1CDCD;
                background: linear-gradient(to bottom, #FFFFFF 0%, #F2F2F2 100%);
                border-radius: 10px;
                margin-left: 24px;
                margin-right: 24px;
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                // width: 362px;
                height: 62px;
                padding-left: 17px;
                cursor: pointer;
            }
            .goals-option:hover{
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
                margin-top:12px;
                margin-left: 24px;
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
                cursor:pointer;
            }

            .goals-nextText{
                color: #FFFFFF;
                font-size:14px;
                font-weight:700;   
            }
            
            .goals-nextStep {
                margin: 0;
                padding: 0;
                color: #FFFFFF;
                font-size: 14px;
                padding-top:157px;
                margin-left:24px;
            }

            .goals-next-step-heading{
                color: #000000;
                font-size:19px;
                margin-top:20px;
            }
            .goals-next-step-description{
                width:348px;
                color: #000000;
                font-size:19px;
                margin-top:26px;
            }

            .goals-divHide{
                display:none;
            }

            @media (max-width: 768px) {
                .main-container{
                    width: 100%;
                }
                .goals-next-step-description{
                    width:100%;
                }
            }


        `;
        document.head.appendChild(styleElement);
    }


    render() {
        this.container.innerHTML = '';
        const mainContainer = document.createElement("div");
        mainContainer.className = "main-container";
        const mcqContainer = document.createElement("div");
        mcqContainer.className = "goals-container";
        mainContainer.appendChild(mcqContainer)
        const title = document.createElement("h2");
        title.textContent = this.heading;
        title.className = 'goalswidget-title';
        mcqContainer.appendChild(title);

        // Variable to check if any option is selected
        let isAnyOptionSelected = false;

        this.options.forEach((option, index) => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "goals-option";
            optionDiv.addEventListener("click", () => {
                this.toggleRadioButton(index);
            });
            const optionText = document.createElement("div");
            optionText.className = "goals-option-text";
            optionText.textContent = option.text; // Display the option text
            optionDiv.appendChild(optionText);
            if (this.options[index].selected) {
                optionDiv.classList.add('goals-selected');
                isAnyOptionSelected = true; // Set to true if an option is selected
            }
            mcqContainer.appendChild(optionDiv);
        });

        if (isAnyOptionSelected) {
            // If any option is selected, add the nextDiv
            const nextDiv = document.createElement("div");
            nextDiv.className = "goals-nextDiv";

            // Add a submit button
            const nextText = document.createElement('p');
            nextText.textContent = 'Confirm';
            nextText.className = 'goals-nextText';

            const rightArrow = document.createElement('img');
            rightArrow.src = this.rightArrow;

            nextDiv.addEventListener('click', () => {
                mcqContainer.classList.add('goals-divHide')
                this.nextSteps()

            })

            nextDiv.appendChild(nextText);
            nextDiv.appendChild(rightArrow);
            mcqContainer.appendChild(nextDiv);
        }



        this.container.appendChild(mainContainer);
    }


    nextSteps() {
        console.log('hello')
        const nextStep = document.createElement("div");
        nextStep.className = "goals-nextStep";

        const image = document.createElement('img')
        image.src = this.handShake

        nextStep.appendChild(image)

        const heading = document.createElement('p')
        heading.textContent = "That's it."
        heading.className = 'goals-next-step-heading'

        nextStep.appendChild(heading)

        const description = document.createElement('p')
        description.textContent = "We will keep that in mind for our meeting"
        description.className = 'goals-next-step-description'


        nextStep.appendChild(description)

        // this.mainContainer.appendChild(nextStep)
        const containers = document.getElementsByClassName('main-container');
        for (const container of containers) {
            container.appendChild(nextStep);
        }
    }

    toggleRadioButton(index) {
        // Unselect all options first
        this.options.forEach((option) => {
            option.selected = false;
        });
        // Select the clicked option
        this.options[index].selected = true;
        // Update the styling for the selected option
        this.render();
    }
}