class Observer {
    constructor() {
    this.handlers = [];
    }
    addSubscriber (callback) {
        this.handlers.push(callback);
    };
    removeSubscriber (callback) {
        this.handlers = this.handlers.filter((uf) => uf !== callback); 
    };
    notification (data) {
        this.handlers.forEach(callback => callback(data));
        
    };
    interval (data) {
        let th = this.handlers;
        let timerId = setInterval(function() {
            th.forEach(callback => callback(data));
      }, 2000);
        setTimeout(function() {
        clearInterval(timerId);
      }, 10000);
    };
};

let obs = new Observer();

class Users {
    constructor(name) {
        this.name = name;
    };
    inform(data) {
        console.log(this.name + " get " + data);
    };
};
let user1 = new Users("Margo");
let user2 = new Users("Renat");
let user3 = new Users("Kate");

class Jurnaluga {
    constructor(name) {
        this.name = name;
        }
     sendNews () {
        return this.name + " about " + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
        };
};

let jasd = new Jurnaluga("PhotoBank");

let uf1 = user1.inform.bind(user1);
let uf2 = user2.inform.bind(user2);
let uf3 = user3.inform.bind(user3);

obs.addSubscriber(uf1);
obs.addSubscriber(uf2);
obs.addSubscriber(uf3);
obs.notification(jasd.sendNews());

obs.removeSubscriber(uf3);
obs.notification(jasd.sendNews());

obs.interval(jasd.sendNews());