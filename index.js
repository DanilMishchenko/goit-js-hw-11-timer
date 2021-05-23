
class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targerDate = targetDate;
        this.intervalId = null;
        this.root = document.querySelector('#js-countdown_timer');
        this.template(this.selector, this.root);
        this.count()
    };
    
    template(timerId, root) {
        const idValue = timerId.slice(1);
        const timeTemplate = `<div class="timer" id=${idValue}>
        <div class="field">
        <span class="value" data-value="days">00</span>
        <span class="label">Days</span>
        </div>
        
        <div class="field">
        <span class="value" data-value="hours">00</span>
        <span class="label">Hours</span>
        </div>
        
        <div class="field">
        <span class="value" data-value="mins">00</span>
        <span class="label">Minutes</span>
        </div>
        
        <div class="field">
        <span class="value" data-value="secs">00</span>
        <span class="label">Seconds</span>
        </div>
        </div>`;
        root.insertAdjacentHTML('beforeend', timeTemplate);
    };

    accessClockFace() {
        const refs = {
            daysElem: this.root.querySelector(`${this.selector} .value[data-value="days"]`),
            hoursElem: this.root.querySelector(`${this.selector} .value[data-value="hours"]`),
            minsElem: this.root.querySelector(`${this.selector} .value[data-value="mins"]`),
            secsElem: this.root.querySelector(`${this.selector} .value[data-value="secs"]`),
        };
        return refs;
    }
    
    count() {
        const time = this.targerDate - Date.now();
        if (time > 0) {
            this.intervalId = setInterval(() => {
                const defaultTime = this.targerDate - Date.now()
                if (defaultTime > 0) {
                    this.calculateTime(defaultTime);
                } else {
                    this.finished();
                }
                
            }, 1000);
        }
        else {
            this.finished();
        };
    };
            
    calculateTime(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        this.updateClockFace(days, hours, mins, secs);
    }
    
    updateClockFace(days, hours, mins, secs) {
        const access = this.accessClockFace();
        access.daysElem.textContent = days;
        access.hoursElem.innerHTML = hours;
        access.minsElem.innerHTML = mins;
        access.secsElem.innerHTML = secs;
    }

    pad(value) {
        return String(value).padStart(2, '0');
    };
    
    finished() {
        clearInterval(this.intervalId);
        const messages = this.root.querySelector(`${this.selector}`);
        messages.insertAdjacentHTML('beforeend', '<p class="finished">Время вышло.</p>');
    };
};

const timer1 = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jun 1, 2021'),
});

const timer2 = new CountdownTimer({
    selector: '#timer-2',
    targetDate: new Date('Jul 10, 2021'),
});

const timer3 = new CountdownTimer({
    selector: '#timer-3',
    targetDate: new Date('September 28, 2021'),
});