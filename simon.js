/*jshint esversion: 6 */

/**
 * Simon game
 * Author : Alexandre Grisey
 */

class Simon {
	constructor(){
		this.globalIterator = 0;
		this.LIGTHTEN_TIMEOUT = 400;
		this.NEXT_ROUND_TIMEOUT = 900;
		this.LOST_LABEL = "Vous avez perdu :(";
		
		this.userScore = 0;
		// this.highScore = 0;

		this.aiRow = [];
		this.userRow = [];

		this.audio_0 = new Audio('sounds/heat.mp3');
		this.audio_1 = new Audio('sounds/deux.mp3');
		this.audio_2 = new Audio('sounds/trois.mp3');
		this.audio_3 = new Audio('sounds/quatre.mp3');
	}

	/**
	 * called when user start game
	 */
	initGame(){
		this.addColorToRow();
		$('#userScore').text(0);
		this.playAi();
	}

	/**
	 * (re)init values
	 */
	initValues(){
		this.userScore = 0;
		this.aiRow = [];
		this.userRow = [];
		this.globalIterator = 0;
	}

	/**
	 * Add color in AI row
	 */
	addColorToRow(){
		let randomNumber = Math.floor(Math.random()*4);
		this.aiRow.push(randomNumber);
	}

	/**
	 * Play AI row
	 */
	playAi(){
		let wait = 3;
		this.aiRow.forEach(elmt => {
			setTimeout(() => {
				this.playElmt(elmt, true);
			}, wait * 100);
			wait += 8;
		});
	}

	/**
	 * Check if clicked element is the right one
	 * @param {*} elmt 
	 */
	checkUserValue(elmt){
		if(elmt == this.aiRow[this.globalIterator]){ //user is right
			this.globalIterator ++;
			if (this.globalIterator == this.aiRow.length) { //end of row
				this.addColorToRow();
				this.playAi();
				this.userScore ++;
				this.globalIterator = 0;
				//will handle high score here
				$('#userScore').text(this.userScore);
			}
		}
		else{ //user loses
			this.initValues();
			alert(this.LOST_LABEL);
		}
	}

	/**
	 * called when user click on an element
	 * @param {*} elmt 
	 * @param {*} isAi 
	 */
	playElmt(elmt, isAi){
		$('#elmt_' + elmt).addClass("lighten");
		//Using eval is not clean, but it's ok for now
		eval("this.audio_" + elmt).play();
		setTimeout(() => {
			$('#elmt_' + elmt).removeClass("lighten");
		}, this.LIGTHTEN_TIMEOUT);

		if (!isAi) {
			this.userRow.push(elmt);
			setTimeout(() => {
				this.checkUserValue(elmt);
			}, this.NEXT_ROUND_TIMEOUT);
		}
	}
}

//initialization
var simon = new Simon();
function main() {
	simon.initGame();
}