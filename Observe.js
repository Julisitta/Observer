class Observer {
    constructor() {
    this._handlers = [];
    this._onceHandlers = [];
    }
    addSubscriber(callback) {
        this._handlers.push(callback);
    }
    once(callback) {
        this._onceHandlers.push(callback);
    }
    removeSubscriber(callback) {
        this._handlers.splice(this._handlers.indexOf(callback),1);
        //this._handlers = this._handlers.filter(uf => uf !== callback);
    }
    notification(data) {
        let handle = callback => callback(data);
        this._handlers.forEach(handle);
        this._onceHandlers.forEach(handle);
        this._onceHandlers = [];
    }
    censure(data) {
        let promise = new Promise((resolve, reject) => {
            Math.random() > .5 ? resolve({}) : reject("Новость не прошла цензуру");
        }); 
        promise
            .then(this.notification(data),
                reason => console.log(reason));
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.binded = this.inform.bind(this);
    }
    inform(data) {
        console.log(this.name + " get " + data);
    }
}

class Jurnaluga {
    constructor(name) {
        this.name = name;
    }
    sendNews() {
        let rnd = Math.random().toString(36).substring(2, 15);
        return this.name + " about " + rnd;
    }	
	interval(observ) {
        let timerId = setInterval(
            () => observ.censure(this.sendNews()),
            1000);
        setTimeout(
            () => clearInterval(timerId),
            5000);
    }	
}

let obs = new Observer();

let user1 = new User("Margo");
let user2 = new User("Renat");
let user3 = new User("Kate");
let user4 = new User("MarcOnce");

let jur = new Jurnaluga("PhotoBank");

obs.addSubscriber(user1.binded);
obs.addSubscriber(user2.binded);
obs.addSubscriber(user3.binded);

obs.censure(jur.sendNews());

obs.removeSubscriber(user3.binded);

obs.censure(jur.sendNews());

obs.once(user4.binded);

jur.interval(obs);
