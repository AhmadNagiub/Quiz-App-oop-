import {Quiz} from './quiz.js'
export class Setting{
    constructor(){
        this.categoryElement = document.getElementById("category");
        this.difficultyElement = document.getElementsByName("difficulty");
        this.numberOfQuestion = document.getElementById("Number");
        this.startBtn = document.getElementById("startBtn");
        this.startBtn.addEventListener("click", ()=> {
            this.startQuiz()
        })
    }

    async startQuiz(){
        let amount = this.numberOfQuestion.value;
        let category = this.categoryElement.value;

        let difficulty = [...this.difficultyElement].filter(element => element.checked);
        let difficultyLevel = difficulty[0].value;
        let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficultyLevel}`;
        let result = await this.fetchUrl(url);
        if(result.length>0)
        {
            $("#setting").fadeOut(500,()=>{
                $("#quiz").fadeIn(500)
            })
            new Quiz(result,amount)
        }

    }

    async fetchUrl(url){
        let respones = await fetch(url); // fetch data
        let data = await respones.json(); // turn it to json
        return data.results;  // get resutls
    }
}

// i wanna to capture 3 variables to generate <api url> ==> amount of questions - category - difficulty 
// in difficulty i capture all elements by name and get collection of html so i will turn it to array then capture first element and get value

// let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty[0].value}`;
