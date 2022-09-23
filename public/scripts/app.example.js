class App {
    constructor() {
        this.clearButton = document.getElementById('clear-btn');
        this.loadButton = document.getElementById('load-btn');
        this.carContainerElement = document.getElementById('cars-container');
    }

    async init() {
        await this.load();

        // Register click listener
        this.loadButton.onclick = this.run;
    }

    run = () => {
        this.clear();
        const data = this.filterCar();

        if (data.length == 0 || data == undefined) {
            const node = document.createElement('div');
            node.innerHTML = '<h1> Mobil Tidak Ditemukan </h1>';
            this.carContainerElement.appendChild(node);
        } else {
            data.forEach((car) => {
                const node = document.createElement('div');
                node.innerHTML = car.render();
                this.carContainerElement.appendChild(node);
            });
        }
    };

    filterCar() {
        const passanger = document.getElementById('passanger').value;

        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const dateTime = new Date(`${date} ${time}`);

        if (dateTime == 'Tanggal tidak Valid') {
            alert('Mohon atur ulang tanggal dan waktunya');
            return;
        } else if (passanger <= 0) {
            alert('Tidak Valid');
            return;
        } else {
            return Car.list.filter((car) => car.capacity >= passanger && car.availableAt <= dateTime);
        }
    }

    async load() {
        const cars = await Binar.listCars();
        Car.init(cars);
    }

    clear = () => {
        let child = this.carContainerElement.firstElementChild;

        while (child) {
            child.remove();
            child = this.carContainerElement.firstElementChild;
        }
    };
}

function rupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

function getDateTimeNow() {
    var today = new Date();
    var date = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    var time = String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0') + ':' + String(today.getSeconds()).padStart(2, '0');
    var dateNow = date + 'T' + time + '.000Z';
    return dateNow;
}
