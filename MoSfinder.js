/// the class represent musical scales in equal temperament
class Scale {
	// N: divider of the octave; stepArray: array of scale intervals in steps
	constructor (_N, _stepArray) {
		this.N = _N;
		this.stepArray = [..._stepArray];
		this.size = _stepArray.length;
		this.stepIntervals = this.stepArray.map( 
		    (element, index, array) => {
		        if (index + 1 === array.length) return this.N - element;
		        else return array[index + 1] - element; 
		    });
	}
    
    /// judge if it is a MoS scale
	isMoS () {
	    let intervals = [];
	    this.stepIntervals.forEach( (d) => {
	        if (intervals.length === 0 || !intervals.includes(d)) intervals.push(d);
	    });
		if (intervals.length === 2) return true;
		else return false;
	}
	
	toText() {
	    return `This is ${this.size}-tone scale: [${this.stepArray}]`;
	}
	
    /// get the rotated scale
    getRotation (shift) {
        if (shift < 0) throw new Error("argument 'shift' has to be non-negative number");
        let rotatedStepIntervals = this.stepIntervals.map( (element, index, array) => {
            return array[(index + shift) % array.length];
        });
        let rotated = [0];
        for (let i = 0; i < rotatedStepIntervals.length - 1; i++)
            rotated.push(rotated[i] + rotatedStepIntervals[i]);
        return new Scale(this.N, rotated);
    }
}

/// this function create the list of all the possible MoS scales by given period 'N' and generating interval 'gen'.
function createMoS (N, gen) {
    if (N % gen === 0) {
        console.warn("the given period N and generatin interval gen cannot generate any MoS scale.");
        return null;
    }
    let listOfMoSScales = [];
    
    let temp_stepInterval = [];
    let s = 0;
    while (true) {
        temp_stepInterval.push(s * gen % N);
        temp_stepInterval.sort( (a, b) => {
					if (a > b) return 1;
					else if (a < b) return -1;
					else return 0;
				});
        let scl = new Scale(N, temp_stepInterval);
        
        if (scl.isMoS()) listOfMoSScales.push(scl);
        if (scl.size >= N) break;
        s++;
    }
    return listOfMoSScales;
}